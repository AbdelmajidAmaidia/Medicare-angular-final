import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="lang-switcher">
      <button
        *ngFor="let lang of languageService.languages"
        class="lang-btn"
        [class.lang-btn--active]="languageService.currentLang === lang.code"
        (click)="switchTo(lang.code)"
        [attr.aria-label]="lang.label"
        [attr.title]="lang.label"
      >
        <span class="lang-flag">{{ lang.flag }}</span>
        <span class="lang-code">{{ lang.code.toUpperCase() }}</span>
      </button>
    </div>
  `,
  styles: [`
    .lang-switcher {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lang-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      color: inherit;
      transition: all 0.15s ease;
      line-height: 1;
    }

    .lang-btn:hover {
      border-color: currentColor;
      opacity: 0.85;
    }

    .lang-btn--active {
      background: rgba(var(--bs-primary-rgb, 13, 110, 253), 0.12);
      border-color: rgba(var(--bs-primary-rgb, 13, 110, 253), 0.35);
      color: var(--bs-primary, #0d6efd);
      font-weight: 600;
    }

    .lang-flag {
      font-size: 1rem;
      line-height: 1;
    }

    .lang-code {
      font-size: 0.75rem;
    }
  `],
})
export class LanguageSwitcherComponent {
  constructor(public languageService: LanguageService) {}

  switchTo(lang: SupportedLanguage): void {
    this.languageService.setLanguage(lang);
  }
}
