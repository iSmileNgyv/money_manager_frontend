import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {LanguageService} from '../../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent{
  constructor(
    private readonly languageService: LanguageService
  ) {

  }

  changeLanguage(event: Event): void {
    const lang: string = (event?.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
  logout(): void {}
}
