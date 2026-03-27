import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontoffice-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './frontoffice-layout.component.html',
  styleUrls: ['./frontoffice-layout.component.scss'],
})
export class FrontofficeLayoutComponent {
  currentYear = new Date().getFullYear();
}
