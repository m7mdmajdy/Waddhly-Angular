<<<<<<< HEAD
import { PostComponent } from './Components/post/post.component';
=======
>>>>>>> a6d34c43838483e0b501f9202f09cf30f6c3fb5a
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
<<<<<<< HEAD
import { ServicesComponent } from './Components/services/services.component';
import { PostsComponent } from './Components/posts/posts.component';
import { ServiceComponent } from './Components/service/service.component';
=======
import { UserprofileComponent } from './Components/UserProfile/userprofile/userprofile.component';
import { EditprofileComponent } from './Components/UserProfile/editprofile/editprofile.component';
import { ServicesComponent } from './Components/services/services.component';
>>>>>>> a6d34c43838483e0b501f9202f09cf30f6c3fb5a

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
=======
  { path: 'profile', component: UserprofileComponent },
  { path: 'editprofile', component: EditprofileComponent },
>>>>>>> a6d34c43838483e0b501f9202f09cf30f6c3fb5a
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServicesComponent },
<<<<<<< HEAD
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
=======
>>>>>>> a6d34c43838483e0b501f9202f09cf30f6c3fb5a
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
