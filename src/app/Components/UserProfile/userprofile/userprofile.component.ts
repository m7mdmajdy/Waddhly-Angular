import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Modals/user';
import { ChatService } from 'src/app/Services/ChatService/chat-service.service';
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
  public UserRouteID: any;
  public UserData:any;
  public Categories:any;
  public selectedCategoryId: any;
  public userhourRate:any;
  public Useraccount:number=0;
  public UserPortofolio:any;
  public CertificateIMG: any;
  formData=new FormData();

  constructor(private route:ActivatedRoute ,
    private toast:NgToastService,
    private userservice:UserService,
    private auth:AuthService,
    private userStore:UserstoreService,
    public signalRService: ChatService
    ) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.UserRouteID=(this.route.snapshot.paramMap.get('id'));
    console.log(this.UserRouteID);
    this.userStore.getIDfromStore().subscribe( id => {
        this.UserID = id || this.auth.getIDfromToken()
        console.log(this.UserID);
        this.Useraccount=this.UserData.moneyAccount
    })
    this.userservice.getUserDataByID(this.UserRouteID).subscribe( val => {
        this.UserData = val;
        console.log(this.UserData);

    })
    this.userservice.getallcategory().subscribe( category => {
        this.Categories=category
        console.log(this.Categories);
    })
  // this.CertificateIMG=this.userservice.convertBYTEtoIMG(this.UserData.certfcimage)
    this.userservice.getPorfolio(this.UserRouteID).subscribe( val => {
        this.UserPortofolio=val;
        console.log(this.UserPortofolio);
    })
  }
  addNewCategory(){
    this.formData.append('categoryID',this.selectedCategoryId)
    this.formData.append('hourRate',this.userhourRate)
    this.userservice.editUserDataByID(this.UserID,this.formData).subscribe({next:val=>{
      this.toast.success({detail:"Success",summary:"You add your Category successfully",duration:3000}),
      this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
        console.log(this.UserData);
        this.formData=new FormData();
      })},
      error:err=>
      this.toast.error({detail:"Error",summary:"Edit your Category Failed",duration:3000}),

    })
  }
  msg?:string="";
  SendUserMessage(): void {
    console.log("asdasd");

    if (this.msg?.trim() === "" || this.msg == null) return;

    this.signalRService.hubConnection
    .invoke("SendUserMessage", this.UserRouteID, this.auth.getIDfromToken(), this.msg);
    this.toast.success({detail:"Success",summary:"Your message was sent successfully",duration:3000}),
    this.msg=""
  }
}
