import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EdiUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { StatComponent } from './stat/stat.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
  },
  {
    path: 'user/edit/:id', component : EdiUserComponent
  },
  {
    path: 'create', component: CreateUserComponent
  },
  {
    path: 'stat', component: StatComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
