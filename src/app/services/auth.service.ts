import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly jwtHelperService: JwtHelperService) { }

  identityCheck(): boolean {
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
