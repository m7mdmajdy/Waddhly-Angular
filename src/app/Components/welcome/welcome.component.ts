import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  Categories: any;
  Services: any;
  private UserID:any;
private UserData:any;

  constructor(private httpClient: HttpClient,private userStore: UserstoreService,private auth:AuthService, private userservice:UserService) {


    // this.userStore.getIDfromStore().subscribe( id => {
    //   this.UserID = id || this.auth.getIDfromToken()
    //   console.log(this.UserID);
    // })
    //   this.userservice.getUserDataByID(this.UserID).subscribe( val => {
    //     this.UserData = val;
    //     console.log(this.UserData);
    //   })

    this.httpClient
      .get<any>('https://localhost:7033/api/Category')
      .subscribe((cats) => {
        this.Categories = cats;
        console.log(this.Categories);
      });
    this.httpClient
      .get<any>('https://localhost:7033/api/Service')
      .subscribe((ser) => {
        this.Services = ser;
        console.log(this.Services);
      });
  }
}
