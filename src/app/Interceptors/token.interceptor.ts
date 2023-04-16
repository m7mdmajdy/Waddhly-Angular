import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private auth:AuthService,private toast:NgToastService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get token in header
    debugger;
    const myToken=this.auth.getToken();
    if(myToken){
      //request.headers.set('Authorization',`Bearer ${myToken}`);
      request= request.clone({
        setHeaders:{Authorization: `Bearer ${myToken}`}
      });
    }
    return next.handle(request).pipe(
      // handle errors if token is expired
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status==401){
            this.toast.warning({detail:"Warning",summary:"Token is expired, Please login again"});
            this.router.navigate(['/login'])
          }
          console.log(err);
        return throwError(()=>new Error(err.error))

        }
        return throwError(()=>new Error(err.error))
      })
    );
  }
}
