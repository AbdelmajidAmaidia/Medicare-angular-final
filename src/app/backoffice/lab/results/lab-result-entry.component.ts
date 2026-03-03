import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lab-result-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lab-result-entry.component.html',
})
export class LabResultEntryComponent {
  selectedTest = '';
  resultValue = '';
  notes = '';

  pendingTests = [
    { id: 'LAB-001', patient: 'John Smith', test: 'CBC', status: 'Pending' },
    { id: 'LAB-002', patient: 'Maria Garcia', test: 'HbA1c', status: 'In Progress' },
    { id: 'LAB-003', patient: 'Emma Wilson', test: 'X-Ray Analysis', status: 'Pending' },
  ];

  submitResult() {
    if (this.selectedTest && this.resultValue) {
      alert(`Result submitted for test ${this.selectedTest}.`);
      this.selectedTest = '';
      this.resultValue = '';
      this.notes = '';
    }
  }
}
