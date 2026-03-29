import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';
import { NavigationService } from '../../../../services/navigation.service';
import { LanguageSwitcherComponent } from '../../../../shared/language-switcher/language-switcher.component';

/** Admin sidebar navigation item */
export interface AdminNavItem {
  labelKey: string;
  route: string;
  icon: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  userDropdownOpen = false;

  currentUser: { firstName: string; lastName: string; email: string; role: string } | null = null;

  /** Main navigation items */
  readonly mainNavItems: AdminNavItem[] = [
    { labelKey: 'ADMIN_LAYOUT.NAV.DASHBOARD', route: '/dashboard/admin/home', icon: 'bi-speedometer2' },
    { labelKey: 'ADMIN_LAYOUT.NAV.USERS', route: '/dashboard/admin/users', icon: 'bi-people' },
    { labelKey: 'ADMIN_LAYOUT.NAV.VERIFICATIONS', route: '/dashboard/admin/verifications', icon: 'bi-patch-check' },
  ];

  /** Administration navigation items */
  readonly adminNavItems: AdminNavItem[] = [
    { labelKey: 'ADMIN_LAYOUT.NAV.FINANCES', route: '/dashboard/admin/financials', icon: 'bi-graph-up' },
    { labelKey: 'ADMIN_LAYOUT.NAV.PAYROLL', route: '/dashboard/admin/payroll', icon: 'bi-wallet2' },
    { labelKey: 'ADMIN_LAYOUT.NAV.SETTINGS', route: '/dashboard/admin/settings', icon: 'bi-gear' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private navService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser() as typeof this.currentUser;
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.admin-user-dropdown')) {
      this.userDropdownOpen = false;
    }
  }

  getAvatarUrl(): string {
    const seed = this.currentUser?.email ?? 'admin';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  logout(): void {
    this.authService.logout();
    this.navService.clearUserData();
    this.router.navigate(['/login']);
  }
}
