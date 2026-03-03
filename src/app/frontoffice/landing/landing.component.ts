import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  features = [
    { icon: 'AI', title: 'AI-Powered Diagnostics', desc: 'Advanced AI analyzes symptoms and medical history for accurate diagnoses.' },
    { icon: 'APT', title: 'Smart Appointments', desc: 'Book appointments with top doctors instantly, anytime.' },
    { icon: 'RX', title: 'Digital Prescriptions', desc: 'Receive and manage prescriptions digitally, sent directly to your pharmacy.' },
    { icon: 'LAB', title: 'Lab Integration', desc: 'View lab results instantly, explained in plain language by our AI.' },
  ];
}
