import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationService, UserRole } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

interface NavItem { label: string; route: string; icon: string; }

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
  sidebarCollapsed = false;

  private patientNavItems: NavItem[] = [
    { label: 'Dashboard',       route: '/dashboard/patient/home',          icon: 'bi bi-grid' },
    { label: 'Appointments',    route: '/dashboard/patient/appointments',   icon: 'bi bi-calendar-check' },
    { label: 'Medical Records', route: '/dashboard/patient/records',        icon: 'bi bi-file-medical' },
    { label: 'AI Assistant',    route: '/dashboard/patient/ai-chat',        icon: 'bi bi-robot' },
    { label: 'Billing',         route: '/dashboard/patient/billing',        icon: 'bi bi-credit-card' },
    { label: 'Pharmacy',        route: '/dashboard/patient/pharmacy',       icon: 'bi bi-capsule' },
    { label: 'Prescriptions',   route: '/dashboard/patient/prescriptions',  icon: 'bi bi-file-text' },
    { label: 'Mental Health',   route: '/dashboard/patient/mental-health',  icon: 'bi bi-brain' },
    { label: 'Pricing Plans',   route: '/dashboard/patient/pricing',        icon: 'bi bi-tag' },
  ];

  private doctorNavItems: NavItem[] = [
    { label: 'Dashboard',    route: '/dashboard/doctor/home',          icon: 'bi bi-grid' },
    { label: 'My Patients',  route: '/dashboard/doctor/patients',      icon: 'bi bi-people' },
    { label: 'Appointments', route: '/dashboard/doctor/appointments',  icon: 'bi bi-calendar-check' },
    { label: 'Consultations', route: '/dashboard/doctor/consultations', icon: 'bi bi-clipboard2-pulse' },
    { label: 'Financials',   route: '/dashboard/doctor/financial',     icon: 'bi bi-cash-stack' },
  ];

  private labNavItems: NavItem[] = [
    { label: 'Dashboard',   route: '/dashboard/lab/home',    icon: 'bi bi-grid' },
    { label: 'Lab Results', route: '/dashboard/lab/results', icon: 'bi bi-microscope' },
    { label: 'Payroll',     route: '/dashboard/lab/payroll', icon: 'bi bi-cash-stack' },
  ];

  private pharmacyNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard/pharmacy/home',     icon: 'bi bi-grid' },
    { label: 'Delivery',  route: '/dashboard/pharmacy/delivery', icon: 'bi bi-truck' },
    { label: 'Wallet',    route: '/dashboard/pharmacy/wallet',   icon: 'bi bi-wallet2' },
  ];

  private adminNavItems: NavItem[] = [
    { label: 'Dashboard',     route: '/dashboard/admin/home',          icon: 'bi bi-grid' },
    { label: 'Users',         route: '/dashboard/admin/users',         icon: 'bi bi-people' },
    { label: 'Verifications', route: '/dashboard/admin/verifications', icon: 'bi bi-shield-check' },
    { label: 'Financials',    route: '/dashboard/admin/financials',    icon: 'bi bi-cash-stack' },
    { label: 'Payroll',       route: '/dashboard/admin/payroll',       icon: 'bi bi-person-badge' },
    { label: 'Settings',      route: '/dashboard/admin/settings',      icon: 'bi bi-gear' },
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

  get userRole(): UserRole { return this.selectedRole; }
  get navigationItems(): NavItem[] { return this.navItems; }
  get pageTitle(): string {
    const active = this.navItems.find(i => this.router.isActive(i.route, false));
    return active?.label ?? 'MediCare AI';
  }

  toggleSidebar(): void { this.sidebarCollapsed = !this.sidebarCollapsed; }

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
