/**
 * @file layout.component.ts
 * @description Composant de mise en page principal du backoffice.
 * Fournit la barre de navigation supérieure, la navigation par rôle, le menu utilisateur et les notifications.
 */
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { LayoutNavigationService, NavItem, NavSection } from './navigation.service';

// Re-export so existing consumers can still import from this file.
export type { NavItem, NavSection };

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
export class LayoutComponent implements OnInit {
  // ─── UI State ────────────────────────────────────────────────────────────────
  notificationOpen = false;
  userDropdownOpen = false;
  mobileMenuOpen = false;

  // ─── Data ─────────────────────────────────────────────────────────────────────
  currentUser: CurrentUser | null = null;
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

  constructor(
    private router: Router,
    private navService: NavigationService,
    private authService: AuthService,
    private layoutNavService: LayoutNavigationService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser() as CurrentUser | null;
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  /**
   * Retourne les éléments de navigation plats pour la navbar horizontale.
   */
  getNavItems(): NavItem[] {
    return this.layoutNavService.getNavItems(this.currentUser?.role ?? '');
  }

  /**
   * Retourne les sections de navigation selon le rôle (utilisé dans le menu mobile).
   */
  getNavSections(): NavSection[] {
    return this.layoutNavService.getNavSections(this.currentUser?.role ?? '');
  }

  // ─── UI Actions ──────────────────────────────────────────────────────────────

  /** Bascule le menu mobile */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /** Ferme le menu mobile */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
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
}
