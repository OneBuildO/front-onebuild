import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {UsuarioModel} from "../../../_core/models/usuario.model";
import {CommonService} from "../../../_core/services/common.service";
import {AppRoutes} from "../../../app.routes";
import {AdminRoutes, SettingRoutes} from "../../admin.routes";
import {AuthService} from "../../../_core/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  readonly settingRoutes = SettingRoutes;

  @Input()
  userLogged? : UsuarioModel | null
  // isOpen: boolean = false;

  constructor(
      private element: ElementRef,
      private renderer: Renderer2,
      public commonService: CommonService,
      protected authService : AuthService,
  ) {}

  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };

  onClickNotification = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.notification-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };
}
