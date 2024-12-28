import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ErrorService} from './services/error.service';
import {ErrorListComponent} from './components/error-list/error-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'money_manager_frontend';
  errors: { message: string, isResolved: boolean }[] = [];
  constructor(
    private router: Router,
    private errorService: ErrorService
  ) {
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        sessionStorage.removeItem('errorListPosition');
        /*if (this.router.url.includes('auth/')) {
          this.renderer.setAttribute(document.body, 'class', 'hold-transition login-page');
        } else {
          this.renderer.setAttribute(document.body, 'class', 'hold-transition sidebar-mini sidebar-collapse');
        }*/
      }
    });
    this.errorService.errors$.subscribe(errors => {
      this.errors = errors.map(error => ({ message: error, isResolved: false }));
    });
  }
}
