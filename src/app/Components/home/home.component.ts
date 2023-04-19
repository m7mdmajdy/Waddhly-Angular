import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private UserID:any;
  private UserData:any;

  constructor(private userStore: UserstoreService,private auth:AuthService, private userservice:UserService){
    this.userStore.getIDfromStore().subscribe( id => {
      this.UserID = id || this.auth.getIDfromToken()
    })
    this.userservice.getUserDataByID(this.UserID).subscribe( val => {
      this.UserData = val;
      console.log(this.UserData);
    })
  }
}

