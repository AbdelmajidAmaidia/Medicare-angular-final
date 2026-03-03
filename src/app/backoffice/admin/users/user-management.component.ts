import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User { id: string; name: string; email: string; role: string; joined: string; status: string; }

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent {
  searchTerm = '';
  users: User[] = [
    { id: 'USR-001', name: 'Sarah Martinez', email: 'sarah@example.com', role: 'Patient', joined: 'Jan 15, 2024', status: 'Active' },
    { id: 'USR-002', name: 'Dr. Michael Chen', email: 'mchen@example.com', role: 'Doctor', joined: 'Feb 2, 2024', status: 'Active' },
    { id: 'USR-003', name: 'Lab Tech Johnson', email: 'ltjohn@example.com', role: 'Lab', joined: 'Mar 10, 2024', status: 'Active' },
    { id: 'USR-004', name: 'Pharma Smith', email: 'psmith@example.com', role: 'Pharmacy', joined: 'Apr 5, 2024', status: 'Suspended' },
  ];

  get filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
    return this.users.filter(u =>
      u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
