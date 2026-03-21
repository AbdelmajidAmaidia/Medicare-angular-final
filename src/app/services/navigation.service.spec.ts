import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavigationService, UserRole } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [NavigationService, { provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default role to "patient"', () => {
    expect(service.currentRole).toBe('patient');
  });

  it('should default user name to "Sarah Martinez"', () => {
    expect(service.currentUserName).toBe('Sarah Martinez');
  });

  it('should navigate to the correct home page when role changes', () => {
    const roleRoutes: Record<UserRole, string> = {
      patient: '/dashboard/patient/home',
      doctor: '/dashboard/doctor/home',
      lab: '/dashboard/lab/home',
      pharmacy: '/dashboard/pharmacy/home',
      admin: '/dashboard/admin/home',
    };

    (Object.keys(roleRoutes) as UserRole[]).forEach((role) => {
      service.setRole(role);
      expect(service.currentRole).toBe(role);
      expect(routerSpy.navigate).toHaveBeenCalledWith([roleRoutes[role]]);
    });
  });

  it('should emit role updates via userRole$ observable', (done) => {
    const roles: UserRole[] = [];
    service.userRole$.subscribe((r) => roles.push(r));
    service.setRole('doctor');
    service.setRole('admin');
    setTimeout(() => {
      expect(roles).toEqual(['patient', 'doctor', 'admin']);
      done();
    }, 0);
  });

  it('navigateTo() should call router.navigate with the given path', () => {
    service.navigateTo('/dashboard/patient/home');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/patient/home']);
  });
});
