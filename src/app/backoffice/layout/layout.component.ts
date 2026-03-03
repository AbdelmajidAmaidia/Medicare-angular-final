import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationService, UserRole } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

interface NavItem { label: string; route: string; }

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  selectedRole: UserRole = 'patient';
  userName = '';
  navItems: NavItem[] = [];

  private patientNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/patient/home' },
    { label: 'Appointments', route: '/dashboard/patient/appointments' },
    { label: 'Medical Records', route: '/dashboard/patient/records' },
    { label: 'AI Assistant', route: '/dashboard/patient/ai-chat' },
    { label: 'Billing', route: '/dashboard/patient/billing' },
    { label: 'Pharmacy', route: '/dashboard/patient/pharmacy' },
    { label: 'Prescriptions', route: '/dashboard/patient/prescriptions' },
    { label: 'Mental Health', route: '/dashboard/patient/mental-health' },
    { label: 'Pricing Plans', route: '/dashboard/patient/pricing' },
  ];

  private doctorNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/doctor/home' },
    { label: 'My Patients', route: '/dashboard/doctor/patients' },
    { label: 'Appointments', route: '/dashboard/doctor/appointments' },
    { label: 'Consultations', route: '/dashboard/doctor/consultations' },
    { label: 'Financials', route: '/dashboard/doctor/financial' },
  ];

  private labNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/lab/home' },
    { label: 'Lab Results', route: '/dashboard/lab/results' },
    { label: 'Payroll', route: '/dashboard/lab/payroll' },
  ];

  private pharmacyNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/pharmacy/home' },
    { label: 'Delivery', route: '/dashboard/pharmacy/delivery' },
    { label: 'Wallet', route: '/dashboard/pharmacy/wallet' },
  ];

  private adminNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/admin/home' },
    { label: 'Users', route: '/dashboard/admin/users' },
    { label: 'Verifications', route: '/dashboard/admin/verifications' },
    { label: 'Financials', route: '/dashboard/admin/financials' },
    { label: 'Payroll', route: '/dashboard/admin/payroll' },
    { label: 'Settings', route: '/dashboard/admin/settings' },
  ];

  constructor(
    public router: Router,
    private navService: NavigationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.navService.userRole$.subscribe(role => {
      this.selectedRole = role;
      this.updateNavItems(role);
    });
    this.navService.userName$.subscribe(name => { this.userName = name; });
  }

  updateNavItems(role: UserRole) {
    const map: Record<UserRole, NavItem[]> = {
      patient: this.patientNavItems,
      doctor: this.doctorNavItems,
      lab: this.labNavItems,
      pharmacy: this.pharmacyNavItems,
      admin: this.adminNavItems,
    };
    this.navItems = map[role];
  }

  onRoleChange(role: UserRole) { this.navService.setRole(role); }
  logout() { this.authService.logout(); }
}
