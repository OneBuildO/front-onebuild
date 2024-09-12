import { Component } from '@angular/core';
import { Router } from "@angular/router";

// Material icon
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

// configs de array svg
import { iconsArray, customIcon } from "./shared/configs/custom-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    public router: Router,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer
  ) {
    // configurando svg-icons globalmente
    iconsArray.forEach((icon: customIcon) => {
      iconRegistry.addSvgIcon(
        icon.iconName,
        sanitizer.bypassSecurityTrustResourceUrl(icon.iconPath)
      );
    });
  }

}