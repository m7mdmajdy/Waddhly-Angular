import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { UserprofileComponent } from './Components/UserProfile/userprofile/userprofile.component';
import { EditprofileComponent } from './Components/UserProfile/editprofile/editprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    NotFoundComponent,
    UserprofileComponent,
    EditprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS,
    //  useClass:TokenInterceptor,
    //  multi:true
    // }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
