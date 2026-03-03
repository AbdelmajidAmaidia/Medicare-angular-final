import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    { title: 'Online Consultations', desc: 'Video and chat consultations with certified doctors.' },
    { title: 'AI Diagnostics', desc: 'Symptom analysis powered by machine learning.' },
    { title: 'Lab Results', desc: 'Digital lab results with AI-powered explanations.' },
    { title: 'E-Prescriptions', desc: 'Digital prescriptions sent directly to pharmacies.' },
    { title: 'Pharmacy Delivery', desc: 'Medication delivered to your door.' },
    { title: 'Health Records', desc: 'Secure digital storage of all medical records.' },
  ];
}
