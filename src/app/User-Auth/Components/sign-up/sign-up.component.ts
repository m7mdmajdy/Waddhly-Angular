import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Modals/user';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    NewUser:any;
    SignUpForm :FormGroup;


    constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private authService:AuthService)
    {
        this.SignUpForm=this.fb.group({
          firstname:['',[Validators.required,Validators.minLength(3)]],
          lastname:['',[Validators.required,Validators.minLength(3)]],
          username:['',[Validators.required,Validators.minLength(3)]],
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required]],
                        // password:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),
                        // Validators.minLength(6)]],
          confirm_password:['',[Validators.required]],
          // confirm_password:['',[Validators.required,,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),

          // Validators.minLength(6)]],
          country:['',[Validators.required]],
          phone:['',[Validators.required]],
          // phone:['',[Validators.required,Validators.pattern("+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d| 2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$")]],
          gender: ['',[Validators.required]],
        }, {
          validator: ConfirmedValidator('password', 'confirm_password')
          // validator: this.passwordMatchValidator
        })

        this.NewUser={
          firstname:this.SignUpForm.value.firstname,
          lastname:this.SignUpForm.value.lastname,
          username:this.SignUpForm.value.username,
          email:this.SignUpForm.value.email,
          password:this.SignUpForm.value.password,
          country:this.SignUpForm.value.country,
          phone:this.SignUpForm.value.phone,
          gender:this.SignUpForm.value.gender,
        };
    }

    SignUp()
    {
      console.log(this.NewUser.value)
      this.authService.SignUp(this.NewUser.value).subscribe({
        // next:(res)=>{
        //   this.router.navigate(['/home'])
        // }, error:(err)=>{
        //   alert(err?.error.message);
        // }
    })

      //   this.SignUpForm.reset();

    }

myvar:any ;
    get(){
      this.authService.get().subscribe(x=>{this.NewUser=x})
      console.log(this.myvar)
    }

    // passwordMatchValidator(formGroup: FormGroup) {
    //   const password = formGroup.get('password')?.value;
    //   const confirmPassword = formGroup.get('confirm_password')?.value;

    //   if (password !== confirmPassword) {
    //     formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
    //   } else {
    //     formGroup.get('confirm_password')?.setErrors(null);
    //   }
    // }
  }


export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

