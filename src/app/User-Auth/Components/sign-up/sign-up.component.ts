import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    NewUser:any;
    SignUpForm :FormGroup;


    constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private authService:AuthService,private toast:NgToastService)
    {
        this.SignUpForm=this.fb.group({
          firstname:['',[Validators.required,Validators.pattern("^[A-Za-z]+([A-Za-z]){2,}$")]],
          lastname:['',[Validators.required,Validators.pattern("^[A-Za-z]+([A-Za-z]){2,}$")]],
          username:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{2,16}$")]],
          email:['',[Validators.required,Validators.email,Validators.pattern("[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]*[.]{1}[a-zA-Z0-9]{2,}")]],
          //password:['',[Validators.required]],
          password:['',[Validators.required,
                        Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()--+={}[]|\:;\"'<>,.?/_₹]).{8,}")]],
          //confirm_password:['',[Validators.required]],
          confirm_password:['',[Validators.required,
                                Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()--+={}[]|\:;\"'<>,.?/_₹]).{8,}")]],
          country:['',[Validators.required]],
          phoneNumber:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
          //phoneNumber:['',[Validators.required,Validators.pattern(" /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/")]],
          //phoneNumber:['',[Validators.required,Validators.pattern("+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d| 2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$")]],
          gender: ['',[Validators.required]],
        }, {
          //validator: ConfirmedValidator('password', 'confirm_password')
           validator: this.passwordMatchValidator
        })

        this.NewUser={
          firstname:this.SignUpForm.value.firstname,
          lastname:this.SignUpForm.value.lastname,
          username:this.SignUpForm.value.username,
          email:this.SignUpForm.value.email,
          password:this.SignUpForm.value.password,
          country:this.SignUpForm.value.country,
          phoneNumber:this.SignUpForm.value.phoneNumber,
          gender:this.SignUpForm.value.gender,
        };
    }

    SignUp()
    {
      this.authService.SignUp(this.NewUser).subscribe({
        next:(res)=>{
          console.log(this.NewUser)
          console.log(res)
          this.toast.success({detail:"Success",summary:"Successfully Registered",duration:5000})
          this.SignUpForm.reset();
          this.router.navigate(['/login'])
        }, error:(err)=>{
          console.log(err)
          console.log(err.message)
          this.toast.error({detail:"Failed",summary:err.message,duration:5000})
        }
      })
    }

myvar:any ;
    get(){
      this.authService.get().subscribe(x=>{this.NewUser=x})
      console.log(this.myvar)
    }

    passwordMatchValidator(formGroup: FormGroup) {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirm_password')?.value;

      if (password !== confirmPassword) {
        formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
      } else {
        formGroup.get('confirm_password')?.setErrors(null);
      }
    }
  }


// export function ConfirmedValidator(controlName: string, matchingControlName: string){
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];
//       if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
//           return;
//       }
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ confirmedValidator: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }

