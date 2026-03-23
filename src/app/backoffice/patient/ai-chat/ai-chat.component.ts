/**
 * @file ai-chat.component.ts
 * @description Assistant médical IA : interface de chat pour questions de santé.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container" style="max-width:800px">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-robot text-primary"></i> Assistant Médical IA</h1>
        <p class="page-subtitle">Posez vos questions de santé générales. Cet assistant ne remplace pas un médecin.</p>
      </div>
      <div class="panel" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;display:flex;flex-direction:column;height:500px">
        <div class="chat-messages p-3" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:.75rem">
          <div *ngFor="let msg of messages" [class.user-msg]="msg.role==='user'" [class.ai-msg]="msg.role==='assistant'" class="chat-bubble">
            <div class="bubble-icon" *ngIf="msg.role==='assistant'">
              <i class="bi bi-robot"></i>
            </div>
            <div class="bubble-content">
              <p style="margin:0;font-size:.875rem">{{ msg.content }}</p>
              <span style="font-size:.7rem;color:#94a3b8;margin-top:.25rem;display:block">
                {{ msg.timestamp | date:'HH:mm' }}
              </span>
            </div>
          </div>
          <div *ngIf="loading" class="ai-msg chat-bubble">
            <div class="bubble-icon"><i class="bi bi-robot"></i></div>
            <div class="bubble-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
        <div class="chat-input p-3 border-top d-flex gap-2">
          <input
            class="form-control"
            [(ngModel)]="userInput"
            placeholder="Posez votre question médicale…"
            (keydown.enter)="sendMessage()"
            [disabled]="loading"
            aria-label="Message à l'assistant"
          />
          <button class="btn btn-primary" (click)="sendMessage()" [disabled]="loading || !userInput.trim()">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>
      <p class="text-muted small mt-2 text-center">
        <i class="bi bi-shield-check text-success"></i>
        Cet assistant fournit des informations générales uniquement. Consultez toujours un professionnel de santé.
      </p>
    </div>
  `,
  styles: [`
    .chat-bubble { display: flex; gap: .75rem; align-items: flex-start; }
    .user-msg { flex-direction: row-reverse; }
    .bubble-icon { width:32px;height:32px;border-radius:50%;background:#dbeafe;color:#3b82f6;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.875rem; }
    .bubble-content { background:#f1f5f9;border-radius:12px;padding:.75rem;max-width:80%; }
    .user-msg .bubble-content { background:#3b82f6;color:#fff; }
    .typing { display:flex;align-items:center;gap:.25rem;padding:.875rem; }
    .typing span { width:8px;height:8px;border-radius:50%;background:#94a3b8;animation:bounce 1.2s ease infinite; }
    .typing span:nth-child(2) { animation-delay:.2s; }
    .typing span:nth-child(3) { animation-delay:.4s; }
    @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-8px)} }
  `],
})
export class AiChatComponent {
  userInput = '';
  loading = false;
  messages: ChatMessage[] = [
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant médical IA. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me poser des questions générales sur la santé, les médicaments ou les symptômes.',
      timestamp: new Date(),
    },
  ];

  sendMessage(): void {
    if (!this.userInput.trim() || this.loading) return;
    const userMessage = this.userInput.trim();
    this.messages.push({ role: 'user', content: userMessage, timestamp: new Date() });
    this.userInput = '';
    this.loading = true;

    // Simulation d'une réponse IA (à remplacer par un vrai service)
    setTimeout(() => {
      this.loading = false;
      this.messages.push({
        role: 'assistant',
        content: 'Je comprends votre préoccupation. Je vous recommande de consulter votre médecin pour une évaluation complète. En attendant, restez bien hydraté et surveillez vos symptômes. Y a-t-il autre chose que je puisse vous aider à comprendre ?',
        timestamp: new Date(),
      });
    }, 1500);
  }
}
