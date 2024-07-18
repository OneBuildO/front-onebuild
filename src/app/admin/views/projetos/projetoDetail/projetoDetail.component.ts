import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {pageTransition} from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app/shared/components/modal/modal.component";
import {DataTableComponent} from "src/app/shared/components/data-table/data-table.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {ProjetoService} from "src/app/_core/services/projeto.service";
import {ProjetoDetahesDTO} from "src/app/_core/models/projeto.model";
import {formatDatePTBR} from "src/app/shared/utils/Utils";

Chart.register(...registerables);

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projetoDetail.component.html',
  standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    NgForOf
  ],
  animations: [pageTransition]
})
export class ProjetoDetailComponent implements OnInit {

  constructor(
    private projectService: ProjetoService,
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdProjeto = Number(this.urlParams.searchParams.get("projeto"));

  projeto!: ProjetoDetahesDTO | null;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent
  naoInformado = 'Não informado'

  ngOnInit(): void {
    this.projectService.getDetailsProjectForId(this.paramIdProjeto)
      .subscribe({
        next: (data: any) => {
          this.projeto = data;
        },
        error: (err) => {
          this.projeto = null;
        }
      });
  }

  handleBack(){
    window.history.back();
  }

  protected readonly formatDatePTBR = formatDatePTBR;
}
