import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProposal, LoginedUser, service } from 'src/app/Modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   URL:string='https://localhost:7033/api/User/';
   urluser:string='https://localhost:7033/api/Service/';
   propoURL:string='https://localhost:7033/api/GetProposalbyUserID/';
  constructor(private http:HttpClient) {

   }
   get(id:string):Observable<LoginedUser>
   {
    return this.http.get<LoginedUser>(this.URL+id);
   }
   getservice(id:number):Observable<service>
   {
    return this.http.get<service>(this.urluser+id)
   }

   getproposal(id:string):Observable<GetProposal[]>
   {
    return this.http.get<GetProposal[]>(this.propoURL+id);
   }
  service_id:number=0;
  user_id:string='' ;
  userloginedID:string='';
}
