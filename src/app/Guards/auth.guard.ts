import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,private toast:NgToastService){}
  canActivate():boolean {
    if(this.authService.UserState){
      return true;
    }
    else{
      this.toast.warning({detail:"Notification",summary:"Please login first",duration:5000});
      //alert("Please login first");
      this.router.navigate(['/userModule/login']);
      return false;
    }
  }

}
