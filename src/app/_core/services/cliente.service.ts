import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {AuthService} from "./auth.service";
import {ClienteResumoDTO} from "../models/clienteResumo";

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}

  saveNewClient(newClient : ClienteResumoDTO){
    return this.httpClient.post(`${this._apiBaseUrl}/cliente/novo`, newClient, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }

  editClient(newClient : ClienteResumoDTO){
    return this.httpClient.put(`${this._apiBaseUrl}/cliente/atualizar`, newClient, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }

  getAllForUser(){
    return this.httpClient.get<ClienteResumoDTO[]>(`${this._apiBaseUrl}/cliente/obterClientesPorUsuario`, {
      headers : this.authService.generateHeader()
    })
  }

  deleteClient(clienteModel : ClienteResumoDTO){
    const id = clienteModel.id
    const token = clienteModel.token

    return this.httpClient.delete(`${this._apiBaseUrl}/cliente/delete?id=${id}&token=${token}`, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }
}
