// src/app/frontoffice/landing/landing.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {

  currentYear = new Date().getFullYear();
  openFaq: number | null = null;

  stats = [
    { value: '50 000+', labelKey: 'LANDING.STATS.ACTIVE_PATIENTS' },
    { value: '1 200+',  labelKey: 'LANDING.STATS.DIAGNOSTICS_DAY' },
    { value: '98.4%',   labelKey: 'LANDING.STATS.AI_ACCURACY' },
    { value: '4.9/5',   labelKey: 'LANDING.STATS.SATISFACTION' },
  ];

  features = [
    {
      icon: 'fa-robot',
      color: 'blue',
      titleKey: 'LANDING.FEATURES.AI_DIAG.TITLE',
      descKey: 'LANDING.FEATURES.AI_DIAG.DESC',
      pointKeys: [
        'LANDING.FEATURES.AI_DIAG.POINT_1',
        'LANDING.FEATURES.AI_DIAG.POINT_2',
        'LANDING.FEATURES.AI_DIAG.POINT_3',
      ],
    },
    {
      icon: 'fa-brain',
      color: 'green',
      titleKey: 'LANDING.FEATURES.MENTAL.TITLE',
      descKey: 'LANDING.FEATURES.MENTAL.DESC',
      pointKeys: [
        'LANDING.FEATURES.MENTAL.POINT_1',
        'LANDING.FEATURES.MENTAL.POINT_2',
        'LANDING.FEATURES.MENTAL.POINT_3',
      ],
    },
    {
      icon: 'fa-calendar-check',
      color: 'cyan',
      titleKey: 'LANDING.FEATURES.APPOINTMENTS.TITLE',
      descKey: 'LANDING.FEATURES.APPOINTMENTS.DESC',
      pointKeys: [
        'LANDING.FEATURES.APPOINTMENTS.POINT_1',
        'LANDING.FEATURES.APPOINTMENTS.POINT_2',
        'LANDING.FEATURES.APPOINTMENTS.POINT_3',
      ],
    },
    {
      icon: 'fa-flask',
      color: 'orange',
      titleKey: 'LANDING.FEATURES.LAB.TITLE',
      descKey: 'LANDING.FEATURES.LAB.DESC',
      pointKeys: [
        'LANDING.FEATURES.LAB.POINT_1',
        'LANDING.FEATURES.LAB.POINT_2',
        'LANDING.FEATURES.LAB.POINT_3',
      ],
    },
    {
      icon: 'fa-pills',
      color: 'purple',
      titleKey: 'LANDING.FEATURES.PRESCRIPTIONS.TITLE',
      descKey: 'LANDING.FEATURES.PRESCRIPTIONS.DESC',
      pointKeys: [
        'LANDING.FEATURES.PRESCRIPTIONS.POINT_1',
        'LANDING.FEATURES.PRESCRIPTIONS.POINT_2',
        'LANDING.FEATURES.PRESCRIPTIONS.POINT_3',
      ],
    },
    {
      icon: 'fa-shield-heart',
      color: 'red',
      titleKey: 'LANDING.FEATURES.RECORDS.TITLE',
      descKey: 'LANDING.FEATURES.RECORDS.DESC',
      pointKeys: [
        'LANDING.FEATURES.RECORDS.POINT_1',
        'LANDING.FEATURES.RECORDS.POINT_2',
        'LANDING.FEATURES.RECORDS.POINT_3',
      ],
    },
  ];

  steps = [
    {
      icon: 'fa-user-plus',
      titleKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_1.TITLE',
      descKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_1.DESC',
    },
    {
      icon: 'fa-stethoscope',
      titleKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_2.TITLE',
      descKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_2.DESC',
    },
    {
      icon: 'fa-heart-pulse',
      titleKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_3.TITLE',
      descKey: 'LANDING.HOW_IT_WORKS.STEPS.STEP_3.DESC',
    },
  ];

  testimonials = [
    {
      text: 'MediCare AI detected my stress level well before I realized how exhausted I was. The tracking is incredibly accurate.',
      name: 'Salma B.',
      role: 'Teacher, Tunis',
      initials: 'SB',
    },
    {
      text: 'As a doctor, I appreciate the quality of pre-diagnoses. It allows me to focus on complex cases and better serve my patients.',
      name: 'Dr. Karim M.',
      role: 'General Practitioner, Sfax',
      initials: 'KM',
    },
    {
      text: 'Managing my prescriptions and appointments on a single platform is a real time-saver. I recommend it to my whole family.',
      name: 'Mehdi T.',
      role: 'Entrepreneur, Sousse',
      initials: 'MT',
    },
  ];

  faqItems = [
    {
      q: 'Does MediCare AI replace a doctor?',
      a: 'No. MediCare AI is a medical decision-support tool. It complements the doctor\'s expertise by providing preliminary analyses and continuous monitoring, but never replaces a professional medical consultation.',
    },
    {
      q: 'Is my health data secure?',
      a: 'Absolutely. All your data is end-to-end encrypted, hosted on HDS-certified servers (Health Data Host) and processed in full compliance with GDPR. You retain full control over your data.',
    },
    {
      q: 'Is the platform free?',
      a: 'Basic access is available for free with essential features. Premium plans offer access to advanced AI analysis, unlimited teleconsultation, and complete medical records.',
    },
    {
      q: 'How does AI stress detection work?',
      a: 'Our system analyzes facial micro-expressions via your camera (with your explicit consent), combined with your sleep and activity data, to calculate a daily mental wellbeing index.',
    },
    {
      q: 'Can I use MediCare AI for my children?',
      a: 'Yes. The platform supports family profiles. A parent can manage the health records of their minor children with pathways adapted to each age group.',
    },
  ];

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? null : i;
  }
}
