import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {FornecedorDTO} from "../models/fornecedor.model";

@Injectable({ providedIn: 'root' })
export class FornecedorService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}
  
  getFornecedores(): Observable<FornecedorDTO[]> {
    const headers = this.authService.generateHeader();
    return this.httpClient.get<FornecedorDTO[]>(`${this._apiBaseUrl}/usuario/obterFornecedores`, { headers }).pipe(first());
  }
}
