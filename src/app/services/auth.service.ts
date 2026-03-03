import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(): void {
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/landing']);
  }

  get isLoggedIn(): boolean { return this.isLoggedInSubject.getValue(); }
}
