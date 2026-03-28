# Medicare Frontend – Docker, Kubernetes & Monitoring Guide

This document explains how to:
1. **Build and push the Docker image** for the Angular frontend
2. **Deploy on Kubernetes with kubeadm** (not MiniKube)
3. **Set up Prometheus + Grafana monitoring**

---

## 1. Docker Image

### Prerequisites
- Docker ≥ 24 installed on your build machine / CI server

### Build

```bash
# from the repository root
docker build -t medicare-frontend:latest .
```

The Dockerfile uses a **two-stage build**:
| Stage | Base image | Purpose |
|-------|-----------|---------|
| `builder` | `node:20-alpine` | `npm ci` + `ng build --configuration production` |
| `runtime` | `nginx:1.27-alpine` | Serves `dist/medicare-angular/browser` with a custom `nginx.conf` |

### Tag and push to a registry

```bash
# Docker Hub example
docker tag medicare-frontend:latest <your-dockerhub-user>/medicare-frontend:1.0.0
docker push <your-dockerhub-user>/medicare-frontend:1.0.0
```

> **Before deploying**, edit `k8s/frontend-deployment.yaml` and replace the placeholder
> image name with your actual registry path.

---

## 2. Kubernetes Deployment with kubeadm

### 2.1 Cluster prerequisites

These steps assume you have already bootstrapped a kubeadm cluster.
If not, follow the official guide: <https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/>

```
# On the control-plane node:
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Configure kubectl for the current user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install a CNI (Flannel shown here)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# Join worker nodes (use the token printed by kubeadm init)
```

### 2.2 Install the Nginx Ingress controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/baremetal/deploy.yaml
```

### 2.3 Deploy the frontend

```bash
# 1. Create the namespace
kubectl apply -f k8s/namespace.yaml

# 2. Deploy, Service and Ingress
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/frontend-ingress.yaml
```

Check the rollout:

```bash
kubectl -n medicare rollout status deployment/medicare-frontend
kubectl -n medicare get pods
```

### 2.4 Access the application

Update your DNS (or `/etc/hosts`) so `medicare.example.com` points to the Ingress
controller's external IP / node IP:

```bash
# Get the Ingress controller's NodePort
kubectl -n ingress-nginx get svc ingress-nginx-controller
```

---

## 3. Monitoring: Prometheus + Grafana

All monitoring manifests live under `k8s/monitoring/`.

### Architecture

```
[medicare-frontend pods]
  └── nginx-exporter sidecar (port 9113) ──► Prometheus (port 9090)
                                                        │
                                              ◄─────────┘
                                           Grafana (port 3000/30300)
```

### 3.1 Deploy monitoring stack

```bash
# 1. Namespace
kubectl apply -f k8s/monitoring/namespace.yaml

# 2. Prometheus (RBAC + ConfigMap + Deployment + Service)
kubectl apply -f k8s/monitoring/prometheus-rbac.yaml
kubectl apply -f k8s/monitoring/prometheus-configmap.yaml
kubectl apply -f k8s/monitoring/prometheus-deployment.yaml
kubectl apply -f k8s/monitoring/prometheus-service.yaml

# 3. Grafana (Secret + datasource + dashboards + Deployment + Service)
kubectl apply -f k8s/monitoring/grafana-secret.yaml
kubectl apply -f k8s/monitoring/grafana-datasource-configmap.yaml
kubectl apply -f k8s/monitoring/grafana-dashboard-configmap.yaml
kubectl apply -f k8s/monitoring/grafana-deployment.yaml
kubectl apply -f k8s/monitoring/grafana-service.yaml

# Verify
kubectl -n monitoring get pods
```

### 3.2 Access Grafana

Grafana is exposed via **NodePort 30300** on every node:

```
http://<node-ip>:30300
```

Credentials come from the `grafana-credentials` Secret.
The default values in `k8s/monitoring/grafana-secret.yaml` are **admin / Medicare@2024**.
**Change the password immediately**, or create the secret manually before deploying:

```bash
kubectl create secret generic grafana-credentials \
  --namespace monitoring \
  --from-literal=admin-user=admin \
  --from-literal=admin-password='<your-strong-password>'
```

### 3.3 Access Prometheus

Prometheus is exposed as a `ClusterIP` service. Use `kubectl port-forward` to reach it locally:

```bash
kubectl -n monitoring port-forward svc/prometheus 9090:9090
# Open http://localhost:9090
```

### 3.4 Pre-loaded dashboard

A *Medicare Frontend – Nginx* dashboard is provisioned automatically from
`k8s/monitoring/grafana-dashboard-configmap.yaml`. It shows:
- Active / waiting Nginx connections per pod
- HTTP request rate per pod

You can also import additional community dashboards from <https://grafana.com/grafana/dashboards/>
(e.g. **Kubernetes cluster monitoring** – ID 315, or **Nginx** – ID 12708).

---

## 4. Apply everything at once (short-cut)

```bash
kubectl apply -R -f k8s/
```

---

## 5. File structure

```
.
├── Dockerfile                          ← Multi-stage Docker build
├── nginx.conf                          ← Nginx config for Angular SPA + /health + /nginx_status
├── .dockerignore
└── k8s/
    ├── namespace.yaml                  ← Namespace: medicare
    ├── frontend-deployment.yaml        ← Deployment (2 replicas) + nginx-exporter sidecar
    ├── frontend-service.yaml           ← ClusterIP Service
    ├── frontend-ingress.yaml           ← Ingress (nginx class)
    └── monitoring/
        ├── namespace.yaml              ← Namespace: monitoring
        ├── prometheus-rbac.yaml        ← ClusterRole + Binding + ServiceAccount
        ├── prometheus-configmap.yaml   ← prometheus.yml (scrape configs)
        ├── prometheus-deployment.yaml  ← Prometheus Deployment
        ├── prometheus-service.yaml     ← ClusterIP Service
        ├── grafana-secret.yaml         ← Grafana admin credentials (Kubernetes Secret)
        ├── grafana-datasource-configmap.yaml   ← Auto-provisions Prometheus datasource
        ├── grafana-dashboard-configmap.yaml    ← Pre-loaded Nginx dashboard
        ├── grafana-deployment.yaml     ← Grafana Deployment
        └── grafana-service.yaml        ← NodePort Service (30300)
```
