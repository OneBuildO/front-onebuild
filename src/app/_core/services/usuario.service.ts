import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {CadastroUsuarioDTO} from "../models/cadastro.model";
import {AuthService} from "./auth.service";
import {DadosEstatisticaUsuario, UsuarioModel, ValidacaoEmailDTO} from "../models/usuario.model";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}

  getUserLogged(){
    return this.httpClient.get<UsuarioModel>(`${this._apiBaseUrl}/usuario/obterDadosResumoUsuario`, {
      headers : this.authService.generateHeader()
    })
  }

  getObterTipoUsuario() {
    return this.httpClient.get(`${this._apiBaseUrl}/usuario/obterTipoUsuario`, {
      headers: this.authService.generateHeader(),
      responseType: 'text',
    }).pipe(
      catchError(err => {
        return of('');
      })
    );
  }  

  saveUser(newUser : CadastroUsuarioDTO){
    return this.httpClient.post(`${this._apiBaseUrl}/usuario/novoUsuario`, newUser, {responseType: "text"})
      .pipe(first())
  }

  resendCodeValidationEmail(email: string){
    return this.httpClient.get(`${this._apiBaseUrl}/usuario/envioEmail/reenviarCodigoValidacaoEmail?email=${email}`,
      {responseType: "text"})
      .pipe(first())
  }

  validacaoEmail(dadosValidacao: ValidacaoEmailDTO){
    return this.httpClient.put(`${this._apiBaseUrl}/usuario/envioEmail/validacaoEmail`, dadosValidacao,
      {responseType: "text"})
      .pipe(first())
  }

  getEstatisticResumeUser(){
    return this.httpClient.get<DadosEstatisticaUsuario>(`${this._apiBaseUrl}/usuario/obterEstatisticasUsuario`, {
      headers : this.authService.generateHeader()
    })
  }
}
