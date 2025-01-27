import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ErrorService} from './services/error.service';
import {ErrorListComponent} from './components/error-list/error-list.component';
import {LanguageService} from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  protected title: string = 'money_manager_frontend';
  errors: { message: string, isResolved: boolean }[] = [];
  constructor(
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly errorService: ErrorService,
    private readonly languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.languageService.onLanguageChange().subscribe((lang: string) => {
      console.log(`Dil değişti: ${lang}`);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        sessionStorage.removeItem('errorListPosition');
        if (this.router.url.includes('auth/')) {
          this.renderer.setAttribute(document.body, 'class', 'hold-transition login-page');
        } else {
          this.renderer.setAttribute(document.body, 'class', 'hold-transition sidebar-mini sidebar-collapse');
        }
      }
    });
    this.errorService.errors$.subscribe(errors => {
      this.errors = errors.map(error => ({ message: error, isResolved: false }));
    });
  }
}
