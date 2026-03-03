import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'patient' | 'doctor' | 'lab' | 'pharmacy' | 'admin';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private userRoleSubject = new BehaviorSubject<UserRole>('patient');
  userRole$ = this.userRoleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('Sarah Martinez');
  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router) {}

  get currentRole(): UserRole { return this.userRoleSubject.getValue(); }
  get currentUserName(): string { return this.userNameSubject.getValue(); }

  setRole(role: UserRole): void {
    this.userRoleSubject.next(role);
    const homePages: Record<UserRole, string> = {
      patient: '/dashboard/patient/home',
      doctor: '/dashboard/doctor/home',
      lab: '/dashboard/lab/home',
      pharmacy: '/dashboard/pharmacy/home',
      admin: '/dashboard/admin/home',
    };
    this.router.navigate([homePages[role]]);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
