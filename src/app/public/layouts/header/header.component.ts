import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { AdminRoutes } from 'src/app/admin/admin.routes';
import { AppRoutes } from 'src/app/app.routes';
import { Images } from 'src/assets/data/images';
import { PublicRoutes } from '../../public.routes';
import {AuthService} from "../../../_core/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'public-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class PublicHeaderComponent implements OnInit{
  public mainLogo: string = Images.mainLogo;
  readonly publicRoutes = PublicRoutes;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  constructor(
    public readonly commonService: CommonService,
    private authService : AuthService,
  ) {}

  isMenuOpen = false;
  isUserLogged : boolean = false;

  ngOnInit() {
    this.isUserLogged = this.authService.isUserLogged();
  }

  handleopenMenu(isOpen? : boolean){
    if(isOpen){
      this.isMenuOpen = isOpen
    }else{
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

}
