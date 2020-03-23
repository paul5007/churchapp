import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { EventListComponent } from '../event-list/event-list.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'profile',
  component: UserProfileComponent
},
{
  path: 'events',
  component: EventListComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: '**',
  pathMatch: 'full',
  redirectTo: '/login'
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
