import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CanActivate, Router  } from '@angular/router';
import { ApiServicio } from '../../servicios/api.servicio';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router:Router, private apiServicio: ApiServicio) {}

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<any> {
    if (this.apiServicio.token) {
      return true;
    } else {
      this.redirect ('login');
      return false;
    }
  }
}
