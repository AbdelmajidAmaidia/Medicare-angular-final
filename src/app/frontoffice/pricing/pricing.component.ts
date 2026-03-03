import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  plans = [
    { name: 'Basic', price: 'Free', features: ['5 AI consultations/month', 'Basic health tracking', 'Appointment booking'] },
    { name: 'Plus', price: '$29/mo', features: ['Unlimited AI consultations', 'Priority appointments', 'Lab results integration', 'Prescription management'] },
    { name: 'Premium', price: '$79/mo', features: ['Everything in Plus', 'Dedicated care team', 'Specialist access', 'Home lab tests', 'Emergency support'] },
  ];
}
