import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {_isAuthenticated} from "../../services/auth.service";

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  if(_isAuthenticated) {
    router.navigate(["/"]).then();
    return false;
  }
  return true;
};
