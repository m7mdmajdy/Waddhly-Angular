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
import { HttpClientModule } from '@angular/common/http';
import { ProposalComponent } from './Components/add-proposal/proposal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './Components/reset/reset.component';
import { AllProposalsComponent } from './Components/all-proposals/all-proposals.component';
import { AddPostComponent } from './Components/add-post/add-post.component';
import { UserOldPropsComponent } from './Components/user-old-props/user-old-props.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile/:id',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service/:id', component: ServiceComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'session/:id', component: VideoComponent, canActivate: [AuthGuard] },
  {
    path: 'Proposals/Proposal',
    component: ProposalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/Proposal',
    component: AllProposalsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proposal/:id',
    component: ProposalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proposals',
    component: UserOldPropsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset', component: ResetComponent },
  { path: 'addpost', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
