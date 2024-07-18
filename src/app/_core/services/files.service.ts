import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({ providedIn: 'root' })
export class FilesService {

  private readonly _apiBaseUrl = `${environment.apiUrl}`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService : AuthService,
  ) {}

  saveFileInAwsS3(files : File[], idProjeto : number | null){
    const formData = new FormData();
    files.map((file)=> formData.append('arquivo', file))
    formData.append("reportProgress", "true");

    return this.httpClient.post(`${this._apiBaseUrl}/awsS3/uploadFileS3?idProjeto=${idProjeto}`, formData, {
      responseType: "text",
      headers : this.authService.generateHeaderFile()
    }).pipe(first())
  }
}
