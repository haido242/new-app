import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EdiUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
  },
  {
    path: 'user/edit/:id', component : EdiUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
