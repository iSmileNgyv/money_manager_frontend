import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey: string = 'language';
  private readonly defaultLang: string = 'az';
  private currentLangSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultLang);

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    const savedLang: string = this.isBrowser() ? localStorage.getItem(this.storageKey) || this.defaultLang : this.defaultLang;
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, lang);
    }
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.currentLangSubject.value;
  }

  onLanguageChange(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  async loadCustomTranslations(lang?: string, module?: string): Promise<void> {
    const filePath = module ? `i18n/${module}/${lang}.json` : `i18n/${lang}.json`;
    try {
      const translations: Object = await firstValueFrom(this.http.get(filePath));
      if(lang == null)
        lang = this.getCurrentLanguage();
      this.translate.setTranslation(lang, translations, true); // Mevcut dillere ekle
      console.log(`Çeviriler yüklendi: ${filePath}`);
    } catch (error) {
      console.error(`Çeviriler yüklenirken hata oluştu: ${filePath}`, error);
    }
  }
}
