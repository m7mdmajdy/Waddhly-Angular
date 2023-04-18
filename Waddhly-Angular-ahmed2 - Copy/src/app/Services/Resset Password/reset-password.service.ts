import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetPassword } from 'src/app/Modals/ressetpassword';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseurl:string="https://localhost:7033/api/Auth";
  constructor(private http:HttpClient) { }
  sendresetpasswordlink(email:string)
  {
return this.http.post<any>(`${this.baseurl}/send-reset-email/${email}`,{});
  }
  resetpassword(resetpasswordobj:resetPassword)
  {
    return this.http.post<any>(`${this.baseurl}/reset-password/${resetpasswordobj}`,{}) ;
  }
  
}
