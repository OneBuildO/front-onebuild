import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicRoutes} from "../public.routes";
import {CadastroComponent} from "./cadastro/cadastro.component";
import {LoginComponent} from "./login/login.component";
import {RedefinicaoSenhaComponent} from "./redefinicaoSenha/redefinicaoSenha.component";
import {ValidacaoEmailComponent} from "./validacaoEmail/validacaoEmail.component";

const routes: Routes = [
  {
    title: "Cadastro",
    path: PublicRoutes.Cadastro,
    component: CadastroComponent
  },
  {
    title: "Login",
    path: PublicRoutes.Login,
    component: LoginComponent
  },
  {
    title: "Redefinição de Senha",
    path: PublicRoutes.Redefinicao_Senha,
    component: RedefinicaoSenhaComponent
  },
  {
    title: "Validação de email",
    path: PublicRoutes.ValidacaoEmail,
    component: ValidacaoEmailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
