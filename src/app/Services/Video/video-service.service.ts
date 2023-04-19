import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {

  constructor(private http: HttpClient) { }

  updatePeer(userID: string, newPeerID: string) {
    {
      console.log("runnnnn");
      //this.IsUserLogged.next(true);
      
      return this.http.put<any>(`https://localhost:7033/api/Session/${userID}`, newPeerID);
    }
  }
}
