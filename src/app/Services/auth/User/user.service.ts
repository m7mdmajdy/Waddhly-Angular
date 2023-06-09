import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Modals/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl=`${environment.apiUrl}/user`;
  private UserUrl2=`${environment.apiUrl}`;
  constructor(private http:HttpClient) { }
  getUserData() {
    return this.http.get(this.UserUrl);
  }
  getUserDataByID(id:string) {
    return this.http.get(`${this.UserUrl}/${id}`);
  }
  editUserDataByID(id:string,user:any) {
    return this.http.put(`${this.UserUrl}/${id}`, user);
  }
  getallcategory() {
    return this.http.get(`${this.UserUrl2}/Category`);
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
  addPorfolio(id:string,userProfile:any){
    return this.http.post(`${this.UserUrl2}/Portfolios?id=${id}`, userProfile);
  }
  getPorfolio(id:string){
    return this.http.get(`${this.UserUrl2}/Portfolios/${id}`);
  }
  deletePorfolio(id:string,pid:string){
    return this.http.delete(`${this.UserUrl2}/Portfolios?uid=${id}&pid=${pid}`);
  }
  addservice(service:any){
    return this.http.post(`${this.UserUrl}/Service`,service);
  }
}
