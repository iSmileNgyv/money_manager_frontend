import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withFetch()//,
      //withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes)
    ),
    {provide: 'BASE_API_URL', useValue: 'http://localhost:5111/api', multi: true},
    {provide: 'VERSION', useValue: 'v1', multi: true}
  ]

};
