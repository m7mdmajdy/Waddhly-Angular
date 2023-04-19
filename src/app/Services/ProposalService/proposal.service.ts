import { Injectable } from '@angular/core';
import { HttpClient } from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { proposalDTO } from 'src/app/Modals/proposalsDTO';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http:HttpClient) { }
  
  private _url="https://localhost:7033/api/GetProposalbyUserID/";

  
  getAllProposals(id:any):any
  {
    return this.http.get(this._url+id);

  }
}
