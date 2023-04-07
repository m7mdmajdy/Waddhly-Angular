import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private IsUserLogged:BehaviorSubject<boolean>;
  private baseUrl: string="https://localhost:7033/api/Auth/register";
  constructor(private http:HttpClient) {
    this.IsUserLogged = new BehaviorSubject<boolean>((this.UserState))
  }

  storeToken(token:string){
     localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  get UserState():boolean
  {
   return (localStorage.getItem('Login'))?true:false;
  }

  SignUp(SignUpRequest: any)
  {
    return this.http.post<any>(`${this.baseUrl}`,SignUpRequest);
    // .subscribe(res=>
    //   {alert("SignUp successful")
    //   this.SignUpRequest.reset();
    //   this.router.navigate(['/Home']);
    // },err=>{alert("")})
  }



  Login(LoginRequest: any)
  {
    localStorage.setItem('Login',LoginRequest.value);
    this.IsUserLogged.next(true);
    return this.http.post<any>(`${this.baseUrl}`,LoginRequest);
  }
  logout()
  {
   localStorage.clear();
   localStorage.removeItem('Login');
   this.IsUserLogged.next(false);
  }

  get(){
    return this.http.get<any>("https://localhost:7033/api/Category");
  }
}
