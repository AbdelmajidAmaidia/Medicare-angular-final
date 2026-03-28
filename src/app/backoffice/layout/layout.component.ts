/**
 * @file layout.component.ts
 * @description Composant de mise en page principal du backoffice.
 * Fournit la barre de navigation supérieure, la navigation par rôle et le menu utilisateur.
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { LayoutNavigationService, NavItem, NavSection } from './navigation.service';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher.component';

// Re-export for existing consumers
export type { NavItem, NavSection };

/**
 * Représente une notification utilisateur
 */
export interface AppNotification {
  id: string;
  title: string;
  time: string;
  type: 'success' | 'warning' | 'error' | 'info';
  icon: string;
  read: boolean;
}

/**
 * Représente l'utilisateur courant
 */
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
  imports: [CommonModule, RouterOutlet, RouterModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  // ─── State ───────────────────────────────────────────────────────────────
  notificationOpen = false;
  userDropdownOpen = false;
  mobileMenuOpen = false;
  sidebarOpen = true;

  // ─── Data ────────────────────────────────────────────────────────────────
  currentUser: CurrentUser | null = null;
  notifications: AppNotification[] = [
    {
      id: '1',
      title: 'LAYOUT.NOTIF.NEW_APPOINTMENT',
      time: 'LAYOUT.NOTIF.NEW_APPOINTMENT_TIME',
      type: 'info',
      icon: 'bi-calendar-event',
      read: false,
    },
    {
      id: '2',
      title: 'LAYOUT.NOTIF.LAB_RESULTS',
      time: 'LAYOUT.NOTIF.LAB_RESULTS_TIME',
      type: 'success',
      icon: 'bi-file-medical',
      read: false,
    },
    {
      id: '3',
      title: 'LAYOUT.NOTIF.SYSTEM_UPDATE',
      time: 'LAYOUT.NOTIF.SYSTEM_UPDATE_TIME',
      type: 'warning',
      icon: 'bi-arrow-up-circle',
      read: true,
    },
  ];

  constructor(
    private router: Router,
    private navService: NavigationService,
    private authService: AuthService,
    private layoutNavService: LayoutNavigationService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser() as CurrentUser | null;
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  /**
   * Retourne les éléments de navigation plats pour la navbar
   */
  getNavItems(): NavItem[] {
    return this.layoutNavService.getNavItems(this.currentUser?.role ?? '');
  }

  /**
   * Retourne les sections de navigation selon le rôle
   */
  getNavSections(): NavSection[] {
    return this.layoutNavService.getNavSections(this.currentUser?.role ?? '');
  }

  // ─── UI Actions ──────────────────────────────────────────────────────────

  /**
   * Bascule le menu mobile
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Ferme le menu mobile
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  /**
   * Bascule le panneau de messages
   */
  toggleMessages(): void {
    // TODO: implémenter l'affichage du panneau de messagerie
    console.log('Messages panel toggled');
  }

  /**
   * Bascule le panneau de notifications
   */
  toggleNotifications(): void {
    this.notificationOpen = !this.notificationOpen;
    this.userDropdownOpen = false;
  }

  /**
   * Bascule le menu déroulant utilisateur
   */
  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
    this.notificationOpen = false;
  }

  /**
   * Bascule la barre latérale
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Ferme les dropdowns lors d'un clic à l'extérieur
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.notification-dropdown') &&
      !target.closest('.user-dropdown') &&
      !target.closest('.notification-btn') &&
      !target.closest('.user-profile')
    ) {
      this.notificationOpen = false;
      this.userDropdownOpen = false;
    }
  }

  /**
   * Compte des notifications non lues
   */
  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  /**
   * Marque toutes les notifications comme lues
   */
  markAllRead(): void {
    this.notifications.forEach(n => (n.read = true));
  }

  /**
   * Supprime une notification
   */
  dismissNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  /**
   * Gestion de la recherche
   */
  onSearch(event: KeyboardEvent): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('Recherche:', query);
    // Implémenter la logique de recherche
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.authService.logout();
    this.navService.clearUserData();
    this.router.navigate(['/login']);
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  /**
   * Retourne l'URL de l'avatar
   */
  getAvatarUrl(): string {
    const seed = this.currentUser?.email ?? 'user';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  /**
   * Returns role label using translation key
   */
  getRoleLabel(): string {
    const roleKeys: Record<string, string> = {
      patient: 'ROLES.PATIENT',
      doctor: 'ROLES.DOCTOR',
      lab: 'ROLES.LAB',
      pharmacy: 'ROLES.PHARMACY',
      admin: 'ROLES.ADMIN',
    };
    const key = roleKeys[this.currentUser?.role ?? ''] ?? 'ROLES.PATIENT';
    return this.translate.instant(key);
  }
}