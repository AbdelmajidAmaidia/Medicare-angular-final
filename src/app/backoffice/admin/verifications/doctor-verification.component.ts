import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DoctorVerification {
  id: string; name: string; specialty: string; license: string; submittedDate: string; status: string;
}

@Component({
  selector: 'app-doctor-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-verification.component.html',
})
export class DoctorVerificationComponent {
  verifications: DoctorVerification[] = [
    { id: 'VER-001', name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', license: 'MED-2024-001', submittedDate: 'Dec 14, 2024', status: 'Pending' },
    { id: 'VER-002', name: 'Dr. Lisa Park', specialty: 'Neurology', license: 'MED-2024-002', submittedDate: 'Dec 13, 2024', status: 'Under Review' },
    { id: 'VER-003', name: 'Dr. James Wilson', specialty: 'Orthopedics', license: 'MED-2024-003', submittedDate: 'Dec 12, 2024', status: 'Approved' },
  ];

  approve(id: string) { const v = this.verifications.find(v => v.id === id); if (v) v.status = 'Approved'; }
  reject(id: string) { const v = this.verifications.find(v => v.id === id); if (v) v.status = 'Rejected'; }
}
