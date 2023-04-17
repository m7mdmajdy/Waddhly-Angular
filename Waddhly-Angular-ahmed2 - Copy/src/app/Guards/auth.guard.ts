import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate():boolean {
    if(this.authService.UserState){
      return true;
    }
    else{
      alert("Please login first");
      this.router.navigate(['/userModule/login']);
      return false;
    }
  }

}
