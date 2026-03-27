/**
 * @file admin-dashboard.component.spec.ts
 * @description Tests unitaires du tableau de bord administrateur.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit être créé', () => {
    expect(component).toBeTruthy();
  });

  it('doit avoir des statistiques initialisées', () => {
    expect(component.stats.length).toBe(4);
  });

  it('doit avoir des alertes initiales', () => {
    expect(component.alerts.length).toBeGreaterThan(0);
  });

  it('doit avoir des indicateurs de santé', () => {
    expect(component.healthIndicators.length).toBeGreaterThan(0);
  });

  it('doit retourner la bonne icône pour chaque type d\'alerte', () => {
    expect(component.getAlertIcon('error')).toContain('exclamation-circle');
    expect(component.getAlertIcon('warning')).toContain('triangle');
    expect(component.getAlertIcon('success')).toContain('check-circle');
    expect(component.getAlertIcon('info')).toContain('info-circle');
  });

  it('doit supprimer une alerte par id', () => {
    const initialCount = component.alerts.length;
    const firstId = component.alerts[0].id;
    component.closeAlert(firstId);
    expect(component.alerts.length).toBe(initialCount - 1);
    expect(component.alerts.find(a => a.id === firstId)).toBeUndefined();
  });

  it('ne doit pas supprimer d\'alerte si l\'id n\'existe pas', () => {
    const initialCount = component.alerts.length;
    component.closeAlert('id-inexistant');
    expect(component.alerts.length).toBe(initialCount);
  });
});
