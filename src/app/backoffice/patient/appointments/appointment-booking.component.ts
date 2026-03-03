import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './appointment-booking.component.html',
})
export class AppointmentBookingComponent {
  bookingForm: FormGroup;
  currentStep = 1;

  doctors = [
    { name: 'Dr. Michael Chen', specialty: 'Cardiology', available: true },
    { name: 'Dr. Sarah Williams', specialty: 'General Practice', available: true },
    { name: 'Dr. Robert Johnson', specialty: 'Dermatology', available: false },
    { name: 'Dr. Lisa Anderson', specialty: 'Neurology', available: true },
  ];

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      specialty: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  nextStep() { if (this.currentStep < 3) this.currentStep++; }
  prevStep() { if (this.currentStep > 1) this.currentStep--; }

  onSubmit() {
    if (this.bookingForm.valid) {
      alert('Appointment booked successfully!');
      this.bookingForm.reset();
      this.currentStep = 1;
    }
  }
}
