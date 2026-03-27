import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutModule } from './shared/layouts/admin-layout.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
