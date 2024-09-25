import { NgClass, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AdminRoutes } from "src/app/admin/admin.routes";
import { formatDatePTBR } from 'src/app/shared/utils/Utils'
import {ModalRemoveComponent} from "src/app/shared/components/modalRemove/modalRemove.component";
import {ProjetoResumoDTO} from "src/app/_core/models/projeto.model";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'datatable-projetos',
  standalone: true,
  imports: [NgClass, NgIf, ModalRemoveComponent, MatIconModule],
  templateUrl: './datatable-projetos.component.html',
  styleUrl: './datatable-projetos.component.css',
})
export class DatatableProjetosComponent {
  @Input() columnData: any = [];
  @Input() rowData: any = [];
  @Input() pageData: number[] = [];
  @Input() titleTable? : string = ''

  @Output() onDeleteEmitter = new EventEmitter<ProjetoResumoDTO>();
  @Output() onEditEmitter = new EventEmitter<ProjetoResumoDTO>();

  projetoSeleciodado! : ProjetoResumoDTO;
  showModalConfirmRemove: boolean = false;

  onEditItem(project? : ProjetoResumoDTO){
    this.onEditEmitter.emit(project)
  }

  handleShowRemoveModal(project? : ProjetoResumoDTO){
    if(project) this.projetoSeleciodado = project;
    this.showModalConfirmRemove = !this.showModalConfirmRemove;
  }

  onConfirmRemove(){
    this.onDeleteEmitter.emit(this.projetoSeleciodado);
  }

  redirectProjectoDetails(id : number){
    window.location.href = (`/admin/${AdminRoutes.Projetos}/detalhes?projeto=${id}`)
  }

  protected readonly formatDatePTBR = formatDatePTBR;
}
