import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public username:string ="";
  public email:string ="";
  public mytoken:any;
  public UserID:string="";
  public UserData:any

  constructor (private userStore: UserstoreService, private auth:AuthService,private userservice:UserService){

    this.mytoken = this.auth.getToken();
    this.userStore.getIDfromStore().subscribe(val=>{
      this.UserID = val || this.auth.getIDfromToken()
    })
    this.userservice.getUserDataByID(this.UserID).subscribe( val => {
      this.UserData = val;
      console.log(this.UserData);
    })
  }

logout(){
  this.auth.logout();
}

}
