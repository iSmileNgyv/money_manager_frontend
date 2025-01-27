import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LanguageService} from '../../../services/language.service';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertifyService} from '../../../services/alertify.service';
import {AuthService} from '../../../services/auth.service';

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
    private readonly languageService: LanguageService,
    private readonly alertifyService: AlertifyService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }

  changeLanguage(event: Event): void {
    const lang: string = (event?.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }

  get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
  logout() {
    this.alertifyService.confirm("Çıxış","Çıxış etmək istədiyinizdən əminsiniz?", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.authService.identityCheck();
      this.router.navigate(["/auth/login"]).then();
    });
  }
}
