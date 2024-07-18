import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {DataTableComponent} from "../../../../shared/components/data-table/data-table.component";
import {IColumn, IProjects, TableData} from "../../elements/data-table/table.data";
import {NgClass, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../../../../shared/components/spinner/spinner.component";
import {AlertComponent} from "../../../../shared/components/alert/alert.component";
import {AlertType} from "../../../../shared/components/alert/alert.type";
import {ProjetoService} from "../../../../_core/services/projeto.service";
Chart.register(...registerables);

@Component({
    selector: 'app-oportunidade-detail',
    templateUrl: './oportunidadeDetail.component.html',
    standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent
  ],
    animations: [pageTransition]
})
export class OportunidadeDetailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjetoService,
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdProjeto = Number(this.urlParams.searchParams.get("projeto"));


  public projects: IProjects[] = TableData.projects;
  public columnData:IColumn[] = TableData.columnData;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent

  ngOnInit(): void {
  }
}
