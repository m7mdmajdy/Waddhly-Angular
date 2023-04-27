import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private IsUserLogged:BehaviorSubject<boolean>;
  private baseUrl: string = `${environment.apiUrl}/Auth/`;
  public userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    // this.IsUserLogged = new BehaviorSubject<boolean>((this.UserState))
    this.userPayload = this.decodedToken();
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  get UserState(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  SignUp(SignUpRequest: any) {
    return this.http.post<any>(`${this.baseUrl}register`, SignUpRequest);
  }

  Login(LoginRequest: any) {
    //this.IsUserLogged.next(true);
    return this.http.post<any>(`${this.baseUrl}login`, LoginRequest);
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    //this.IsUserLogged.next(false);
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  getIDfromToken() {
    if (this.userPayload) {
      return this.userPayload.uid;
    }
  }
  getEmailfromToken() {
    if (this.userPayload) {
      return this.userPayload.email;
    }
  }
  getUsernamefromToken() {
    if (this.userPayload) {
      return this.userPayload.sub;
    }
  }

  getFullNamefromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }
  getIDFromToken() {
    if (this.userPayload) {
      return this.userPayload.uid;
    }
  }
}
