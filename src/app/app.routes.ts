import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout';

import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminBilling } from './features/admin/billing/admin-billing/admin-billing';
import { AdminPharmacy } from './features/admin/pharmacy/admin-pharmacy/admin-pharmacy';

import { FrontHome } from './features/front/front-home/front-home';
import { FrontAppointments } from './features/front/appointments/front-appointments/front-appointments';
import { FrontBilling} from './features/front/billing/front-billing/front-billing';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'billing', component: AdminBilling },
      { path: 'pharmacy', component: AdminPharmacy },
    ],
  },
  {
    path: 'app',
    component: FrontLayoutComponent,
    children: [
      { path: '', component: FrontHome },
      { path: 'appointments', component: FrontAppointments},
      { path: 'billing', component: FrontBilling },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  { path: '**', redirectTo: 'app' },
];