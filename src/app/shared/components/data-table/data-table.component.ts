import { NgClass, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjetoResumoDTO} from "../../../_core/models/projeto.model";

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  @Input() columnData: any = [];
  @Input() rowData: any = [];
  @Input() pageData: number[] = [];
  @Input() titleTable? : string = ''

  @Output() showModal = new EventEmitter<boolean>();
  @Output() dados = new EventEmitter<ProjetoResumoDTO>();
  shorting: boolean = false;

  handleTeste(protico : ProjetoResumoDTO){
    this.showModal.emit(true);
    this.dados.emit(protico);
    console.log('protico', protico)
  }



  sortingUp() {
    this.shorting = !this.shorting;
  }
  sortingDown() {
    this.shorting = !this.shorting;
  }
}
