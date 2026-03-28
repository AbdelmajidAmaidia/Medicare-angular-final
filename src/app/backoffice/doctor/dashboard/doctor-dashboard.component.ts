/**
 * @file doctor-dashboard.component.ts
 * @description Tableau de bord du médecin : planning du jour, statistiques cliniques.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Rendez-vous de la journée */
export interface TodayAppointment {
  patient: string;
  age: number;
  type: string;
  time: string;
  status: 'Arrivé' | 'En attente' | 'Planifié' | 'Urgent';
}

/** Carte de statistique */
export interface DoctorStat {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
})
export class DoctorDashboardComponent implements OnInit {
  currentDate = new Date();

  stats: DoctorStat[] = [
    { label: "Rendez-vous Aujourd'hui", value: '8', icon: 'bi-calendar-check', colorClass: 'primary' },
    { label: 'Patients Total', value: '142', icon: 'bi-people', colorClass: 'success' },
    { label: 'Avis en Attente', value: '5', icon: 'bi-clipboard2-pulse', colorClass: 'warning' },
    { label: 'Gains du Mois', value: '12 450 €', icon: 'bi-cash-coin', colorClass: 'info' },
  ];

  todayAppointments: TodayAppointment[] = [
    { patient: 'John Smith', age: 45, type: 'Suivi', time: '09:00', status: 'Arrivé' },
    { patient: 'Maria Garcia', age: 32, type: 'Nouveau patient', time: '10:00', status: 'En attente' },
    { patient: 'David Lee', age: 58, type: 'Consultation', time: '11:00', status: 'Planifié' },
    { patient: 'Emma Wilson', age: 28, type: 'Suivi', time: '14:00', status: 'Planifié' },
    { patient: 'James Brown', age: 67, type: 'Urgence', time: '15:30', status: 'Urgent' },
  ];

  ngOnInit(): void {
    // TODO : charger le planning réel via DoctorService
  }

  /** Retourne la classe CSS du badge de statut RDV */
  getStatusClass(status: TodayAppointment['status']): string {
    const map: Record<TodayAppointment['status'], string> = {
      'Arrivé': 'status--active',
      'En attente': 'status--pending',
      'Planifié': 'status--info',
      'Urgent': 'status--urgent',
    };
    return map[status];
  }
}
