import { Component } from '@angular/core';
import {UserService} from '../../../services/entities/user.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WebAuthnService} from '../../../services/webauthn.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  login(email: string, password: string): void {
    this.userService.login(email, password).subscribe(response => {
      if (response) {
        this.authService.identityCheck();
        localStorage.setItem("accessToken", response.token.accessToken);
        localStorage.setItem("refreshToken", response.token.refreshToken);
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl) {
            this.router.navigate([returnUrl]).then();
          } else {
            this.router.navigate(["/"]).then();
          }
        });
      }
    });
  }
}
