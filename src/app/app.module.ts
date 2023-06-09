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
import { ServicesComponent } from './Components/services/services.component';
import { PostsComponent } from './Components/posts/posts.component';
import { PostComponent } from './Components/post/post.component';
import { ServiceComponent } from './Components/service/service.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { UserprofileComponent } from './Components/UserProfile/userprofile/userprofile.component';
import { EditprofileComponent } from './Components/UserProfile/editprofile/editprofile.component';
import { ChatComponent } from './Components/chat/chat.component';
import { VideoComponent } from './Components/video/video.component';
import { AddPostComponent } from './Components/add-post/add-post.component';

import {NgConfirmModule} from 'ng-confirm-box';
import { CommonModule } from '@angular/common';
import { ProposalComponent } from './Components/add-proposal/proposal.component';
import { ResetComponent } from './Components/reset/reset.component';
import { UserProposalsComponent } from './Components/user-proposals/user-proposals.component';
import { UserOldPropsComponent } from './Components/user-old-props/user-old-props.component';
import { NgxPayPalModule } from 'ngx-paypal';
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
    ServicesComponent,
    PostsComponent,
    PostComponent,
    ServiceComponent,
    EditprofileComponent,
    UserprofileComponent,
    ChatComponent,
    VideoComponent,
    ProposalComponent,
    ResetComponent,
    UserProposalsComponent,
    AddPostComponent,
    UserOldPropsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgConfirmModule,
    NgxPayPalModule,

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
