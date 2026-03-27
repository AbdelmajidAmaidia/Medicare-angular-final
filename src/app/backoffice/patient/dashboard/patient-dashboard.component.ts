/**
 * @file patient-dashboard.component.ts
 * @description Tableau de bord patient avec résumé santé et prochain rendez-vous.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  icon: string;
  status: 'good' | 'warning' | 'critical';
}

export interface UpcomingAppointment {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: 'Présentiel' | 'Téléconsultation';
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent implements OnInit {
  currentDate = new Date();

  metrics: HealthMetric[] = [
    { label: 'Fréquence Cardiaque', value: '72', unit: 'bpm', icon: 'bi-heart-pulse', status: 'good' },
    { label: 'Pression Artérielle', value: '135/85', unit: 'mmHg', icon: 'bi-activity', status: 'warning' },
    { label: 'Glycémie', value: '5.6', unit: 'mmol/L', icon: 'bi-droplet', status: 'good' },
    { label: 'IMC', value: '24.8', unit: 'kg/m²', icon: 'bi-person', status: 'good' },
  ];

  upcomingAppointments: UpcomingAppointment[] = [
    { doctor: 'Dr. Michael Chen', specialty: 'Cardiologie', date: '25 Mars 2026', time: '10:00', type: 'Présentiel' },
    { doctor: 'Dr. Sarah Kim', specialty: 'Endocrinologie', date: '2 Avr 2026', time: '14:30', type: 'Téléconsultation' },
  ];

  recentActivities = [
    { type: 'Ordonnance', desc: 'Metformine 500mg renouvelée', date: '20 Mar 2026', icon: 'bi-capsule' },
    { type: 'Résultat', desc: 'Bilan sanguin disponible', date: '18 Mar 2026', icon: 'bi-file-medical' },
    { type: 'Consultation', desc: 'Consultation Dr. Chen', date: '15 Mar 2026', icon: 'bi-chat-dots' },
  ];

  ngOnInit(): void {
    // TODO : charger les données via PatientService
  }

  getMetricClass(status: HealthMetric['status']): string {
    const map: Record<HealthMetric['status'], string> = {
      good: 'metric--good',
      warning: 'metric--warning',
      critical: 'metric--critical',
    };
    return map[status];
  }
}
