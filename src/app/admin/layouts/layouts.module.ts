import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarCollapseDirective } from './sidebar/sidebar-collapse.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarCollapseDirective,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class LayoutsModule { }
