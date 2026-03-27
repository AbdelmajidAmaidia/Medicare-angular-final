/**
 * @file doctor-dashboard.component.spec.ts
 * @description Tests unitaires du tableau de bord médecin.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDashboardComponent } from './doctor-dashboard.component';

describe('DoctorDashboardComponent', () => {
  let component: DoctorDashboardComponent;
  let fixture: ComponentFixture<DoctorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit être créé', () => {
    expect(component).toBeTruthy();
  });

  it('doit avoir 4 statistiques', () => {
    expect(component.stats.length).toBe(4);
  });

  it('doit avoir des rendez-vous pour aujourd\'hui', () => {
    expect(component.todayAppointments.length).toBeGreaterThan(0);
  });

  it('doit retourner la classe correcte pour chaque statut', () => {
    expect(component.getStatusClass('Arrivé')).toBe('status--active');
    expect(component.getStatusClass('En attente')).toBe('status--pending');
    expect(component.getStatusClass('Planifié')).toBe('status--info');
    expect(component.getStatusClass('Urgent')).toBe('status--urgent');
  });

  it('doit avoir une date courante valide', () => {
    expect(component.currentDate).toBeInstanceOf(Date);
  });
});
