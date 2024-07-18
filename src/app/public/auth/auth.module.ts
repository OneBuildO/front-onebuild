import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {CadastroComponent} from "./cadastro/cadastro.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../../shared/components/spinner/spinner.component";
import {ValidationErrorComponent} from "../../shared/components/validation-error/validation-error.component";
import {AlertComponent} from "../../shared/components/alert/alert.component";
import {RedefinicaoSenhaComponent} from "./redefinicaoSenha/redefinicaoSenha.component";
import {ValidacaoEmailComponent} from "./validacaoEmail/validacaoEmail.component";


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    RedefinicaoSenhaComponent,
    ValidacaoEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SpinnerComponent,
    ValidationErrorComponent,
    AlertComponent,
  ],
  exports: [
    LoginComponent,
    CadastroComponent,
  ]
})
export class AuthModule { }
