import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export type UserRole = 'patient' | 'doctor' | 'lab' | 'pharmacy' | 'admin';

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://api.medicare-ai.local/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USE_MOCK = true; // ← Activer le mock pour le développement

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkTokenExpiration();
  }

  /**
   * Login user
   */
  login(email: string, password: string, role: UserRole, rememberMe: boolean = false): Observable<AuthResponse> {
    // ✅ Mode développement : utiliser le mock
    if (this.USE_MOCK) {
      const mockResponse: AuthResponse = {
        token: this.generateMockToken(email, role),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: '1',
          email: email,
          firstName: 'Test',
          lastName: 'User',
          role: role
        }
      };

      return new Observable(observer => {
        setTimeout(() => {
          this.handleAuthResponse(mockResponse, rememberMe);
          observer.next(mockResponse);
          observer.complete();
        }, 500); // Simuler un délai réseau
      });
    }

    // Mode production : appel l'API réelle
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, {
      email,
      password,
      role
    }).pipe(
      tap(response => this.handleAuthResponse(response, rememberMe)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Register user
   */
  register(firstName: string, lastName: string, email: string, password: string, role: UserRole): Observable<AuthResponse> {
    // ✅ Mode développement : utiliser le mock
    if (this.USE_MOCK) {
      const mockResponse: AuthResponse = {
        token: this.generateMockToken(email, role),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: '1',
          email: email,
          firstName: firstName,
          lastName: lastName,
          role: role
        }
      };

      return new Observable(observer => {
        setTimeout(() => {
          this.handleAuthResponse(mockResponse, false);
          observer.next(mockResponse);
          observer.complete();
        }, 500);
      });
    }

    // Mode production : appel l'API réelle
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
      role
    }).pipe(
      tap(response => this.handleAuthResponse(response, false)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Refresh token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // ✅ Mode développement : utiliser le mock
    if (this.USE_MOCK) {
      const mockResponse: AuthResponse = {
        token: this.generateMockToken('test@example.com', 'admin'),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'admin'
        }
      };

      return new Observable(observer => {
        setTimeout(() => {
          this.storeTokens(mockResponse);
          observer.next(mockResponse);
          observer.complete();
        }, 500);
      });
    }

    // Mode production : appel l'API réelle
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, {
      refreshToken
    }).pipe(
      tap(response => this.storeTokens(response)),
      catchError(error => {
        this.logout();
        return this.handleError(error);
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem('current_user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    const itemStr = localStorage.getItem(this.TOKEN_KEY);
    
    if (!itemStr) {
      return null;
    }

    try {
      const item = JSON.parse(itemStr);
      
      if (new Date().getTime() > item.expiry) {
        localStorage.removeItem(this.TOKEN_KEY);
        return null;
      }

      return item.value;
    } catch {
      return itemStr;
    }
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    const itemStr = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!itemStr) {
      return null;
    }

    try {
      const item = JSON.parse(itemStr);
      
      if (new Date().getTime() > item.expiry) {
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        return null;
      }

      return item.value;
    } catch {
      return itemStr;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.hasToken() && !this.isTokenExpired();
  }

  /**
   * Get current user
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Handle auth response
   */
  private handleAuthResponse(response: AuthResponse, rememberMe: boolean): void {
    this.storeTokens(response, rememberMe);
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  /**
   * Store tokens in localStorage
   */
  private storeTokens(response: AuthResponse, rememberMe: boolean = false): void {
    this.setItemWithExpiry(this.TOKEN_KEY, response.token, 3600); // 1 hour
    this.setItemWithExpiry(this.REFRESH_TOKEN_KEY, response.refreshToken, 604800); // 7 days
  }

  /**
   * Set item with expiry
   */
  private setItemWithExpiry(key: string, value: string, ttl: number): void {
    const item = {
      value: value,
      expiry: new Date().getTime() + ttl * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Check if token exists
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Check if token is expired
   */
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return true;
      
      const currentTime = new Date().getTime() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  /**
   * Decode JWT token
   */
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  /**
   * Check token expiration periodically
   */
  private checkTokenExpiration(): void {
    setInterval(() => {
      if (this.isTokenExpired() && this.getRefreshToken()) {
        this.refreshToken().subscribe({
          error: () => this.logout()
        });
      }
    }, 60000); // Check every minute
  }

  /**
   * Get user from storage
   */
  private getUserFromStorage(): any {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Generate mock JWT token
   */
  private generateMockToken(email: string, role: UserRole): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: '1',
      email: email,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour
    }));
    const signature = 'mock-signature-' + Date.now();
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || errorMessage;
    }

    return throwError(() => ({
      message: errorMessage,
      code: error.status,
      status: error.status
    }));
  }
}