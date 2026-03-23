/**
 * @file user-management.component.spec.ts
 * @description Tests unitaires de la gestion des utilisateurs.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent, PlatformUser } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit être créé', () => {
    expect(component).toBeTruthy();
  });

  it('doit initialiser la liste des utilisateurs', () => {
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('filteredUsers retourne tous les utilisateurs quand la recherche est vide', () => {
    component.searchTerm = '';
    component.selectedRole = '';
    expect(component.filteredUsers.length).toBe(component.users.length);
  });

  it('doit filtrer par nom', () => {
    component.searchTerm = 'Sarah';
    component.selectedRole = '';
    expect(component.filteredUsers.every(u => u.firstName.toLowerCase().includes('sarah'))).toBeTrue();
  });

  it('doit filtrer par email', () => {
    component.searchTerm = 'mchen';
    component.selectedRole = '';
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].email).toContain('mchen');
  });

  it('doit filtrer par rôle', () => {
    component.searchTerm = '';
    component.selectedRole = 'Médecin';
    const result = component.filteredUsers;
    expect(result.every(u => u.role === 'Médecin')).toBeTrue();
  });

  it('doit retourner la classe de statut correcte', () => {
    expect(component.getStatusClass('Actif')).toBe('status--active');
    expect(component.getStatusClass('Suspendu')).toBe('status--suspended');
    expect(component.getStatusClass('En attente')).toBe('status--pending');
  });

  it('doit basculer le statut Actif → Suspendu', () => {
    const user = component.users.find(u => u.status === 'Actif');
    if (!user) fail('Aucun utilisateur Actif trouvé');
    component.toggleStatus(user!);
    expect(user!.status).toBe('Suspendu');
  });

  it('doit basculer le statut Suspendu → Actif', () => {
    const user = component.users.find(u => u.status === 'Suspendu');
    if (!user) fail('Aucun utilisateur Suspendu trouvé');
    component.toggleStatus(user!);
    expect(user!.status).toBe('Actif');
  });

  it('doit supprimer un utilisateur après confirmation (confirm = true)', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const initialCount = component.users.length;
    const firstUser = component.users[0];
    component.deleteUser(firstUser);
    expect(component.users.length).toBe(initialCount - 1);
  });

  it('ne doit pas supprimer un utilisateur si annulation (confirm = false)', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const initialCount = component.users.length;
    component.deleteUser(component.users[0]);
    expect(component.users.length).toBe(initialCount);
  });
});
