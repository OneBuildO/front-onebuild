import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {IColumn, IProjects, TableData} from "../elements/data-table/table.data";
import {NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {AlertType} from "../../../shared/components/alert/alert.type";
import {ProjetoService} from "../../../_core/services/projeto.service";
Chart.register(...registerables);

@Component({
    selector: 'app-fornecedores',
    templateUrl: './fornecedores.component.html',
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
export class FornecedoresComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjetoService,
  ) {
    this.modalCompnent = new ModalComponent();
  }

  // public selectedProjet?: ProjetoModelDTO | null;
  public projects: IProjects[] = TableData.projects;
  public pages: number[] = TableData.pageNumber;
  public columnData:IColumn[] = TableData.columnData;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent

  projectForm = this.formBuilder.group({
    arquivo: new FormControl( '', ),
    nomeProjeto: new FormControl( '', { validators: [Validators.required] }),
    nomeCliente: new FormControl( '', { validators: [Validators.required] }),
    dataLimiteOrcamento: new FormControl( '', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.projects = [];
    this.projectService.getAllProjectForUser()
      .subscribe({
        next: (data: any) => {
          this.projects = data
        },
        error: (err) => {
        }
      });
  }

  handleModal() {
    this.showModal = !this.showModal;
  }

  onModalCloseHandler(event: boolean) {
    this.showModal = event;
  }


  protected onFormSubmitHandler = () => {
    this.submited = true;
    this.serverMessages = []

    if(this.projectForm.invalid) return

    // const dadosProjeto : ProjetoModelDTO = {
    //   nome: this.projectForm.controls?.nomeProjeto?.value,
    //   nomeCliente: this.projectForm.controls?.nomeCliente?.value,
    //   dataLimiteOrcamento: this.projectForm.controls?.dataLimiteOrcamento?.value,
    //   arquivo: null,
    // }
    // this.projectService.saveNewProject(dadosProjeto)
    //   .subscribe({
    //     next: (data: any) => {
    //       this.tipoAlerta = AlertType.Success
    //       this.serverMessages.push('sucess')
    //       this.isLoading = false;
    //       this.handleModal()
    //       window.location.reload()
    //     },
    //     error: (err) => {
    //       this.tipoAlerta = AlertType.Danger
    //       this.serverMessages.push(err.error)
    //       this.isLoading = false;
    //     }
    //   });
  };

  handleView(){
    console.log('view')
  }

  handleEdit(){
    console.log('Edit')
  }

  handleRemove(){
    console.log('Remove')
  }
  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };
}
