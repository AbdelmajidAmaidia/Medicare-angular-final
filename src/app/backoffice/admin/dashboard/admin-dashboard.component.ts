/**
 * @file admin-dashboard.component.ts
 * @description Tableau de bord administrateur : statistiques système, alertes récentes
 * et indicateurs de santé de la plateforme.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

/** Carte statistique */
export interface StatCard {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: string;
  colorClass: string;
}

/** Alerte système */
export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  time: string;
}

/** Indicateur de santé système */
export interface HealthIndicator {
  label: string;
  percent: number;
  status: 'online' | 'warning' | 'critical';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentDate = new Date();

  /** Statistiques affichées sur les cartes */
  stats: StatCard[] = [
    {
      label: 'Utilisateurs Totaux',
      value: '12 450',
      change: '+245 ce mois',
      changePositive: true,
      icon: 'bi-people',
      colorClass: 'primary',
    },
    {
      label: 'Médecins Actifs',
      value: '280',
      change: '+18 cette semaine',
      changePositive: true,
      icon: 'bi-person-badge',
      colorClass: 'success',
    },
    {
      label: "Rendez-vous Aujourd'hui",
      value: '1 240',
      change: '+12 % vs hier',
      changePositive: true,
      icon: 'bi-calendar-check',
      colorClass: 'info',
    },
    {
      label: 'Revenu Mensuel',
      value: '284 500 €',
      change: '+8,5 % vs mois dernier',
      changePositive: true,
      icon: 'bi-currency-euro',
      colorClass: 'warning',
    },
  ];

  /** Alertes récentes du système */
  alerts: SystemAlert[] = [
    { id: '1', type: 'error', message: 'Charge serveur à 85 %', time: 'Il y a 5 minutes' },
    { id: '2', type: 'warning', message: '12 vérifications de médecins en attente', time: 'Il y a 1 heure' },
    { id: '3', type: 'success', message: 'Sauvegarde quotidienne terminée', time: 'Il y a 2 heures' },
    { id: '4', type: 'info', message: 'Nouvelle version de plateforme disponible', time: 'Il y a 3 heures' },
  ];

  /** Indicateurs de santé de la plateforme */
  healthIndicators: HealthIndicator[] = [
    { label: 'API Server', percent: 92, status: 'online' },
    { label: 'Base de Données', percent: 65, status: 'online' },
    { label: 'Stockage', percent: 82, status: 'warning' },
    { label: 'Cache Redis', percent: 44, status: 'online' },
  ];

  constructor() {}

  ngOnInit(): void {
    // TODO : remplacer par l'appel aux services réels
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Retourne la classe CSS d'icône selon le type d'alerte */
  getAlertIcon(type: SystemAlert['type']): string {
    const map: Record<SystemAlert['type'], string> = {
      error: 'bi-exclamation-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      success: 'bi-check-circle-fill',
      info: 'bi-info-circle-fill',
    };
    return map[type];
  }

  /** Ferme et supprime une alerte de la liste */
  closeAlert(id: string): void {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }

  /** Déclenche une actualisation manuelle des données */
  refreshData(): void {
    // TODO : implémenter l'actualisation via le service
    console.info('[AdminDashboard] Actualisation demandée');
  }
}
