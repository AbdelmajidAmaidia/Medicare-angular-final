/**
 * @file navigation.service.ts
 * @description Service de génération des menus de navigation du backoffice.
 * Centralise la définition des éléments de navigation par rôle utilisateur.
 */
import { Injectable } from '@angular/core';

/** Représente un élément de navigation individuel */
export interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

/** Représente une section de navigation groupée (utilisée dans le menu mobile) */
export interface NavSection {
  title: string;
  items: NavItem[];
}

/** Rôles utilisateurs supportés */
export type NavRole = 'patient' | 'doctor' | 'lab' | 'pharmacy' | 'admin';

@Injectable({ providedIn: 'root' })
export class LayoutNavigationService {
  /**
   * Source unique de vérité pour la navigation par rôle.
   *
   * Convention : la PREMIÈRE section contient les éléments affichés dans la
   * navbar horizontale desktop. Les sections supplémentaires fournissent des
   * liens supplémentaires uniquement dans le menu mobile.
   *
   * Note: /doctor/financial and /admin/financials are distinct routes as defined
   * in app.routes.ts (different pluralisation per backend naming convention).
   */
  private readonly navSectionsByRole: Record<NavRole, NavSection[]> = {
    doctor: [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Dashboard',     route: '/dashboard/doctor/home',         icon: 'bi-house-door' },
          { label: 'Patients',      route: '/dashboard/doctor/patients',      icon: 'bi-people' },
          { label: 'Planning',      route: '/dashboard/doctor/appointments',  icon: 'bi-calendar2-week' },
          { label: 'Consultations', route: '/dashboard/doctor/consultations', icon: 'bi-chat-dots' },
        ],
      },
      {
        title: 'ACTIVITY',
        items: [
          { label: 'Financials', route: '/dashboard/doctor/financial', icon: 'bi-graph-up' },
        ],
      },
    ],
    patient: [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Dashboard',       route: '/dashboard/patient/home',          icon: 'bi-house-door' },
          { label: 'Appointments',    route: '/dashboard/patient/appointments',  icon: 'bi-calendar3',   badge: 2 },
          { label: 'Medical Records', route: '/dashboard/patient/records',       icon: 'bi-file-medical' },
          { label: 'Prescriptions',   route: '/dashboard/patient/prescriptions', icon: 'bi-capsule',     badge: 5 },
        ],
      },
      {
        title: 'SERVICES',
        items: [
          { label: 'AI Assistant',  route: '/dashboard/patient/ai-chat',       icon: 'bi-robot' },
          { label: 'Mental Health', route: '/dashboard/patient/mental-health', icon: 'bi-heart-pulse' },
          { label: 'Pharmacy',      route: '/dashboard/patient/pharmacy',      icon: 'bi-shop' },
          { label: 'Billing',       route: '/dashboard/patient/billing',       icon: 'bi-receipt' },
        ],
      },
    ],
    lab: [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Dashboard', route: '/dashboard/lab/home',    icon: 'bi-house-door' },
          { label: 'Results',   route: '/dashboard/lab/results', icon: 'bi-clipboard-data' },
          { label: 'Payroll',   route: '/dashboard/lab/payroll', icon: 'bi-wallet2' },
        ],
      },
    ],
    pharmacy: [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Dashboard',  route: '/dashboard/pharmacy/home',     icon: 'bi-house-door' },
          { label: 'Deliveries', route: '/dashboard/pharmacy/delivery', icon: 'bi-truck' },
          { label: 'Wallet',     route: '/dashboard/pharmacy/wallet',   icon: 'bi-wallet2' },
        ],
      },
    ],
    admin: [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Dashboard',     route: '/dashboard/admin/home',          icon: 'bi-house-door' },
          { label: 'Users',         route: '/dashboard/admin/users',         icon: 'bi-people' },
          { label: 'Verifications', route: '/dashboard/admin/verifications', icon: 'bi-patch-check' },
        ],
      },
      {
        title: 'ADMINISTRATION',
        items: [
          { label: 'Financials', route: '/dashboard/admin/financials', icon: 'bi-graph-up' },
          { label: 'Payroll',    route: '/dashboard/admin/payroll',    icon: 'bi-wallet2' },
          { label: 'Settings',   route: '/dashboard/admin/settings',   icon: 'bi-gear' },
        ],
      },
    ],
  };

  /**
   * Retourne les éléments de navigation plats pour la navbar horizontale desktop.
   * Les éléments proviennent de la première section de chaque rôle.
   * @param role - Rôle de l'utilisateur
   */
  getNavItems(role: string): NavItem[] {
    const sections = this.getNavSections(role);
    return sections.length > 0 ? sections[0].items : [];
  }

  /**
   * Retourne les sections de navigation pour le menu mobile.
   * @param role - Rôle de l'utilisateur
   */
  getNavSections(role: string): NavSection[] {
    return this.navSectionsByRole[role as NavRole] ?? this.navSectionsByRole['patient'];
  }

  /**
   * Retourne la route d'accueil selon le rôle.
   * @param role - Rôle de l'utilisateur
   */
  getHomeRoute(role: string): string {
    const homes: Record<NavRole, string> = {
      patient:  '/dashboard/patient/home',
      doctor:   '/dashboard/doctor/home',
      lab:      '/dashboard/lab/home',
      pharmacy: '/dashboard/pharmacy/home',
      admin:    '/dashboard/admin/home',
    };
    return homes[role as NavRole] ?? '/dashboard/patient/home';
  }
}

