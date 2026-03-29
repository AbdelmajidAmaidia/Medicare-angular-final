import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SupportedLanguage = 'en' | 'fr';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'preferred_language';
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'en';

  readonly languages: LanguageOption[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  private currentLangSubject = new BehaviorSubject<SupportedLanguage>(
    this.resolveInitialLanguage()
  );
  currentLang$: Observable<SupportedLanguage> = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  /**
   * Get current active language code
   */
  get currentLang(): SupportedLanguage {
    return this.currentLangSubject.getValue();
  }

  /**
   * Switch to a new language and persist the preference
   */
  setLanguage(lang: SupportedLanguage): void {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  /**
   * Initialise the translate service and set starting language
   */
  private initLanguage(): void {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.translate.use(this.currentLang);
  }

  /**
   * Determine which language to use on startup:
   * 1. Persisted preference from localStorage
   * 2. Browser language if supported
   * 3. Fall back to English
   */
  private resolveInitialLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage | null;
    if (stored && this.isSupportedLanguage(stored)) {
      return stored;
    }

    const browserLang = navigator.language?.split('-')[0] as SupportedLanguage;
    if (this.isSupportedLanguage(browserLang)) {
      return browserLang;
    }

    return this.DEFAULT_LANGUAGE;
  }

  private isSupportedLanguage(lang: string): lang is SupportedLanguage {
    return lang === 'en' || lang === 'fr';
  }
}
