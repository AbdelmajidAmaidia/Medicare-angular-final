import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppRole = 'ADMIN' | 'DOCTOR' | 'PHARMACIST' | 'LAB' | 'SUPPORT' | 'PATIENT';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  roles: AppRole[];
}

const LS_KEY = 'medicare_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user$ = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$ = this._user$.asObservable();

  get user(): AuthUser | null {
    return this._user$.value;
  }

  get isAuthenticated(): boolean {
    return !!this._user$.value;
  }

  loginAs(role: AppRole) {
    const user: AuthUser = {
      id: crypto.randomUUID(),
      fullName: role === 'PATIENT' ? 'Patient Demo' : 'Staff Demo',
      email: 'demo@medicare.local',
      roles: [role],
    };
    localStorage.setItem(LS_KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  logout() {
    localStorage.removeItem(LS_KEY);
    this._user$.next(null);
  }

  hasRole(role: AppRole): boolean {
    return (this._user$.value?.roles || []).includes(role);
  }

  private readUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}