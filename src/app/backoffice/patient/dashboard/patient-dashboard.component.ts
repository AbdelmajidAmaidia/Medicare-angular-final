import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface Appointment {
  doctor: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface LabResult {
  name: string;
  date: Date;
  status: 'Normal' | 'Abnormal' | 'Pending';
}

interface Activity {
  title: string;
  time: string;
  icon: string;
  type: 'success' | 'primary' | 'warning' | 'info';
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent implements OnInit {
  currentUser: any;
  currentDate = new Date();

  stats: Stat[] = [
    {
      label: 'Rendez-vous',
      value: '3',
      icon: 'bi-calendar2-check',
      color: 'primary',
    },
    {
      label: 'Ordonnances',
      value: '5',
      icon: 'bi-capsule',
      color: 'warning',
    },
    {
      label: 'Analyses',
      value: '2',
      icon: 'bi-file-medical',
      color: 'success',
    },
    {
      label: 'Messages',
      value: '1',
      icon: 'bi-chat-dots',
      color: 'info',
    },
  ];

  appointments: Appointment[] = [
    {
      doctor: 'Dr. Martin Dubois',
      specialty: 'Consultation générale',
      date: new Date(2026, 2, 15),
      time: '14:30',
      status: 'Confirmed',
    },
    {
      doctor: 'Dr. Sarah Leroy',
      specialty: 'Téléconsultation',
      date: new Date(2026, 2, 20),
      time: '10:00',
      status: 'Pending',
    },
    {
      doctor: 'Dr. Jean Martin',
      specialty: 'Cardiologie',
      date: new Date(2026, 2, 25),
      time: '15:00',
      status: 'Confirmed',
    },
  ];

  labResults: LabResult[] = [
    {
      name: 'Analyse sanguine complète',
      date: new Date(2026, 2, 10),
      status: 'Normal',
    },
    {
      name: 'Test glycémie',
      date: new Date(2026, 2, 8),
      status: 'Normal',
    },
    {
      name: 'Radiographie thoracique',
      date: new Date(2026, 2, 5),
      status: 'Pending',
    },
  ];

  recentActivities: Activity[] = [
    {
      title: 'Analyse sanguine complétée',
      time: 'Il y a 2 heures',
      icon: 'bi-check-circle-fill',
      type: 'success',
    },
    {
      title: 'Rendez-vous confirmé',
      time: 'Hier',
      icon: 'bi-calendar-check',
      type: 'primary',
    },
    {
      title: 'Nouvelle ordonnance',
      time: 'Il y a 3 jours',
      icon: 'bi-file-earmark-text',
      type: 'warning',
    },
    {
      title: 'Message du Dr. Martin',
      time: 'Il y a 5 jours',
      icon: 'bi-chat-dots-fill',
      type: 'info',
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}