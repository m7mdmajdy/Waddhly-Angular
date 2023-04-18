import { PostComponent } from './Components/post/post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './User-Auth/Components/login/login.component';
import { SignUpComponent } from './User-Auth/Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ServicesComponent } from './Components/services/services.component';
import { PostsComponent } from './Components/posts/posts.component';
import { ServiceComponent } from './Components/service/service.component';
import { UserprofileComponent } from './Components/UserProfile/userprofile/userprofile.component';
import { EditprofileComponent } from './Components/UserProfile/editprofile/editprofile.component';
import { AddPostComponent } from './Components/add-post/add-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: UserprofileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service/:id', component: ServiceComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'addpost', component: AddPostComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
