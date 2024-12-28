import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import { catchError, switchMap, throwError, Observable, of } from "rxjs";
import { AlertifyService, MessageType, Position } from './alertify.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorService } from "./error.service";
import { UserService } from './models/user.service';
import { LoginResponse } from '../contracts/user/login-response';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private readonly alertifyService: AlertifyService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService,
    private readonly errorService: ErrorService,
    private readonly userService: UserService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("accessToken");

    // `accessToken` varsa bunu her isteğe ekle
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          const refreshToken: string|null = localStorage.getItem("refreshToken");
          if (refreshToken) {
            return this.userService.refreshTokenLogin(refreshToken).pipe(
              switchMap((response: LoginResponse | undefined) => {
                console.log("setir 46");
                console.log(response);
                if (response?.isSuccess) {
                  console.log(response);
                  localStorage.setItem("accessToken", response.token.accessToken);
                  localStorage.setItem("refreshToken", response.token.refreshToken);

                  const newAuthReq: HttpRequest<any> = req.clone({
                    setHeaders: { Authorization: `Bearer ${response.token.accessToken}` }
                  });
                  return next.handle(newAuthReq);
                } else {
                  this.router.navigate(['/auth/login']).then();
                  return throwError(() => new Error("Unauthorized"));
                }
              }),
              catchError(() => {
                this.router.navigate(['/auth/login']).then();
                return throwError(() => new Error("Unauthorized"));
              })
            );

          } else {
            this.router.navigate(['/auth/login']).then();
            return throwError(() => new Error("Unauthorized"));
          }
        }

        this.handleErrorMessages(error);
        return throwError(() => error);
      })
    );
  }

  private handleErrorMessages(error: HttpErrorResponse) {
    let errorMessage = "Bilinməyən bir xəta baş verdi";
    if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error && error.error.ErrorMessage) {
      errorMessage = error.error.ErrorMessage;
    }

    switch(error.status) {
      case HttpStatusCode.InternalServerError:
        this.alertifyService.message("Bilinməyən xəta. Yenidən cəhd edin", {
          messageType: MessageType.Error
        });
        break;
      case HttpStatusCode.NotFound:
        this.alertifyService.message("Səhifə tapılmadı", {
          messageType: MessageType.Error
        });
        break;
      case HttpStatusCode.UnprocessableEntity:
        this.alertifyService.message(errorMessage, {
          messageType: MessageType.Error,
          position: Position.TopRight,
          dismissOthers: true
        });
        break;
      case HttpStatusCode.BadRequest:
        if (error.error && typeof error.error === 'object') {
          let i = 1;
          Object.keys(error.error).forEach(key => {
            const messages = error.error[key].value;
            if (Array.isArray(messages)) {
              messages.forEach(message => {
                this.errorService.addError(`${i++}) ${message}`);
              });
            }
          });
        }
        break;
    }
    this.spinner.hide().then();
  }
}
