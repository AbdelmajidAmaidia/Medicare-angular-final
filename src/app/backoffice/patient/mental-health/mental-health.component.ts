/**
 * @file mental-health.component.ts
 * @description Ressources et suivi de santé mentale pour le patient.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MoodEntry {
  date: string;
  score: number;
  note: string;
}

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-heart-pulse text-danger"></i> Santé Mentale</h1>
        <p class="page-subtitle">Suivez votre bien-être au quotidien.</p>
      </div>

      <!-- Humeur du jour -->
      <section class="panel mb-4 p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
        <h2 style="font-size:1rem;font-weight:600;margin:0 0 1rem">Comment vous sentez-vous aujourd'hui ?</h2>
        <div class="d-flex gap-3 flex-wrap">
          <button *ngFor="let m of moods" class="mood-btn" [class.selected]="selectedMood===m.score" (click)="selectedMood=m.score">
            <span style="font-size:1.5rem">{{ m.emoji }}</span>
            <span style="font-size:.75rem;color:#64748b">{{ m.label }}</span>
          </button>
        </div>
        <button class="btn btn-primary mt-3" *ngIf="selectedMood !== null" (click)="saveMood()">
          <i class="bi bi-check-circle"></i> Enregistrer
        </button>
      </section>

      <!-- Historique humeur -->
      <section class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
        <h2 style="font-size:1rem;font-weight:600;margin:0 0 1rem">Historique d'humeur</h2>
        <div class="d-flex flex-column gap-2">
          <div *ngFor="let e of moodHistory" class="d-flex align-items-center gap-3 py-2 border-bottom">
            <span style="font-size:1.25rem">{{ getMoodEmoji(e.score) }}</span>
            <div style="flex:1">
              <span class="fw-semibold small">{{ e.date }}</span>
              <span class="text-muted small d-block">{{ e.note }}</span>
            </div>
            <div style="display:flex;align-items:center;gap:.25rem">
              <div *ngFor="let i of [1,2,3,4,5]"
                style="width:8px;height:8px;border-radius:50%;margin:0 1px"
                [style.background]="i <= e.score ? '#3b82f6' : '#e2e8f0'">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .mood-btn {
      display:flex;flex-direction:column;align-items:center;gap:.25rem;
      padding:.75rem 1rem;border:2px solid #e2e8f0;border-radius:12px;
      background:#fff;cursor:pointer;transition:border-color .2s,background .2s;min-width:80px;
    }
    .mood-btn.selected { border-color:#3b82f6;background:#eff6ff; }
    .mood-btn:hover { border-color:#3b82f6; }
  `],
})
export class MentalHealthComponent {
  selectedMood: number | null = null;

  moods = [
    { score: 1, emoji: '😢', label: 'Très mal' },
    { score: 2, emoji: '😔', label: 'Mal' },
    { score: 3, emoji: '😐', label: 'Neutre' },
    { score: 4, emoji: '😊', label: 'Bien' },
    { score: 5, emoji: '😁', label: 'Très bien' },
  ];

  moodHistory: MoodEntry[] = [
    { date: '21 Mar 2026', score: 4, note: 'Bonne journée, peu de douleurs' },
    { date: '20 Mar 2026', score: 3, note: 'Légère fatigue' },
    { date: '19 Mar 2026', score: 2, note: 'Difficile, maux de tête importants' },
    { date: '18 Mar 2026', score: 5, note: 'Excellente journée, promenade agréable' },
  ];

  getMoodEmoji(score: number): string {
    return this.moods.find(m => m.score === score)?.emoji ?? '😐';
  }

  saveMood(): void {
    if (this.selectedMood !== null) {
      this.moodHistory.unshift({
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        score: this.selectedMood,
        note: 'Humeur enregistrée',
      });
      this.selectedMood = null;
    }
  }
}
