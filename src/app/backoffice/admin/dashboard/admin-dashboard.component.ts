import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeClass: string;
  changeIcon: string;
  icon: string;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  stats: StatCard[] = [
    {
      label: 'Utilisateurs Totaux',
      value: '12,450',
      change: '+245 ce mois',
      changeClass: 'text-success',
      changeIcon: 'fa-arrow-up',
      icon: 'fa-users',
    },
    {
      label: 'Médecins Actifs',
      value: '280',
      change: '+18 cette semaine',
      changeClass: 'text-success',
      changeIcon: 'fa-arrow-up',
      icon: 'fa-user-md',
    },
    {
      label: 'Rendez-vous Aujourd\'hui',
      value: '1,240',
      change: '+12% vs hier',
      changeClass: 'text-success',
      changeIcon: 'fa-arrow-up',
      icon: 'fa-calendar-alt',
    },
    {
      label: 'Revenu Mensuel',
      value: '$284,500',
      change: '+8.5% vs mois dernier',
      changeClass: 'text-success',
      changeIcon: 'fa-arrow-up',
      icon: 'fa-dollar-sign',
    },
  ];

  recentAlerts: Alert[] = [
    {
      id: '1',
      type: 'error',
      message: 'Charge serveur à 85%',
      time: 'Il y a 5 minutes',
    },
    {
      id: '2',
      type: 'warning',
      message: '12 vérifications de médecins en attente',
      time: 'Il y a 1 heure',
    },
    {
      id: '3',
      type: 'success',
      message: 'Sauvegarde quotidienne terminée',
      time: 'Il y a 2 heures',
    },
    {
      id: '4',
      type: 'info',
      message: 'Nouvelle version de plateforme disponible',
      time: 'Il y a 3 heures',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialiser les données du dashboard
   */
  private initializeData(): void {
    // TODO: Appeler les services pour récupérer les données réelles
  }

  /**
   * Actualiser les données du dashboard
   */
  refreshData(): void {
    console.log('Actualisation des données...');
    // TODO: Implémenter la logique d'actualisation
  }

  /**
   * Obtenir l'icône selon le type d'alerte
   */
  getAlertIcon(type: string): string {
    const icons: { [key: string]: string } = {
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      success: 'fa-check-circle',
      info: 'fa-info-circle',
    };
    return icons[type] || 'fa-bell';
  }

  /**
   * Fermer une alerte
   */
  closeAlert(alert: Alert): void {
    const index = this.recentAlerts.findIndex(a => a.id === alert.id);
    if (index > -1) {
      this.recentAlerts.splice(index, 1);
    }
  }
}