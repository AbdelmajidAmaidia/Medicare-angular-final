/**
 * @file admin-settings.component.ts
 * @description Paramètres généraux de la plateforme MediCare.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
})
export class AdminSettingsComponent {
  platformName = 'MediCare AI';
  supportEmail = 'support@medicare-ai.dz';
  maintenanceMode = false;
  maxAppointmentsPerDay = 50;
  allowRegistrations = true;

  saved = false;

  saveSettings(): void {
    // TODO : persister via un service API
    this.saved = true;
    setTimeout(() => (this.saved = false), 3000);
  }
}
