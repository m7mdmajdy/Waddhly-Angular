import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/Modals/user';
import { UserstoreService } from 'src/app/Services/auth/UserStore/userstore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //NewUser= new User();
  LoginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService,
    private userStore: UserstoreService
  ) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  Login() {
    this.authService.Login(this.LoginForm.value).subscribe({
      next: (res) => {
        debugger;
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
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error({
          detail: 'Error',
          summary: err.error,
          duration: 5000,
        });
      },
    });
  }
}
