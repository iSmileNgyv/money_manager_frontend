import { Injectable } from '@angular/core';
import { HttpClientService } from "../http-client.service";
import {Observable} from "rxjs";
import { AlertifyService } from "../alertify.service";
import {LoginResponse} from '../../dtos/user/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClientService: HttpClientService
  ) { }

  login(email: string, password: string): Observable<LoginResponse | undefined> {
    return this.httpClientService.post<any>({
      controller: "auth",
      action: "login"
    }, { email, password });
  }

  refreshTokenLogin(refreshToken: string): Observable<LoginResponse | undefined> {
    return this.httpClientService.post<any>({
      controller: "auth",
      action: "refresh-token-login"
    }, { refreshToken });
  }
}
