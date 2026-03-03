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
  settings = {
    platformName: 'MediCare AI',
    supportEmail: 'support@medicare-ai.com',
    maintenanceMode: false,
    maxConsultationDuration: 60,
    platformFeePercentage: 10,
    autoVerifyDoctors: false,
  };

  saveSettings() {
    alert('Settings saved successfully.');
  }
}
