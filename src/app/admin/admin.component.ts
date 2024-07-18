import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {UsuarioModel} from "../_core/models/usuario.model";
import {UsuarioService} from "../_core/services/usuario.service";
import {AuthService} from "../_core/services/auth.service";
import {SharedService} from "../_core/services/shared.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit{
  title = 'event-bud-frontend';
  isLoading = true;
  userLogged! : UsuarioModel | null;

  constructor(
      private element: ElementRef,
      private rendered: Renderer2,
      private serviceUser : UsuarioService,
      private ServiceAuth : AuthService,
      private servicesetShared: SharedService,
  ) { }

  @HostListener('click', ['$event.target']) onClick(e: Element) {
    const profileDropdown = this.element.nativeElement.querySelector('.profile-dropdown') as Element;
    if (!profileDropdown.contains(e)) {
      const profileDropdownList = this.element.nativeElement.querySelector('.profile-dropdown-list');
      this.rendered.setAttribute(profileDropdownList, 'aria-expanded', 'false')
    }


    const notificationDropdown = this.element.nativeElement.querySelector('.notification-dropdown') as Element;
    if (!notificationDropdown.contains(e)) {
      const notificationDropdownList = this.element.nativeElement.querySelector('.notification-dropdown-list');
      this.rendered.setAttribute(notificationDropdownList, 'aria-expanded', 'false')
    }
  }

  ngOnInit(): void {
    this.serviceUser.getUserLogged()
      .subscribe({
        next: (data: any) => {
          this.userLogged = data
          this.isLoading = false;
          this.servicesetShared.setUserSharedData(data);
        },
        error: (err) => {
          this.ServiceAuth.logout();
          this.isLoading = this.ServiceAuth.isTokenInvalid(err)
        }
      });
  }


}
