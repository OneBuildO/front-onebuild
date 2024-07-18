import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {ValidationErrorComponent} from "../../../shared/components/validation-error/validation-error.component";



@NgModule({
  declarations: [
    ProfileComponent,
    UsersComponent
  ],
    imports: [
        CommonModule,
        AlertComponent,
        ReactiveFormsModule,
        SpinnerComponent,
        ValidationErrorComponent
    ],
  exports: [
    ProfileComponent
  ]
})
export class SettingsModule { }
