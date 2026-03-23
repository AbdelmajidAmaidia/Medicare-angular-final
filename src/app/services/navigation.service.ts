import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'patient' | 'doctor' | 'lab' | 'pharmacy' | 'admin';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private userRoleSubject = new BehaviorSubject<UserRole | null>(this.getRoleFromStorage());
  userRole$ = this.userRoleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>(this.getUserNameFromStorage());
  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router) {}

  /**
   * Get current user role
   */
  get currentRole(): UserRole | null {
    return this.userRoleSubject.getValue();
  }

  /**
   * Get current user name
   */
  get currentUserName(): string {
    return this.userNameSubject.getValue();
  }

  /**
   * Set user role and navigate
   */
  setRole(role: UserRole): void {
    this.userRoleSubject.next(role);
    localStorage.setItem('user_role', role);
    this.navigateToRoleHome(role);
  }

  /**
   * Set user name
   */
  setUserName(name: string): void {
    this.userNameSubject.next(name);
    localStorage.setItem('user_name', name);
  }

  /**
   * Navigate to home page based on role
   */
  private navigateToRoleHome(role: UserRole): void {
    const homePages: Record<UserRole, string> = {
      patient: '/dashboard/patient/home',
      doctor: '/dashboard/doctor/home',
      lab: '/dashboard/lab/home',
      pharmacy: '/dashboard/pharmacy/home',
      admin: '/dashboard/admin/home',
    };
    this.router.navigate([homePages[role]]);
  }

  /**
   * Navigate to custom path
   */
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    return this.currentRole === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: UserRole[]): boolean {
    return roles.includes(this.currentRole!);
  }

  /**
   * Clear user data and logout
   */
  clearUserData(): void {
    this.userRoleSubject.next(null);
    this.userNameSubject.next('');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }

  /**
   * Get role from storage
   */
  private getRoleFromStorage(): UserRole | null {
    const role = localStorage.getItem('user_role');
    return (role as UserRole) || null;
  }

  /**
   * Get user name from storage
   */
  private getUserNameFromStorage(): string {
    return localStorage.getItem('user_name') || 'Utilisateur';
  }

  /**
   * Get all available roles
   */
  getAllRoles(): UserRole[] {
    return ['patient', 'doctor', 'lab', 'pharmacy', 'admin'];
  }

  /**
   * Get role label
   */
  getRoleLabel(role: UserRole): string {
    const labels: Record<UserRole, string> = {
      patient: 'Patient',
      doctor: 'Médecin',
      lab: 'Technicien Labo',
      pharmacy: 'Pharmacien',
      admin: 'Administrateur'
    };
    return labels[role];
  }
}