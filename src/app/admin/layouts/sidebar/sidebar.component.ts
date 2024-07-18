import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/_core/services/common.service';
import { AppRoutes } from 'src/app/app.routes';
import { AdminRoutes, ElementRoutes, SettingRoutes } from '../../admin.routes';
import {ESidebarItem} from "src/app/_core/enums/e-sidebar-item";
import {ETipoUsuario} from "src/app/_core/enums/e-tipo-usuario";
import {AuthService} from "src/app/_core/services/auth.service";
import {UsuarioModel} from "src/app/_core/models/usuario.model";
import {EPerfilUsuario} from "src/app/_core/enums/e-perfil-usuario";
import {Images} from "src/assets/data/images";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  readonly settingRoutes = SettingRoutes;
  private routerSubscription: Subscription = new Subscription();
  protected readonly ESidebarItem = ESidebarItem;
  readonly elementRoutes = ElementRoutes;
  protected readonly ETipoUsuario = ETipoUsuario;
  isLoading : boolean = false;
  public mainLogo: string = Images.mainLogo;

  @Input()
  userLogged? : UsuarioModel | null

  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  constructor(
    public readonly commonServices: CommonService,
    private readonly elementRef: ElementRef,
    private router: Router,
    protected authService : AuthService,
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subMenuToggleHandlerOnRouteChange();
    setTimeout(() => { this.subMenuToggleHandlerOnPageReload() }, 1);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  subMenuToggleHandler = (event: MouseEvent): void => {
    const elem = event.target as HTMLElement;
    const subMenu = elem.closest("a.sub-menu") as Element;

    if (subMenu.getAttribute('aria-expanded') == 'false')
      subMenu.setAttribute('aria-expanded', 'true');
    else
      subMenu.setAttribute('aria-expanded', 'false');
  }

  subMenuToggleHandlerOnPageReload = (): void => {
    const elem = this.elementRef.nativeElement.querySelector('[aria-current="page"]')
      .closest('ul.sub-menu-item') as Element;

    const subMenu = elem?.previousSibling as Element;

    subMenu?.setAttribute('aria-expanded', 'true');
  }

  subMenuToggleHandlerOnRouteChange = (): void => {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const subMenu = this.elementRef.nativeElement.querySelectorAll(".sub-menu");
        const elem = this.elementRef.nativeElement.querySelector(`[href='${event.url}']`) as Element;

        if (elem.closest('ul.sub-menu-item')) return;

        subMenu.forEach((subMenu: Element) => {
          if (subMenu.getAttribute('aria-expanded') == 'true')
            subMenu.setAttribute('aria-expanded', 'false');
        });
      }
    })
  }
  protected readonly EPerfilUsuario = EPerfilUsuario;
}
