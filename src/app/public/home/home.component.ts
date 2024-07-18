import { Component } from '@angular/core';
import {PublicRoutes} from "../public.routes";
import {CommonService} from "../../_core/services/common.service";
import {AppRoutes} from "../../app.routes";
import {AdminRoutes} from "../../admin/admin.routes";
import {Images} from "../../../assets/data/images";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public readonly commonService: CommonService) {
  }

  public arquiteturaImage: string = Images.arquiteturaHomeImage;
  readonly publicRoutes = PublicRoutes;
  protected readonly AppRoutes = AppRoutes;
  protected readonly AdminRoutes = AdminRoutes;
  protected readonly PublicRoutes = PublicRoutes;
}
