import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Modals/user';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  public UserID: string="";
  public UserData:any;
  public UserPortofolio:any;
  public CertificateIMG: any;

  constructor(private userservice:UserService,private auth:AuthService,private userStore:UserstoreService) { }

  ngOnInit(): void {
    this.userStore.getIDfromStore().subscribe( id => {
        this.UserID = id || this.auth.getIDfromToken()
        console.log(this.UserID);
    })
    this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
        console.log(this.UserData);
    })
  // this.CertificateIMG=this.userservice.convertBYTEtoIMG(this.UserData.certfcimage)
  this.userservice.getPorfolio(this.UserID).subscribe( val => {
    this.UserPortofolio=val;
    console.log(this.UserPortofolio);
  })
  }
}
