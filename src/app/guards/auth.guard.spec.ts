import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const runGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], { isLoggedIn: false });
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree', 'navigate']);
    routerSpy.createUrlTree.and.returnValue('/login' as unknown as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should return true when user is logged in', () => {
    (Object.getOwnPropertyDescriptor(authServiceSpy, 'isLoggedIn')!.get as jasmine.Spy).and.returnValue(true);
    expect(runGuard()).toBeTrue();
  });

  it('should redirect to /login when user is not logged in', () => {
    const result = runGuard();
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBeTruthy();
  });
});
