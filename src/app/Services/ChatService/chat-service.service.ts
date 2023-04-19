import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { User } from 'src/app/Modals/user';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient, private auth:AuthService) { }


  hubConnection: any;
  userData: any;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7033/Chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection established");        
      })
  }
  askServer() {
    this.hubConnection.invoke('askServer', "hey")
  }
  askServerListener() {
    this.hubConnection.on('askServerResponse', (someText: any) => {

    })
  }

  //get users info
  private _url="https://localhost:7033/api/Message/";
  getAllUsers(id:any):Observable<User[]>
  {
    return this.http.get<User[]>(this._url+id);
  }
  getUser(id:string):Observable<User>
  {
    return this.http.get<User>(`https://localhost:7033/api/Users/${id}`);
  }
  getUsersMessages(user1:string, user2:string){
    return this.http.get<any[]>('https://localhost:7033/api/Chat',{
      params:{
        userId1:user1,
        userId2:user2
      }
    });
  }
  GetConnectionIdByUserId(id:string){
    return this.http.get<User>(`https://localhost:7033/api/Chat/${id}`);
  }

  
}
export class Message {
  constructor(
    public content: string,
    public mine: boolean
  ) {}
}
