import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AuthService, UserRole } from './services/auth.service';

export const routes: Routes = [

  // ─────────────────────────────────────────
  // Redirect racine
  // ─────────────────────────────────────────
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },

  // ─────────────────────────────────────────
  // Front Office (public)
  // ─────────────────────────────────────────
  {
    path: 'landing',
    title: 'Accueil',
    loadComponent: () =>
      import('./frontoffice/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'about',
    title: 'À propos',
    loadComponent: () =>
      import('./frontoffice/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'services',
    title: 'Services',
    loadComponent: () =>
      import('./frontoffice/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'blog',
    title: 'Blog',
    loadComponent: () =>
      import('./frontoffice/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'pricing',
    title: 'Tarifs',
    loadComponent: () =>
      import('./frontoffice/pricing/pricing.component').then(m => m.PricingComponent),
  },
  {
    path: 'login',
    title: 'Connexion',
    loadComponent: () =>
      import('./frontoffice/auth/auth.component').then(m => m.AuthComponent),
  },

  // ─────────────────────────────────────────
  // Back Office (protégé)
  // ─────────────────────────────────────────
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./backoffice/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [

      // Redirect par défaut vers le home du rôle connecté
      // Note: authGuard runs before this redirect, ensuring the user is authenticated.
      {
        path: '',
        pathMatch: 'full',
        redirectTo: () => {
          const authService = inject(AuthService);
          const user = authService.getCurrentUser();
          const validRoles: UserRole[] = ['patient', 'doctor', 'lab', 'pharmacy', 'admin'];
          const role: UserRole =
            user?.role && validRoles.includes(user.role) ? user.role : 'patient';
          return `${role}/home`;
        },
      },

      // ── Patient ──────────────────────────
      {
        path: 'patient/home',
        title: 'Tableau de bord patient',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent),
      },
      {
        path: 'patient/appointments',
        title: 'Mes rendez-vous',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/appointments/patient-appointments.component').then(m => m.PatientAppointmentsComponent),
      },
      {
        path: 'patient/records',
        title: 'Dossier médical',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/records/medical-records.component').then(m => m.MedicalRecordsComponent),
      },
      {
        path: 'patient/ai-chat',
        title: 'Assistant IA',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/ai-chat/ai-chat.component').then(m => m.AiChatComponent),
      },
      {
        path: 'patient/billing',
        title: 'Historique de facturation',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/billing/patient-billing.component').then(m => m.PatientBillingComponent),
      },
      {
        path: 'patient/pharmacy',
        title: 'Commandes pharmacie',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/pharmacy/patient-pharmacy.component').then(m => m.PatientPharmacyComponent),
      },
      {
        path: 'patient/prescriptions',
        title: 'Ordonnances',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/prescriptions/prescriptions.component').then(m => m.PrescriptionsComponent),
      },
      {
        path: 'patient/mental-health',
        title: 'Santé mentale',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./backoffice/patient/mental-health/mental-health.component').then(m => m.MentalHealthComponent),
      },
      {
        path: 'patient/pricing',
        title: 'Tarifs',
        canActivate: [roleGuard],
        data: { roles: ['patient'] },
        loadComponent: () =>
          import('./frontoffice/pricing/pricing.component').then(m => m.PricingComponent),
      },

      // ── Médecin ──────────────────────────
      {
        path: 'doctor/home',
        title: 'Tableau de bord médecin',
        canActivate: [roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () =>
          import('./backoffice/doctor/dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent),
      },
      {
        path: 'doctor/patients',
        title: 'Mes patients',
        canActivate: [roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () =>
          import('./backoffice/doctor/patients/patient-list.component').then(m => m.PatientListComponent),
      },
      {
        path: 'doctor/appointments',
        title: 'Planning',
        canActivate: [roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () =>
          import('./backoffice/doctor/appointments/appointment-planning.component').then(m => m.AppointmentPlanningComponent),
      },
      {
        path: 'doctor/consultations',
        title: 'Consultations',
        canActivate: [roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () =>
          import('./backoffice/doctor/consultations/consultation-history.component').then(m => m.ConsultationHistoryComponent),
      },
      {
        path: 'doctor/financial',
        title: 'Finances',
        canActivate: [roleGuard],
        data: { roles: ['doctor'] },
        loadComponent: () =>
          import('./backoffice/doctor/financial/doctor-financial.component').then(m => m.DoctorFinancialComponent),
      },

      // ── Laboratoire ───────────────────────
      {
        path: 'lab/home',
        title: 'Tableau de bord laboratoire',
        canActivate: [roleGuard],
        data: { roles: ['lab'] },
        loadComponent: () =>
          import('./backoffice/lab/dashboard/lab-dashboard.component').then(m => m.LabDashboardComponent),
      },
      {
        path: 'lab/results',
        title: 'Saisie des résultats',
        canActivate: [roleGuard],
        data: { roles: ['lab'] },
        loadComponent: () =>
          import('./backoffice/lab/results/lab-results.component').then(m => m.LabResultsComponent),
      },
      {
        path: 'lab/payroll',
        title: 'Paie laboratoire',
        canActivate: [roleGuard],
        data: { roles: ['lab'] },
        loadComponent: () =>
          import('./backoffice/lab/payroll/lab-payroll.component').then(m => m.LabPayrollComponent),
      },

      // ── Pharmacie ────────────────────────
      {
        path: 'pharmacy/home',
        title: 'Tableau de bord pharmacie',
        canActivate: [roleGuard],
        data: { roles: ['pharmacy'] },
        loadComponent: () =>
          import('./backoffice/pharmacy/dashboard/pharmacy-dashboard.component').then(m => m.PharmacyDashboardComponent),
      },
      {
        path: 'pharmacy/delivery',
        title: 'Gestion des livraisons',
        canActivate: [roleGuard],
        data: { roles: ['pharmacy'] },
        loadComponent: () =>
          import('./backoffice/pharmacy/delivery/delivery-management.component').then(m => m.DeliveryManagementComponent),
      },
      {
        path: 'pharmacy/wallet',
        title: 'Portefeuille pharmacie',
        canActivate: [roleGuard],
        data: { roles: ['pharmacy'] },
        loadComponent: () =>
          import('./backoffice/pharmacy/wallet/pharmacy-wallet.component').then(m => m.PharmacyWalletComponent),
      },

      // ── Administrateur ───────────────────
      {
        path: 'admin/home',
        title: 'Tableau de bord admin',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'admin/users',
        title: 'Gestion des utilisateurs',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/users/user-management.component').then(m => m.UserManagementComponent),
      },
      {
        path: 'admin/verifications',
        title: 'Vérification des médecins',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/verifications/doctor-verification.component').then(m => m.DoctorVerificationComponent),
      },
      {
        path: 'admin/financials',
        title: 'Finances admin',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/financials/financial-admin.component').then(m => m.FinancialAdminComponent),
      },
      {
        path: 'admin/payroll',
        title: 'Gestion de la paie',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/payroll/payroll-management.component').then(m => m.PayrollManagementComponent),
      },
      {
        path: 'admin/settings',
        title: 'Paramètres',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./backoffice/admin/settings/admin-settings.component').then(m => m.AdminSettingsComponent),
      },

    ],
  },

  // ─────────────────────────────────────────
  // Admin backoffice (layout spécialisé)
  // ─────────────────────────────────────────
  {
    path: 'backoffice/admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadChildren: () =>
      import('./backoffice/admin/admin.module').then(m => m.AdminModule),
  },

];