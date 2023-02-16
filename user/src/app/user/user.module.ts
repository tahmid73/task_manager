import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    UsersListComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
