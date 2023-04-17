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
import { ChatComponent } from './Components/chat/chat.component';
import { VideoComponent } from './Components/video/video.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: UserprofileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'session/:id', component: VideoComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
