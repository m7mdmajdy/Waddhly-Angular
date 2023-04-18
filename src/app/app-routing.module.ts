import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ServicesComponent } from './Components/services/services.component';
import { HttpClientModule } from '@angular/common/http';
import { ProposalComponent } from './Components/add-proposal/proposal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './Components/reset/reset.component';
import { AllProposalsComponent } from './Components/all-proposals/all-proposals.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'Proposals/Proposal', component:ProposalComponent },
  { path: 'user/Proposal', component:AllProposalsComponent },
  { path: 'reset', component:ResetComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,FormsModule, ReactiveFormsModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
