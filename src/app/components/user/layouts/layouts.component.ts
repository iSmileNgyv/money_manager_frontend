import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AlertifyService} from "../../../services/alertify.service";

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly alertifyService: AlertifyService,
    private readonly router: Router
  ) {}
  logout() {
    this.alertifyService.confirm("Çıxış etmək istədiyinizdən əminsiniz?","", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.authService.identityCheck();
      this.router.navigate(["/auth/login"]).then();
    });
  }
}
