import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/Services/auth/User/user.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{
  usercertificate:any;
  user:any;
  public UserID: string="";
  public UserData:any;
  public UserPortofolio:any;
  public CertificateTitle:string="";
  public CertificateURL:string="";
  public CertificateIMG: any;
  public CertificateDate: any;
  formData=new FormData()
  constructor(private userservice:UserService,private auth:AuthService,private toast:NgToastService,private userStore:UserstoreService){
  }
    ngOnInit(): void {
      this.userStore.getIDfromStore().subscribe( id => {
        this.UserID = id || this.auth.getIDfromToken()
        console.log(this.UserID);
    })
    this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
        console.log(this.UserData);
    })
    this.userservice.getPorfolio(this.UserID).subscribe( val => {
      this.UserPortofolio=val;
      console.log(this.UserPortofolio);
    })
  }

  editUserData(){
    this.userservice.editUserDataByID(this.UserID,this.user)
  }
  addNewCertificate(){
  //   console.log(this.CertificateTitle)
  //   console.log(this.CertificateURL)
  //   console.log(this.UserID)
  //   console.log(this.CertificateIMG)
  //     this.usercertificate={
  //   Title:this.CertificateTitle,
  //   CertificateUrl:this.CertificateURL,
  //   userid:this.UserID,
  //   File:this.CertificateIMG
  // }

    this.formData.append('Title',this.CertificateTitle)
    this.formData.append('CertificateUrl',this.CertificateURL)
    this.formData.append('userid',this.UserID)
    this.formData.append('File',this.CertificateIMG)
    this.userservice.addCertificate(this.formData).subscribe({next:val=>{
      this.toast.success({detail:"Success",summary:"You add a certificate successfully",duration:3000}),
      this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
      })},
      error:err=>
      this.toast.error({detail:"Error",summary:"Add certificate Failed",duration:3000}),

    })
  }

  deleteCertificate(id:string){
    this.userservice.deleteCertificate(id).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You delete a certificate successfully",duration:3000}),
        this.userservice.getUserDataByID(this.UserID).subscribe( val => {
          this.UserData = val;
        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Delete certificate Failed",duration:3000}),

      })
  }

  addNewPortofolio(){

      this.formData.append('Title',this.CertificateTitle)
      this.formData.append('ProjectUrl',this.CertificateURL)
      this.formData.append('Date',this.CertificateDate)
      this.formData.append('userid',this.UserID)
      this.formData.append('File',this.CertificateIMG)
      console.log(this.usercertificate)
      this.userservice.addPorfolio(this.UserID,this.formData).subscribe({next:val=>{
        this.toast.success({detail:"Success",summary:"You add a certificate successfully",duration:3000}),
        this.userservice.getUserDataByID(this.UserID).subscribe( val => {
          this.UserData = val;
          console.log(this.UserData);
        })},
        error:err=>
        this.toast.error({detail:"Error",summary:"Add certificate Failed",duration:3000}),

      })
    }

  fileInput(data:any):void{
    // debugger;
    this.formData=new FormData();
    const files=data.files as File[];
    Array.from(files).forEach(file => this.formData.append('File',file))
    //this.formData.append('File',files)
  }

  deletePorfolio(id:string){
    this.userservice.deletePorfolio(this.UserID,id).subscribe({next:val=>{
      this.toast.success({detail:"Success",summary:"You delete your Job successfully",duration:3000}),
      this.userservice.getUserDataByID(this.UserID).subscribe( val => {
        this.UserData = val;
      })},
      error:err=>
      this.toast.error({detail:"Error",summary:"Delete Job Failed",duration:3000}),
    })
  }
}
