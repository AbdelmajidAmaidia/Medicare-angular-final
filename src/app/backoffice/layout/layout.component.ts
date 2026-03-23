/**
 * @file layout.component.ts
 * @description Composant de mise en page principal du backoffice.
 * Fournit la barre latérale, la navigation par rôle, le menu utilisateur et les notifications.
 */
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

/** Représente un élément de navigation dans la barre latérale */
export interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

/** Représente une section de navigation groupée */
export interface NavSection {
  title: string;
  items: NavItem[];
}

/** Représente une notification utilisateur */
export interface AppNotification {
  id: string;
  title: string;
  time: string;
  type: 'success' | 'warning' | 'error' | 'info';
  icon: string;
  read: boolean;
}

/** Représente l'utilisateur courant */
export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  // ─── UI State ────────────────────────────────────────────────────────────────
  sidebarCollapsed = false;
  notificationOpen = false;
  userDropdownOpen = false;
  mobileMenuOpen = false;

  // ─── Data ─────────────────────────────────────────────────────────────────────
  currentUser: CurrentUser | null = null;
  pageTitle = 'Tableau de Bord';
  notifications: AppNotification[] = [
    {
      id: '1',
      title: 'Nouveau rendez-vous demain',
      time: 'Il y a 5 minutes',
      type: 'info',
      icon: 'bi-calendar-event',
      read: false,
    },
    {
      id: '2',
      title: "Résultats d'analyse disponibles",
      time: 'Il y a 2 heures',
      type: 'success',
      icon: 'bi-file-medical',
      read: false,
    },
    {
      id: '3',
      title: 'Mise à jour système disponible',
      time: 'Hier',
      type: 'warning',
      icon: 'bi-arrow-up-circle',
      read: true,
    },
  ];

  private destroy$ = new Subject<void>();

  // ─── Navigation Maps ──────────────────────────────────────────────────────────

  /** Éléments de navigation du patient */
  private readonly patientNav: NavSection[] = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', route: '/dashboard/patient/home', icon: 'bi-house-door' },
        { label: 'Rendez-vous', route: '/dashboard/patient/appointments', icon: 'bi-calendar3', badge: 2 },
        { label: 'Dossier Médical', route: '/dashboard/patient/records', icon: 'bi-file-medical' },
      ],
    },
    {
      title: 'SERVICES',
      items: [
        { label: 'Ordonnances', route: '/dashboard/patient/prescriptions', icon: 'bi-capsule', badge: 5 },
        { label: 'Assistant IA', route: '/dashboard/patient/ai-chat', icon: 'bi-robot' },
        { label: 'Santé Mentale', route: '/dashboard/patient/mental-health', icon: 'bi-heart-pulse' },
        { label: 'Pharmacie', route: '/dashboard/patient/pharmacy', icon: 'bi-shop' },
        { label: 'Facturation', route: '/dashboard/patient/billing', icon: 'bi-receipt' },
      ],
    },
  ];

  /** Éléments de navigation du médecin */
  private readonly doctorNav: NavSection[] = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', route: '/dashboard/doctor/home', icon: 'bi-house-door' },
        { label: 'Mes Patients', route: '/dashboard/doctor/patients', icon: 'bi-people' },
        { label: 'Planning', route: '/dashboard/doctor/appointments', icon: 'bi-calendar2-week' },
      ],
    },
    {
      title: 'ACTIVITÉ',
      items: [
        { label: 'Consultations', route: '/dashboard/doctor/consultations', icon: 'bi-chat-dots' },
        { label: 'Finances', route: '/dashboard/doctor/financial', icon: 'bi-graph-up' },
      ],
    },
  ];

  /** Éléments de navigation du laboratoire */
  private readonly labNav: NavSection[] = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', route: '/dashboard/lab/home', icon: 'bi-house-door' },
        { label: 'Saisie Résultats', route: '/dashboard/lab/results', icon: 'bi-clipboard-data' },
        { label: 'Paie', route: '/dashboard/lab/payroll', icon: 'bi-wallet2' },
      ],
    },
  ];

  /** Éléments de navigation de la pharmacie */
  private readonly pharmacyNav: NavSection[] = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', route: '/dashboard/pharmacy/home', icon: 'bi-house-door' },
        { label: 'Livraisons', route: '/dashboard/pharmacy/delivery', icon: 'bi-truck' },
        { label: 'Portefeuille', route: '/dashboard/pharmacy/wallet', icon: 'bi-wallet2' },
      ],
    },
  ];

  /** Éléments de navigation de l'administrateur */
  private readonly adminNav: NavSection[] = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { label: 'Tableau de Bord', route: '/dashboard/admin/home', icon: 'bi-house-door' },
        { label: 'Utilisateurs', route: '/dashboard/admin/users', icon: 'bi-people' },
        { label: 'Vérifications', route: '/dashboard/admin/verifications', icon: 'bi-patch-check' },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Finances', route: '/dashboard/admin/financials', icon: 'bi-graph-up' },
        { label: 'Paie', route: '/dashboard/admin/payroll', icon: 'bi-wallet2' },
        { label: 'Paramètres', route: '/dashboard/admin/settings', icon: 'bi-gear' },
      ],
    },
  ];

  constructor(
    private router: Router,
    private navService: NavigationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur courant
    this.currentUser = this.authService.getCurrentUser() as CurrentUser | null;

    // Écouter les changements de route pour mettre à jour le titre
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updatePageTitle();
    });
    this.updatePageTitle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  /**
   * Retourne les sections de navigation selon le rôle de l'utilisateur courant.
   */
  getNavSections(): NavSection[] {
    const role = this.currentUser?.role;
    const navMap: Record<string, NavSection[]> = {
      patient: this.patientNav,
      doctor: this.doctorNav,
      lab: this.labNav,
      pharmacy: this.pharmacyNav,
      admin: this.adminNav,
    };
    return navMap[role ?? ''] ?? this.patientNav;
  }

  // ─── UI Actions ──────────────────────────────────────────────────────────────

  /** Bascule l'état replié/déplié de la barre latérale */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.mobileMenuOpen = false;
  }

  /** Bascule le menu mobile */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /** Bascule le panneau de notifications */
  toggleNotifications(): void {
    this.notificationOpen = !this.notificationOpen;
    this.userDropdownOpen = false;
  }

  /** Bascule le menu déroulant utilisateur */
  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
    this.notificationOpen = false;
  }

  /** Ferme tous les panneaux lors d'un clic à l'extérieur */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-dropdown') && !target.closest('.user-dropdown')) {
      this.notificationOpen = false;
      this.userDropdownOpen = false;
    }
  }

  /** Compte des notifications non lues */
  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  /** Marque toutes les notifications comme lues */
  markAllRead(): void {
    this.notifications.forEach(n => (n.read = true));
  }

  /** Supprime une notification */
  dismissNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  /** Déconnecte l'utilisateur et redirige vers la page de connexion */
  logout(): void {
    this.authService.logout();
    this.navService.clearUserData();
    this.router.navigate(['/login']);
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  /** Retourne l'URL de l'avatar dicebear basé sur l'email */
  getAvatarUrl(): string {
    const seed = this.currentUser?.email ?? 'user';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  /** Retourne le libellé du rôle en français */
  getRoleLabel(): string {
    const labels: Record<string, string> = {
      patient: 'Patient',
      doctor: 'Médecin',
      lab: 'Technicien Labo',
      pharmacy: 'Pharmacien',
      admin: 'Administrateur',
    };
    return labels[this.currentUser?.role ?? ''] ?? 'Utilisateur';
  }

  /** Met à jour le titre de la page selon l'URL courante */
  private updatePageTitle(): void {
    const titleMap: Record<string, string> = {
      '/dashboard/patient/home': 'Tableau de Bord Patient',
      '/dashboard/patient/appointments': 'Mes Rendez-vous',
      '/dashboard/patient/records': 'Dossier Médical',
      '/dashboard/patient/prescriptions': 'Ordonnances',
      '/dashboard/patient/ai-chat': 'Assistant IA',
      '/dashboard/patient/mental-health': 'Santé Mentale',
      '/dashboard/patient/pharmacy': 'Pharmacie en Ligne',
      '/dashboard/patient/billing': 'Facturation',
      '/dashboard/doctor/home': 'Tableau de Bord Médecin',
      '/dashboard/doctor/patients': 'Mes Patients',
      '/dashboard/doctor/appointments': 'Mon Planning',
      '/dashboard/doctor/consultations': 'Consultations',
      '/dashboard/doctor/financial': 'Finances',
      '/dashboard/lab/home': 'Tableau de Bord Laboratoire',
      '/dashboard/lab/results': 'Saisie des Résultats',
      '/dashboard/lab/payroll': 'Paie',
      '/dashboard/pharmacy/home': 'Tableau de Bord Pharmacie',
      '/dashboard/pharmacy/delivery': 'Gestion des Livraisons',
      '/dashboard/pharmacy/wallet': 'Portefeuille',
      '/dashboard/admin/home': 'Tableau de Bord Administrateur',
      '/dashboard/admin/users': 'Gestion des Utilisateurs',
      '/dashboard/admin/verifications': 'Vérifications Médecins',
      '/dashboard/admin/financials': 'Finances',
      '/dashboard/admin/payroll': 'Gestion de la Paie',
      '/dashboard/admin/settings': 'Paramètres',
    };
    this.pageTitle = titleMap[this.router.url] ?? 'Tableau de Bord';
  }
}
