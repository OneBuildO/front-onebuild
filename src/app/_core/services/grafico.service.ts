import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GraficoService {
  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getGraficoProjetosCadastro(): Observable<{ [key: string]: number }> {
    const headers = this.authService.generateHeader();
    return this.httpClient
      .get<{ [key: string]: number }>(
        `${this._apiBaseUrl}/usuario/graficoProjetosCadastro`,
        { headers }
      )
      .pipe(
        first(),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return throwError(
      'Erro ao buscar dados do gráfico. Tente novamente mais tarde.'
    );
  }
}
