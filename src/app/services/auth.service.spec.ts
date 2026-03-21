import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start as logged out', () => {
    expect(service.isLoggedIn).toBeFalse();
  });

  it('should set isLoggedIn to true and navigate to /dashboard on login()', () => {
    service.login();
    expect(service.isLoggedIn).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set isLoggedIn to false and navigate to /landing on logout()', () => {
    service.login();
    service.logout();
    expect(service.isLoggedIn).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/landing']);
  });

  it('should emit values via isLoggedIn$ observable', (done) => {
    const values: boolean[] = [];
    service.isLoggedIn$.subscribe((v) => values.push(v));
    service.login();
    service.logout();
    // Allow microtasks to flush
    setTimeout(() => {
      expect(values).toEqual([false, true, false]);
      done();
    }, 0);
  });
});
