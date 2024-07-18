import {Injectable} from '@angular/core';
import {UsuarioModel} from "../models/usuario.model";
@Injectable({ providedIn: 'root' })
export class SharedService  {

  private _userSharedData!: UsuarioModel;
  constructor() { }


  getUserSharedData(): UsuarioModel {
    return this._userSharedData;
  }

  setUserSharedData(value: UsuarioModel) {
    this._userSharedData = value;
  }
}
