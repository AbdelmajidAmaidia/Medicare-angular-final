/**
 * @file admin-layout.component.ts
 * @description Composant de mise en page spécialisé pour l'espace administrateur.
 * Fournit une barre latérale rétractable et une barre de navigation supérieure.
 */
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NavigationService } from '../../../../services/navigation.service';

/** Élément de navigation de la barre latérale admin */
export interface AdminNavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  userDropdownOpen = false;

  currentUser: { firstName: string; lastName: string; email: string; role: string } | null = null;

  /** Éléments de navigation principales */
  readonly mainNavItems: AdminNavItem[] = [
    { label: 'Tableau de Bord', route: '/dashboard/admin/home', icon: 'bi-speedometer2' },
    { label: 'Utilisateurs', route: '/dashboard/admin/users', icon: 'bi-people' },
    { label: 'Vérifications', route: '/dashboard/admin/verifications', icon: 'bi-patch-check' },
  ];

  /** Éléments de navigation administration */
  readonly adminNavItems: AdminNavItem[] = [
    { label: 'Finances', route: '/dashboard/admin/financials', icon: 'bi-graph-up' },
    { label: 'Paie', route: '/dashboard/admin/payroll', icon: 'bi-wallet2' },
    { label: 'Paramètres', route: '/dashboard/admin/settings', icon: 'bi-gear' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private navService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser() as typeof this.currentUser;
  }

  /** Bascule l'état replié/déplié de la barre latérale */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  /** Bascule le menu déroulant utilisateur */
  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  /** Ferme le menu déroulant lors d'un clic à l'extérieur */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.admin-user-dropdown')) {
      this.userDropdownOpen = false;
    }
  }

  /** Retourne l'URL de l'avatar basé sur l'email */
  getAvatarUrl(): string {
    const seed = this.currentUser?.email ?? 'admin';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  /** Déconnecte l'utilisateur */
  logout(): void {
    this.authService.logout();
    this.navService.clearUserData();
    this.router.navigate(['/login']);
  }
}
