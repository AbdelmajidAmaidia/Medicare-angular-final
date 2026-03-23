/**
 * @file layout.component.spec.ts
 * @description Tests unitaires du composant de mise en page principal.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

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

  it('doit basculer la sidebar collapsed', () => {
    expect(component.sidebarCollapsed).toBeFalse();
    component.toggleSidebar();
    expect(component.sidebarCollapsed).toBeTrue();
    component.toggleSidebar();
    expect(component.sidebarCollapsed).toBeFalse();
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

  it('doit retourner les sections de navigation admin', () => {
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
