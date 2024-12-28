import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import { catchError, throwError, Observable } from "rxjs";
import { AlertifyService, MessageType, Position } from './alertify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private readonly alertifyService: AlertifyService,
    private readonly spinner: NgxSpinnerService,
    private readonly errorService: ErrorService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("accessToken");

    // `accessToken` varsa bunu her isteğe ekle
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
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
