import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {AuthService} from "./auth.service";
import {ProjetoDetahesDTO, ProjetoResumoDTO} from "../models/projeto.model";

@Injectable({ providedIn: 'root' })
export class ProjetoService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

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
}
