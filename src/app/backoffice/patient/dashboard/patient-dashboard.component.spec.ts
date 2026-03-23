/**
 * @file patient-dashboard.component.spec.ts
 * @description Tests unitaires du tableau de bord patient.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientDashboardComponent } from './patient-dashboard.component';

describe('PatientDashboardComponent', () => {
  let component: PatientDashboardComponent;
  let fixture: ComponentFixture<PatientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit être créé', () => {
    expect(component).toBeTruthy();
  });

  it('doit avoir 4 métriques de santé', () => {
    expect(component.metrics.length).toBe(4);
  });

  it('doit avoir des rendez-vous à venir', () => {
    expect(component.upcomingAppointments.length).toBeGreaterThan(0);
  });

  it('doit retourner la bonne classe CSS pour chaque statut de métrique', () => {
    expect(component.getMetricClass('good')).toBe('metric--good');
    expect(component.getMetricClass('warning')).toBe('metric--warning');
    expect(component.getMetricClass('critical')).toBe('metric--critical');
  });
});
