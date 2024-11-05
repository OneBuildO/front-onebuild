import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {AuthService} from "./auth.service";
import {ProjetoDetahesDTO, ProjetoResumoDTO} from "../models/projeto.model";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ProjetoService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;
  private openweathermapGeoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private openweathermapWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private openweathermapKey = 'dd3ce94aa0b74ec4b1cc3086d70a3c0d';
  private mapBoxApiKey = 'pk.eyJ1IjoianZpY3RvcjAxMSIsImEiOiJjbTJrdDF3bjEwNHZuMmxvZXFzbmR2ZXZjIn0.i54Xkjxm3rb7vYvXt2Sq_w';
  private geocodeApiUrl = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';
  private searchBoxApiUrl = 'https://api.mapbox.com/search/searchbox/v1/suggest';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}

  saveFileInAwsS3(files : File[], idProjeto : number | null){
    const formData = new FormData();
    files.map((file)=> formData.append('arquivo', file))
    formData.append("reportProgress", "true");

    return this.httpClient.post(`${this._apiBaseUrl}/awsS3/uploadImageS3?idProjeto=${idProjeto}`, formData, {
      responseType: "text",
      headers : this.authService.generateHeaderFile()
    }).pipe(first())
  }

  saveNewProject(newProject : ProjetoResumoDTO){
    return this.httpClient.post(`${this._apiBaseUrl}/projeto/novoProjeto`, newProject, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }

  editProject(newProject : ProjetoResumoDTO){
    return this.httpClient.put(`${this._apiBaseUrl}/projeto/atualizar`, newProject, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }

  getAllProjectForUser(){
    return this.httpClient.get<ProjetoResumoDTO[]>(`${this._apiBaseUrl}/projeto/obterProjetosPorUsuario`, {
      headers : this.authService.generateHeader()
    })
  }

  getAllProjectAvailableForSupplier(){
    return this.httpClient.get<ProjetoResumoDTO[]>(`${this._apiBaseUrl}/projeto/obterProjetosDisponiveisPorFornecedor`, {
      headers : this.authService.generateHeader()
    })
  }

  getAllProjectForClient(idCliente: number){
    return this.httpClient.get<ProjetoResumoDTO[]>(`${this._apiBaseUrl}/projeto/obterProjetosPorCliente?idCliente=${idCliente}`, {
      headers : this.authService.generateHeader()
    })
  }

  getDetailsProjectForId(idCliente: number){
    return this.httpClient.get<ProjetoDetahesDTO>(`${this._apiBaseUrl}/projeto/obterDetalhesProjetoPorId?idProjeto=${idCliente}`, {
      headers : this.authService.generateHeader()
    })
  }

  getCategoriesAvailableForClien(idCliente: number){
    return this.httpClient.get<string[]>(`${this._apiBaseUrl}/projeto/obterListaCategoriasDisponiveis?idCliente=${idCliente}`, {
      headers : this.authService.generateHeader()
    })
  }

  deleteProject(projectModel : ProjetoResumoDTO){
    const id = projectModel.id;

    return this.httpClient.delete(`${this._apiBaseUrl}/projeto/delete?id=${id}`, {
      responseType: "text",
      headers : this.authService.generateHeader()
    }).pipe(first())
  }

  getCoordinates(city: string, state: string): Observable<any> {
    const url = `${this.openweathermapGeoUrl}?q=${city},BR&limit=5&appid=${this.openweathermapKey}`;

    return this.httpClient.get(url).pipe(
      map((response: any) => {
        if (!response || response.length === 0) {
          throw new Error('Nenhuma cidade encontrada.');
        }

        const cityData = response.find((item: any) => item.state === state);

        if (cityData) {
          return {
            latitude: cityData.lat,
            longitude: cityData.lon
          };
        } else {
          throw new Error('Cidade não encontrada no estado especificado.');
        }
      })
    );
  }

  getWeatherData(lat: number, lon: number): Observable<any> {
    return this.httpClient.get<any>(`${this.openweathermapWeatherUrl}?lat=${lat}&lon=${lon}&appid=${this.openweathermapKey}&lang=pt_br&units=metric`).pipe(
      map(response => response)
    );
  }

  getCoordinatesMapBox(mapbox_id: string): Observable<any> {
    const sessionToken = uuidv4();
    const url = `${this.geocodeApiUrl}${mapbox_id}?session_token=${sessionToken}&access_token=${this.mapBoxApiKey}`;
    return this.httpClient.get(url);
  }
  
  
  getEnderecoMap(searchText: string): Observable<any> {
        const sessionToken = uuidv4();
        const url = `${this.searchBoxApiUrl}?q=${encodeURIComponent(searchText)}&access_token=${this.mapBoxApiKey}&session_token=${sessionToken}`;
        console.log('URL:', url);
    
        // Inscreve-se no Observable para logar a resposta
        this.httpClient.get(url).subscribe(
          (data) => {
            console.log('Dados recebidos:', data);
          },
          (error) => {
            console.error('Erro ao buscar dados:', error);
          }
        );
    
        return this.httpClient.get(url);
    }
    
  
}
//https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}