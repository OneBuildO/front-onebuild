import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {MinhasOfertasDTO} from "../models/oferta.model";

@Injectable({ providedIn: 'root' })
export class OfertaService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}

  saveNewOferta(newOferta: MinhasOfertasDTO, files: File[], idPromocao: number | null): Observable<any> {
    const formData = new FormData();
    files.map((file) => formData.append('arquivo', file));
    formData.append("reportProgress", "true");
    formData.append("newOferta", JSON.stringify(newOferta));
  
    return this.httpClient.post(`${this._apiBaseUrl}/nova/promocao?idProjeto=${idPromocao}`, formData, {
      responseType: "text",
      headers: this.authService.generateHeaderFile()
    }).pipe(first());
  }

  editOferta(newOferta: MinhasOfertasDTO): Observable<any> {
    return this.httpClient.put<any>(`${this._apiBaseUrl}/editar/promocao/${newOferta.id}`, newOferta, {
        headers: this.authService.generateHeader()
      }).pipe(first());
  }
  
}
