import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationService, UserRole } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface Notification {
  id: string;
  title: string;
  time: string;
  type: 'success' | 'warning' | 'error' | 'info';
  icon: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  // UI State
  sidebarCollapsed = false;
  notificationOpen = false;
  userDropdownOpen = false;
  pageTitle = 'Tableau de Bord';

  // User Data
  currentUser: any;
  selectedRole: UserRole = 'patient';

  // Navigation Items by Role
  private patientNavItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/patient/home', icon: 'bi-house-door' },
    { label: 'Rendez-vous', route: '/dashboard/patient/appointments', icon: 'bi-calendar3', badge: 2 },
    { label: 'Dossier Médical', route: '/dashboard/patient/records', icon: 'bi-file-medical' },
    { label: 'Ordonnances', route: '/dashboard/patient/prescriptions', icon: 'bi-capsule', badge: 5 },
    { label: 'Assistant IA', route: '/dashboard/patient/ai-chat', icon: 'bi-robot' },
    { label: 'Santé Mentale', route: '/dashboard/patient/mental-health', icon: 'bi-heart-pulse' },
    { label: 'Pharmacie', route: '/dashboard/patient/pharmacy', icon: 'bi-shop' },
    { label: 'Facturation', route: '/dashboard/patient/billing', icon: 'bi-receipt' },
  ];

  private doctorNavItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/doctor/home', icon: 'bi-house-door' },
    { label: 'Mes Patients', route: '/dashboard/doctor/patients', icon: 'bi-people' },
    { label: 'Planning', route: '/dashboard/doctor/appointments', icon: 'bi-calendar2-week' },
    { label: 'Consultations', route: '/dashboard/doctor/consultations', icon: 'bi-chat-dots' },
    { label: 'Finances', route: '/dashboard/doctor/financial', icon: 'bi-graph-up' },
  ];

  private labNavItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/lab/home', icon: 'bi-house-door' },
    { label: 'Saisie Résultats', route: '/dashboard/lab/results', icon: 'bi-clipboard-data' },
    { label: 'Paie', route: '/dashboard/lab/payroll', icon: 'bi-wallet2' },
  ];

  private pharmacyNavItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/pharmacy/home', icon: 'bi-house-door' },
    { label: 'Livraisons', route: '/dashboard/pharmacy/delivery', icon: 'bi-truck' },
    { label: 'Portefeuille', route: '/dashboard/pharmacy/wallet', icon: 'bi-wallet2' },
  ];

  private adminNavItems: NavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/admin/home', icon: 'bi-house-door' },
    { label: 'Utilisateurs', route: '/dashboard/admin/users', icon: 'bi-people' },
    { label: 'Vérifications', route: '/dashboard/admin/verifications', icon: 'bi-check-circle' },
    { label: 'Finances', route: '/dashboard/admin/financials', icon: 'bi-graph-up' },
    { label: 'Paie', route: '/dashboard/admin/payroll', icon: 'bi-wallet2' },
    { label: 'Paramètres', route: '/dashboard/admin/settings', icon: 'bi-gear' },
  ];

  // Notifications
  notifications: Notification[] = [
    {
      id: '1',
      title: 'Nouveau rendez-vous demain',
      time: 'Il y a 5 minutes',
      type: 'info',
      icon: 'bi-calendar-event',
    },
    {
      id: '2',
      title: 'Résultats d\'analyse disponibles',
      time: 'Il y a 2 heures',
      type: 'success',
      icon: 'bi-file-medical',
    },
    {
      id: '3',
      title: 'Mise à jour système disponible',
      time: 'Hier',
      type: 'warning',
      icon: 'bi-arrow-up-circle',
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private navService: NavigationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.authService.getCurrentUser();

    // Initialize selectedRole from AuthService (handles page refresh correctly)
    if (this.currentUser?.role) {
      this.selectedRole = this.currentUser.role as UserRole;
    }

    // Subscribe to role changes (handles role switch at runtime)
    this.navService.userRole$
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        if (role) {
          this.selectedRole = role;
        }
      });

    // Update page title based on route
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updatePageTitle();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Get navigation sections based on role
   */
  getNavSections(): NavSection[] {
    const roleNavMap: Record<UserRole, NavItem[]> = {
      patient: this.patientNavItems,
      doctor: this.doctorNavItems,
      lab: this.labNavItems,
      pharmacy: this.pharmacyNavItems,
      admin: this.adminNavItems,
    };

    const items = roleNavMap[this.selectedRole] || [];

    // Group items into sections
    const mainSection: NavSection = {
      title: 'MENU PRINCIPAL',
      items: items.slice(0, 3),
    };

    const otherSection: NavSection = {
      title: 'AUTRES',
      items: items.slice(3),
    };

    return [mainSection, otherSection].filter((s) => s.items.length > 0);
  }

  /**
   * Toggle sidebar collapse state
   */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  /**
   * Toggle notifications panel
   */
  toggleNotifications(): void {
    this.notificationOpen = !this.notificationOpen;
    this.userDropdownOpen = false;
  }

  /**
   * Toggle user dropdown menu
   */
  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
    this.notificationOpen = false;
  }

  /**
   * Open quick action menu
   */
  openQuickAction(): void {
    if (this.selectedRole === 'patient') {
      this.router.navigate(['/dashboard/patient/appointments']);
    } else if (this.selectedRole === 'doctor') {
      this.router.navigate(['/dashboard/doctor/consultations']);
    }
  }

  /**
   * Update page title based on current route
   */
  private updatePageTitle(): void {
    const titleMap: Record<string, string> = {
      '/dashboard/patient/home': 'Tableau de Bord Patient',
      '/dashboard/patient/appointments': 'Rendez-vous',
      '/dashboard/patient/records': 'Dossier Médical',
      '/dashboard/doctor/home': 'Tableau de Bord Médecin',
      '/dashboard/admin/home': 'Tableau de Bord Admin',
    };

    this.pageTitle = titleMap[this.router.url] || 'Tableau de Bord';
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
    this.navService.clearUserData();
    this.router.navigate(['/login']);
  }
}