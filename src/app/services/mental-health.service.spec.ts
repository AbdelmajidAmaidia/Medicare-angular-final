import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MentalHealthService } from './mental-health.service';
import { MH_SessionStatus, MH_StressLevel, MH_BurnoutRisk } from '../models/mental-health.models';

describe('MentalHealthService', () => {
  let service: MentalHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentalHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSessionsByPatient()', () => {
    it('should return pre-seeded session for USR-001', () => {
      const sessions = service.getSessionsByPatient('USR-001');
      expect(sessions.length).toBeGreaterThanOrEqual(1);
      expect(sessions[0].patientId).toBe('USR-001');
    });

    it('should return empty array for unknown patient', () => {
      expect(service.getSessionsByPatient('UNKNOWN')).toEqual([]);
    });
  });

  describe('getConsent()', () => {
    it('should return pre-seeded consent for USR-001', () => {
      const consent = service.getConsent('USR-001');
      expect(consent).toBeTruthy();
      expect(consent?.granted).toBeTrue();
    });

    it('should return undefined for unknown patient', () => {
      expect(service.getConsent('UNKNOWN')).toBeUndefined();
    });
  });

  describe('grantConsent()', () => {
    it('should create a new consent for a new patient', () => {
      const consent = service.grantConsent('NEW-PATIENT');
      expect(consent.patientId).toBe('NEW-PATIENT');
      expect(consent.granted).toBeTrue();
    });

    it('should update the existing consent if already present', () => {
      const first = service.grantConsent('USR-001');
      const second = service.grantConsent('USR-001');
      expect(first.id).toBe(second.id);
    });
  });

  describe('startSession()', () => {
    it('should throw if patient has not granted consent', () => {
      expect(() => service.startSession('NO-CONSENT-PATIENT')).toThrowError(
        'Patient consent is required before starting a session.'
      );
    });

    it('should create an IN_PROGRESS session for a consented patient', () => {
      service.grantConsent('TEST-PATIENT');
      const session = service.startSession('TEST-PATIENT');
      expect(session.status).toBe(MH_SessionStatus.IN_PROGRESS);
      expect(session.patientId).toBe('TEST-PATIENT');
    });

    it('should complete the session after AI pipeline delay', fakeAsync(() => {
      service.grantConsent('ASYNC-PATIENT');
      const session = service.startSession('ASYNC-PATIENT');

      expect(session.status).toBe(MH_SessionStatus.IN_PROGRESS);

      tick(3000); // Advance timer past AI_PIPELINE_DELAY_MS

      expect(session.status).toBe(MH_SessionStatus.COMPLETED);
      expect(session.stressAssessment).toBeTruthy();
      expect(session.burnoutPrediction).toBeTruthy();
      expect(session.report).toBeTruthy();
      expect(session.snapshots.length).toBeGreaterThan(0);
    }));
  });

  describe('getActiveSession()', () => {
    it('should return undefined if no active session exists', () => {
      expect(service.getActiveSession('USR-001')).toBeUndefined();
    });

    it('should return the active session while pipeline is running', fakeAsync(() => {
      service.grantConsent('ACTIVE-TEST');
      service.startSession('ACTIVE-TEST');
      const active = service.getActiveSession('ACTIVE-TEST');
      expect(active).toBeTruthy();
      expect(active?.status).toBe(MH_SessionStatus.IN_PROGRESS);
      tick(3000);
    }));
  });

  describe('getReport()', () => {
    it('should return the pre-seeded report for MHS-001', () => {
      const report = service.getReport('MHS-001');
      expect(report).toBeTruthy();
      expect(report?.notificationSent).toBeTrue();
    });

    it('should return undefined for an unknown session id', () => {
      expect(service.getReport('UNKNOWN-SESSION')).toBeUndefined();
    });

    it('should return a report after the AI pipeline completes', fakeAsync(() => {
      service.grantConsent('REPORT-TEST');
      const session = service.startSession('REPORT-TEST');
      tick(3000);
      const report = service.getReport(session.id);
      expect(report).toBeTruthy();
      expect(report?.recommendations.length).toBeGreaterThan(0);
    }));
  });

  describe('stress classification (via pipeline)', () => {
    it('should assign stress level based on score range', fakeAsync(() => {
      // Run several sessions and verify levels fall within documented ranges
      for (let i = 0; i < 5; i++) {
        service.grantConsent(`STRESS-TEST-${i}`);
        const session = service.startSession(`STRESS-TEST-${i}`);
        tick(3000);
        const score = session.stressAssessment!.score;
        const level = session.stressAssessment!.stressLevel;
        if (score < 30) expect(level).toBe(MH_StressLevel.LOW);
        else if (score < 55) expect(level).toBe(MH_StressLevel.MODERATE);
        else if (score < 80) expect(level).toBe(MH_StressLevel.HIGH);
        else expect(level).toBe(MH_StressLevel.CRITICAL);
      }
    }));
  });

  describe('burnout classification (via pipeline)', () => {
    it('should assign burnout risk based on score range', fakeAsync(() => {
      for (let i = 0; i < 5; i++) {
        service.grantConsent(`BURNOUT-TEST-${i}`);
        const session = service.startSession(`BURNOUT-TEST-${i}`);
        tick(3000);
        const score = session.burnoutPrediction!.score;
        const risk = session.burnoutPrediction!.burnoutRisk;
        if (score < 20) expect(risk).toBe(MH_BurnoutRisk.NONE);
        else if (score < 40) expect(risk).toBe(MH_BurnoutRisk.LOW);
        else if (score < 65) expect(risk).toBe(MH_BurnoutRisk.MODERATE);
        else expect(risk).toBe(MH_BurnoutRisk.HIGH);
      }
    }));
  });

  describe('sessions$ observable', () => {
    it('should emit updated sessions list after startSession()', fakeAsync(() => {
      let emitted: unknown[] = [];
      service.sessions$.subscribe((s) => emitted.push(s));
      service.grantConsent('OBS-PATIENT');
      service.startSession('OBS-PATIENT');
      // One emission on startSession, one when pipeline completes
      expect(emitted.length).toBeGreaterThanOrEqual(1);
      tick(3000);
      expect(emitted.length).toBeGreaterThanOrEqual(2);
    }));
  });
});
