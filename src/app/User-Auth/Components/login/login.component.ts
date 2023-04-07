import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Modals/user';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //NewUser= new User();
  LoginForm :FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private authService:AuthService)
  {
    this.LoginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }

  Login(){
    console.log(this.LoginForm.value)
    this.authService.Login(this.LoginForm.value).subscribe({
      next:(res)=>{
        console.log(res.message);
        this.LoginForm.reset();
        this.authService.storeToken(res.token)
        this.router.navigate(['/home'])
      }, error:(err)=>{
        alert(err?.error.message);
      }
    })
  //   this.http.post('http://localhost:8080/api/login',this.LoginForm.value)
  //   .subscribe(res=>{
  //     console.log(res);
  //       this.router.navigate(['/home']);
  //     },err=>{
  //       console.log(err);
  //     });

  }


}
