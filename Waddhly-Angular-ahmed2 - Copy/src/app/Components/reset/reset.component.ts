import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resetPassword } from 'src/app/Modals/ressetpassword';
import { ResetPasswordService } from 'src/app/Services/Resset Password/reset-password.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetpasswordform!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj=new resetPassword();
  constructor(
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private resetser:ResetPasswordService,
    private toast:NgToastService,
    private router:Router
    )
  {

  }
  ngOnInit(): void {
  this.resetpasswordform=this.fb.group({
    password:[null,Validators.required],
    confirmPassword:[null,Validators.required]
  },
  {
    validator:this.passwordMatchValidator
    });
    this.activatedRoute.queryParams.subscribe(val=>{
      let urltoken=val['code'];
      this.emailToReset=val['email'];
      this.emailToken=urltoken.replace(/ /g,'+');
      console.log(this.emailToReset);
      console.log(this.emailToken);
    });
  }
  
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
  reset()
  {
    if(this.resetpasswordform.valid)
    {
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetpasswordform.value.password;
      this.resetPasswordObj.confirmPassword=this.resetpasswordform.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailToken;
      this.resetser.resetpassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'Success',
            summary:'Password Reset Successfully',
            duration: 3000
          });
          this.router.navigate(['/']); 
        },
        error:(err)=>{
          this.toast.error({
            detail:'Error',
            summary:'Password Reset Failed',
            duration:3000
          });
        }
      })
    }
    else{
      //validateform.validateAllFormFields(this.resetpasswordform);
      this.toast.success({
        detail:'Error',
        summary:'please check your validation',
        duration: 3000
      });
    }

  }
}
