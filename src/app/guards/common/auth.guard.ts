import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {UserService} from '../../services/entities/user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const userService: UserService = inject(UserService);

  if (authService.identityCheck()) {
    return of(true);
  }
  const refreshToken: string|null = localStorage.getItem("refreshToken");
  if (refreshToken) {
    return userService.refreshTokenLogin(refreshToken).pipe(
      map(response => {
        if (response) {
          localStorage.setItem("accessToken", response.token.accessToken);
          localStorage.setItem("refreshToken", response.token.refreshToken);
          authService.identityCheck();
          return true;
        } else {
          router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } }).then();
          return false;
        }
      }),
      catchError(() => {
        router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } }).then();
        return of(false);
      })
    );
  }

  router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } }).then();
  return of(false);
};
