import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserprofileComponent } from './Components/UserProfile/userprofile/userprofile.component';
import { EditprofileComponent } from './Components/UserProfile/editprofile/editprofile.component';
import { ServicesComponent } from './Components/services/services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserprofileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
