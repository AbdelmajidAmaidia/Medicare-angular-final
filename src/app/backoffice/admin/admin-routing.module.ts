import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'home',
        title: 'Tableau de bord admin',
        loadComponent: () =>
          import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'users',
        title: 'Gestion des utilisateurs',
        loadComponent: () =>
          import('./users/user-management.component').then(m => m.UserManagementComponent),
      },
      {
        path: 'verifications',
        title: 'Vérification des médecins',
        loadComponent: () =>
          import('./verifications/doctor-verification.component').then(m => m.DoctorVerificationComponent),
      },
      {
        path: 'financials',
        title: 'Finances admin',
        loadComponent: () =>
          import('./financials/financial-admin.component').then(m => m.FinancialAdminComponent),
      },
      {
        path: 'payroll',
        title: 'Gestion de la paie',
        loadComponent: () =>
          import('./payroll/payroll-management.component').then(m => m.PayrollManagementComponent),
      },
      {
        path: 'settings',
        title: 'Paramètres',
        loadComponent: () =>
          import('./settings/admin-settings.component').then(m => m.AdminSettingsComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
