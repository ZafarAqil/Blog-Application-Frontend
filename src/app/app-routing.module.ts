import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { CommunityDetailsComponent } from './community/community-details/community-details.component';
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { ViewCommunityComponent } from './community/view-community/view-community.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{ path: 'signin', component: SigninComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'community',component: ViewCommunityComponent},
{ path: 'profile',component: UserProfileComponent},
{ path: 'create-community', component: CreateCommunityComponent},
{ path: 'create-post', component: CreatePostComponent},
{ path: 'community/:cid',component: CommunityDetailsComponent},
{ path: 'post/:pid',component: ViewPostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
