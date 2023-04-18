import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ServicesComponent } from './Components/services/services.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { CommonModule } from '@angular/common';
import { ProposalComponent } from './Components/add-proposal/proposal.component';
import { ResetComponent } from './Components/reset/reset.component';
import { UserProposalsComponent } from './Components/user-proposals/user-proposals.component';
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
    ProposalComponent,
    ResetComponent,
    UserProposalsComponent
  ],
  imports: [BrowserModule,CommonModule, AppRoutingModule, FormsModule,ReactiveFormsModule, HttpClientModule,NgConfirmModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
