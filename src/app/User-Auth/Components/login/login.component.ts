import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Modals/user';
import { ResetPasswordService } from 'src/app/Services/Resset Password/reset-password.service';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit{
  UserID:any;
  LoginForm :FormGroup;
  public resetpassword!:string;
  public isvalidEmail!:boolean;
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private authService:AuthService,
    private toast:NgToastService,
    private ser:UserService,
    private reset_password_service:ResetPasswordService,
    private userStore:UserstoreService)
  {
    this.LoginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }

  Login(){
      this.authService.Login(this.LoginForm.value).subscribe({
      next:(res)=>{
        //debugger;
        this.LoginForm.reset();
        this.toast.success({
          detail: 'Success',
          summary: 'Login confirmed',
          duration: 5000,
        });
        this.authService.storeToken(res.token);
        let TokenPayload = this.authService.decodedToken();
        this.userStore.setIDforStore(TokenPayload.id);
        this.userStore.setEmailforStore(TokenPayload.email);
        this.userStore.setRoleforStore(TokenPayload.role);
        this.router.navigate(['/home'])
      }, error:(err)=>{
        this.toast.error({detail:"Error",summary:err.message,duration:5000});
      }
    })
  }
  ngOnInit(): void {
    this.userStore.getIDfromStore().subscribe( id => {
      this.UserID = id || this.authService.getIDfromToken()
      console.log(this.UserID);
      this.ser.userloginedID=id;
    });
// this.ser.get(this.UserID).subscribe({
//   next:(u)=>console.log(u),
//   error:(err)=>console.log(err)
// })
}
checkValidEmail(event:string)
{
  const value=event;
  const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isvalidEmail=pattern.test(value);
  return this.isvalidEmail;
}
confirmToSend()
{
  if(this.checkValidEmail(this.resetpassword))
  {
    console.log(this.resetpassword);

    this.reset_password_service.sendresetpasswordlink(this.resetpassword).subscribe({
      next:(res)=>{
        this.toast.success({
          detail:'Success',
          summary:'Resset Success!',
          duration:3000,
        });
        this.resetpassword="";
        const bttonref=document.getElementById("closebtn");
        bttonref?.click();
      },
      error:(err)=>{
        this.toast.error({
          detail:'ERROR',
          summary:'Something went wrong !',
          duration:5000,
        })
      }
    });
  }
}
}
