import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';
import { routes } from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch, withInterceptorsFromDi
} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpErrorHandlerInterceptorService} from './services/http-error-handler-interceptor.service';

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    TranslatePipe,
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      TranslateModule.forRoot({
        /*loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }*/
      }),
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem("accessToken");
          },
          allowedDomains: ["localhost:5111"],
          disallowedRoutes: ["localhost:4200/i18n/"]
        }
      })
    ),
    //{ provide: 'BASE_API_URL', useValue: 'http://localhost:5111/api', multi: true },
    {provide: 'BASE_API_URL', useValue: 'https://iso.com.az:8443/api', multi: true},
    { provide: 'VERSION', useValue: 'v1', multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true },
    //{provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
  ]

};
