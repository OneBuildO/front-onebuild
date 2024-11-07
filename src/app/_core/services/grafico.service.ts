import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
    private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getGraficoProjetosCadastro(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this._apiBaseUrl}/usuario/graficoProjetosCadastro`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return throwError('Erro ao buscar dados do gráfico. Tente novamente mais tarde.');
  }
}