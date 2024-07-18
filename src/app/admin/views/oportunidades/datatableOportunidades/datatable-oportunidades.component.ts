import { NgClass, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AdminRoutes } from "../../../admin.routes";

@Component({
  selector: 'datatable-projetos',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './datatable-oportunidades.component.html',
  styleUrl: './datatable-oportunidades.component.css',
})
export class DatatableOportunidadesComponent {
  @Input() columnData: any = [];
  @Input() rowData: any = [];
  @Input() pageData: number[] = [];
  @Input() titleTable? : string = ''
  shorting: boolean = false;


  sortingUp() {
    this.shorting = !this.shorting;
  }
  sortingDown() {
    this.shorting = !this.shorting;
  }

  redirectProjectoDetails(id : number){
    window.location.href = (`/admin/${AdminRoutes.Projetos}/detalhes?projeto=${id}`)
  }
}
