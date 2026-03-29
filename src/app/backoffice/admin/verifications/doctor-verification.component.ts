/**
 * @file doctor-verification.component.ts
 * @description Vérification des dossiers de médecins en attente d'activation.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Demande de vérification d'un médecin */
export interface VerificationRequest {
  id: string;
  name: string;
  specialty: string;
  submittedAt: string;
  status: 'En attente' | 'Approuvé' | 'Rejeté';
  documents: string[];
}

@Component({
  selector: 'app-doctor-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-verification.component.html',
})
export class DoctorVerificationComponent {
  requests: VerificationRequest[] = [
    { id: 'VER-001', name: 'Dr. Amina Bouali', specialty: 'Cardiologie', submittedAt: '20 Mar 2026', status: 'En attente', documents: ['diplome.pdf', 'licence.pdf'] },
    { id: 'VER-002', name: 'Dr. Karim Mansouri', specialty: 'Pédiatrie', submittedAt: '18 Mar 2026', status: 'En attente', documents: ['diplome.pdf'] },
    { id: 'VER-003', name: 'Dr. Leila Benali', specialty: 'Dermatologie', submittedAt: '15 Mar 2026', status: 'Approuvé', documents: ['diplome.pdf', 'cv.pdf'] },
  ];

  /** Approuver une demande */
  approve(id: string): void {
    const req = this.requests.find(r => r.id === id);
    if (req) { req.status = 'Approuvé'; }
  }

  /** Rejeter une demande */
  reject(id: string): void {
    const req = this.requests.find(r => r.id === id);
    if (req) { req.status = 'Rejeté'; }
  }

  get pendingCount(): number {
    return this.requests.filter(r => r.status === 'En attente').length;
  }
}
