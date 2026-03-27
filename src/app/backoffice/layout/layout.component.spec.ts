/**
 * @file layout.component.spec.ts
 * @description Tests unitaires du composant de mise en page principal et du service de navigation.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { LayoutNavigationService } from './navigation.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

// ─── LayoutNavigationService ──────────────────────────────────────────────────

describe('LayoutNavigationService', () => {
  let service: LayoutNavigationService;

  beforeEach(() => {
    service = new LayoutNavigationService();
  });

  it('doit être créé', () => {
    expect(service).toBeTruthy();
  });

  describe('getNavItems()', () => {
    it('doit retourner 4 éléments pour le rôle doctor', () => {
      const items = service.getNavItems('doctor');
      expect(items.length).toBe(4);
    });

    it('doit inclure Dashboard, Patients, Planning, Consultations pour doctor', () => {
      const items = service.getNavItems('doctor');
      const labels = items.map(i => i.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Patients');
      expect(labels).toContain('Planning');
      expect(labels).toContain('Consultations');
    });

    it('doit retourner 4 éléments pour le rôle patient', () => {
      const items = service.getNavItems('patient');
      expect(items.length).toBe(4);
    });

    it('doit inclure Dashboard, Appointments, Medical Records, Prescriptions pour patient', () => {
      const items = service.getNavItems('patient');
      const labels = items.map(i => i.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Appointments');
      expect(labels).toContain('Medical Records');
      expect(labels).toContain('Prescriptions');
    });

    it('doit retourner 3 éléments pour le rôle lab', () => {
      const items = service.getNavItems('lab');
      expect(items.length).toBe(3);
    });

    it('doit inclure Dashboard, Results, Payroll pour lab', () => {
      const items = service.getNavItems('lab');
      const labels = items.map(i => i.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Results');
      expect(labels).toContain('Payroll');
    });

    it('doit retourner 3 éléments pour le rôle pharmacy', () => {
      const items = service.getNavItems('pharmacy');
      expect(items.length).toBe(3);
    });

    it('doit inclure Dashboard, Deliveries, Wallet pour pharmacy', () => {
      const items = service.getNavItems('pharmacy');
      const labels = items.map(i => i.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Deliveries');
      expect(labels).toContain('Wallet');
    });

    it('doit retourner 3 éléments pour le rôle admin', () => {
      const items = service.getNavItems('admin');
      expect(items.length).toBe(3);
    });

    it('doit inclure Dashboard, Users, Verifications pour admin', () => {
      const items = service.getNavItems('admin');
      const labels = items.map(i => i.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Users');
      expect(labels).toContain('Verifications');
    });

    it('doit retourner les éléments patient pour un rôle inconnu', () => {
      const items = service.getNavItems('unknown');
      expect(items).toEqual(service.getNavItems('patient'));
    });
  });

  describe('getNavSections()', () => {
    it('doit retourner des sections pour le rôle doctor', () => {
      const sections = service.getNavSections('doctor');
      expect(sections.length).toBeGreaterThan(0);
      const allItems = sections.flatMap(s => s.items);
      expect(allItems.some(i => i.route.includes('/doctor/'))).toBeTrue();
    });

    it('doit retourner des sections pour le rôle admin', () => {
      const sections = service.getNavSections('admin');
      expect(sections.length).toBeGreaterThan(0);
      const allItems = sections.flatMap(s => s.items);
      expect(allItems.some(i => i.route.includes('/admin/'))).toBeTrue();
    });

    it('doit retourner des sections patient pour un rôle inconnu', () => {
      const sections = service.getNavSections('unknown');
      expect(sections).toEqual(service.getNavSections('patient'));
    });
  });

  describe('getHomeRoute()', () => {
    it('doit retourner la route home patient', () => {
      expect(service.getHomeRoute('patient')).toBe('/dashboard/patient/home');
    });

    it('doit retourner la route home doctor', () => {
      expect(service.getHomeRoute('doctor')).toBe('/dashboard/doctor/home');
    });

    it('doit retourner la route home lab', () => {
      expect(service.getHomeRoute('lab')).toBe('/dashboard/lab/home');
    });

    it('doit retourner la route home pharmacy', () => {
      expect(service.getHomeRoute('pharmacy')).toBe('/dashboard/pharmacy/home');
    });

    it('doit retourner la route home admin', () => {
      expect(service.getHomeRoute('admin')).toBe('/dashboard/admin/home');
    });

    it('doit retourner la route patient pour un rôle inconnu', () => {
      expect(service.getHomeRoute('unknown')).toBe('/dashboard/patient/home');
    });
  });
});

// ─── LayoutComponent ─────────────────────────────────────────────────────────

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const authServiceMock = {
    getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({
      id: '1',
      email: 'admin@test.com',
      firstName: 'Admin',
      lastName: 'Test',
      role: 'admin',
    }),
    logout: jasmine.createSpy('logout'),
  };

  const navServiceMock = {
    clearUserData: jasmine.createSpy('clearUserData'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: NavigationService, useValue: navServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit être créé', () => {
    expect(component).toBeTruthy();
  });

  it('doit charger l\'utilisateur courant lors de l\'initialisation', () => {
    expect(component.currentUser).toBeTruthy();
    expect(component.currentUser?.role).toBe('admin');
  });

  it('doit basculer le menu mobile', () => {
    expect(component.mobileMenuOpen).toBeFalse();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBeTrue();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('doit fermer le menu mobile', () => {
    component.mobileMenuOpen = true;
    component.closeMobileMenu();
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('doit basculer le panneau de notifications', () => {
    expect(component.notificationOpen).toBeFalse();
    component.toggleNotifications();
    expect(component.notificationOpen).toBeTrue();
  });

  it('doit fermer les notifications quand on ouvre le user dropdown', () => {
    component.notificationOpen = true;
    component.toggleUserDropdown();
    expect(component.notificationOpen).toBeFalse();
    expect(component.userDropdownOpen).toBeTrue();
  });

  it('doit compter correctement les notifications non lues', () => {
    component.notifications = [
      { id: '1', title: 'Test', time: '', type: 'info', icon: '', read: false },
      { id: '2', title: 'Test2', time: '', type: 'success', icon: '', read: true },
      { id: '3', title: 'Test3', time: '', type: 'warning', icon: '', read: false },
    ];
    expect(component.unreadCount).toBe(2);
  });

  it('doit marquer toutes les notifications comme lues', () => {
    component.notifications = [
      { id: '1', title: 'A', time: '', type: 'info', icon: '', read: false },
      { id: '2', title: 'B', time: '', type: 'success', icon: '', read: false },
    ];
    component.markAllRead();
    expect(component.unreadCount).toBe(0);
  });

  it('doit supprimer une notification par id', () => {
    component.notifications = [
      { id: '1', title: 'A', time: '', type: 'info', icon: '', read: false },
      { id: '2', title: 'B', time: '', type: 'success', icon: '', read: false },
    ];
    component.dismissNotification('1');
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].id).toBe('2');
  });

  it('doit retourner les éléments de navigation admin via getNavItems()', () => {
    const items = component.getNavItems();
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(i => i.route.includes('/admin/'))).toBeTrue();
  });

  it('doit retourner les sections de navigation admin via getNavSections()', () => {
    const sections = component.getNavSections();
    expect(sections.length).toBeGreaterThan(0);
    const allItems = sections.flatMap(s => s.items);
    expect(allItems.some(i => i.route.includes('/admin/'))).toBeTrue();
  });

  it('doit retourner le libellé de rôle correct', () => {
    expect(component.getRoleLabel()).toBe('Administrateur');
  });

  it('doit appeler logout et clearUserData lors de la déconnexion', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(navServiceMock.clearUserData).toHaveBeenCalled();
  });
});

