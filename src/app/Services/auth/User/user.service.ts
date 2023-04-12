import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl='https://localhost:44310/api/user';
  constructor(private http:HttpClient) { }
  getUserData() {
    return this.http.get(this.UserUrl);
  }
  getUserDataByID(id:string) {
    return this.http.get(`${this.UserUrl}/${id}`);
  }
  editUserDataByID(id:string,user:User) {
    return this.http.put(`${this.UserUrl}/${id}`, user);
  }
  // convertBYTEtoIMG(imageBytes:any){
  //   const blob = new Blob([imageBytes], { type: 'image/jpeg' });
  //   const imageUrl = URL.createObjectURL(blob);
  //   return imageUrl;
  // }
  addCertificate(userProfile:any){
    return this.http.post(`${this.UserUrl}/user-profile`, userProfile);
  }
  deleteCertificate(id:string){
    return this.http.delete(`${this.UserUrl}/deletcertificate?id=${id}`);
  }
}
