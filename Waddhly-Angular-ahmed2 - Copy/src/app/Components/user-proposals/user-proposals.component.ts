import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetProposal } from 'src/app/Modals/user';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-user-proposals',
  templateUrl: './user-proposals.component.html',
  styleUrls: ['./user-proposals.component.css']
})
export class UserProposalsComponent  implements OnInit {
  UserID:any;

constructor(private userStore:UserstoreService,
  private httpClient: HttpClient,
  private authService:AuthService)
{


}
  ngOnInit(): void {
    // this code get the id of the user that have logined
    this.userStore.getIDfromStore().subscribe( id => {
      this.UserID = id || this.authService.getIDfromToken()
      console.log(this.UserID);
    });
  }
showproposals()
{
  this.httpClient
  .get<GetProposal>('https://localhost:7033/api/User/')
  .subscribe(
    (u) => {});
}
}
