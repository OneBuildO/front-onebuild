import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {first} from "rxjs";
import {LoginModelDTO} from "../models/login.model";
import {PublicRoutes} from "../../public/public.routes";
import {Router} from "@angular/router";

const TOKEN = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private router: Router,
  ) {}

  login(login : LoginModelDTO){
    return this.httpClient.post(`${this._apiBaseUrl}/usuario/autenticarLogin`, login, {responseType: "text"}).pipe(first())
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigate([PublicRoutes.Home]);
  }


  isTokenInvalid(error : any) : boolean {
    if(error.status === 403){
      this.logout();
      return true;
    }
    return false;
  }

  isUserLogged(): boolean {
    const userLocalStorage = localStorage.getItem(TOKEN);
    return userLocalStorage !== null;
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  handleSetToken(accessToken: string) {
    localStorage.setItem(TOKEN, accessToken);
  }

  generateHeaderFile(customHeaders?: HttpHeaders): any {
    let headers = new HttpHeaders({
      ...customHeaders
    });

    if (this.getToken()) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }

    return headers;
  }

  generateHeader(customHeaders?: HttpHeaders): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Origem': 'WEB',
      Accept: 'application/json',
      ...customHeaders
    });

    if (this.getToken()) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }

    return headers;
  }
}
