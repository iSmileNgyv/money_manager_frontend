import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";

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
    private readonly router: Router
  ) {}
  logout() {

  }
}
