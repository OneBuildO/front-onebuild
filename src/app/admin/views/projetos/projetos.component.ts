import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {pageTransition} from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app/shared/components/modal/modal.component";
import {DataTableComponent} from "src/app/shared/components/data-table/data-table.component";
import {IColumn, IProjects, TableData} from "../elements/data-table/table.data";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpinnerComponent} from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {ProjetoService} from "src/app/_core/services/projeto.service";
import {ProjetoResumoDTO} from "src/app/_core/models/projeto.model";
import {SelectClienteComponent} from "src/app/shared/components/select-cliente/select-cliente.component";
import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {DatatableProjetosComponent} from "./datatableProjetos/datatable-projetos.component";
import {EVisibilidadeProjeto} from "src/app/_core/enums/e-visibilidade-projeto";
import {ValidationErrorComponent} from "src/app/shared/components/validation-error/validation-error.component";
import {ERROR_MESSAGES} from "src/app/shared/components/validation-error/error-messages";
import {ModalRemoveComponent} from "src/app/shared/components/modalRemove/modalRemove.component";
import {CidadesService, listaEstados} from "src/app/_core/services/cidades.service";
import {ToastrService} from "ngx-toastr";
import {EMensagemAviso} from "src/app/_core/enums/e-mensagem-aviso";
import {FilesService} from "src/app/_core/services/files.service";

Chart.register(...registerables);

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css'],
  standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    SelectClienteComponent,
    DatatableProjetosComponent,
    NgForOf,
    ValidationErrorComponent,
    ModalRemoveComponent
  ],
  animations: [pageTransition]
})
export class ProjetosComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private serviceProject: ProjetoService,
    private cidadesService: CidadesService,
    private toastr: ToastrService,
    private serviceFile: FilesService,
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdCliente = Number(this.urlParams.searchParams.get("cliente"));

  public projects: IProjects[] = TableData.projects;
  public pages: number[] = TableData.pageNumber;
  public columnData: IColumn[] = TableData.columnData;

  idClienteSelecionado: number = this.paramIdCliente ? this.paramIdCliente : 0
  clienteSelecionado?: ClienteResumoDTO;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  isLoadingFile: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent
  arquivosProjeto : File[]  = []
  CategoriaProjetoArr = [];

  projectForm = this.formBuilder.group({
    id: new FormControl(0, {validators: [Validators.required]}),
    arquivo: new FormControl('',),
    categoria: new FormControl('', {validators: [Validators.required]}),
    estado: new FormControl('', ),
    cidade: new FormControl('', ),
    dataLimiteOrcamento: new FormControl('', {validators: [Validators.required]}),
    observacoes: new FormControl('',),
    visibilidade: new FormControl(EVisibilidadeProjeto.PUBLICO,),
  });

  ngOnInit(): void {
    this.projects = [];
    this.getDataProject();
    if(this.idClienteSelecionado && this.idClienteSelecionado !== 0){
      this.serviceProject.getCategoriesAvailableForClien(this.idClienteSelecionado)
        .subscribe({
          next: (data: any) => {
            this.CategoriaProjetoArr = data
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
          }
        });
    }
  }

  getDataProject() {
    this.serviceProject.getAllProjectForClient(this.idClienteSelecionado)
      .subscribe({
        next: (data: any) => {
          this.projects = data
        },
        error: (err) => {
        }
      });
  }

  handleFilesProject(event : any){
    const file = event.target.files[0];
    const tiposPermitidos = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

    if(tiposPermitidos.includes(file.type)){
      const tamanhoMaximoMB = 10;
      const tamanhoMaximoBytes = tamanhoMaximoMB * 1024 * 1024;

      if(file.size <= tamanhoMaximoBytes){
        this.arquivosProjeto.push(event.target.files[0])
      }else{
        this.toastr.error(EMensagemAviso.TAMANHO_ARQUIVO_NAO_VALIDADO, EMensagemAviso.ATENCAO);
      }
    }else{
      this.toastr.error(EMensagemAviso.TIPO_ARQUIVO_NAO_VALIDADO, EMensagemAviso.ATENCAO);
    }
  }

  handleRemoveFile(name : string){
    this.arquivosProjeto = this.arquivosProjeto.filter(arquivo => arquivo.name !== name);
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

    if (this.projectForm.invalid) return
    if(this.arquivosProjeto.length === 0){
      this.toastr.error(EMensagemAviso.SEM_ARQUIVO_SELECIONADO, EMensagemAviso.ATENCAO);
      return;
    }
    const cadastroProjeto: ProjetoResumoDTO = {
      id: this.projectForm.controls?.id?.value,
      idCliente: this.idClienteSelecionado,
      observacoes: this.projectForm.controls?.observacoes?.value,
      categoria: this.projectForm.controls?.categoria?.value,
      dataLimiteOrcamento: this.projectForm.controls?.dataLimiteOrcamento?.value,
      publico: this.projectForm.controls?.visibilidade?.value === EVisibilidadeProjeto.PUBLICO,
    }

    this.isLoadingFile = true;

    if (cadastroProjeto.id && cadastroProjeto.id != 0) {
      this.serviceProject.editProject(cadastroProjeto)
        .subscribe({
          next: (data: any) => {
            window.location.reload()
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
            this.isLoadingFile = false;
          }
        });
    } else {
      this.serviceProject.saveNewProject(cadastroProjeto)
        .subscribe({
          next: (data: any) => {
            this.serviceFile.saveFileInAwsS3(this.arquivosProjeto, data)
              .subscribe({
                next: (data: any) => {
                  console.log('data', data)
                  // window.location.reload()
                },
                error: (err) => {
                  this.tipoAlerta = AlertType.Danger
                  this.serverMessages.push(err.error)
                  this.isLoading = false;
                }
              });
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
            this.isLoadingFile = false;
          }
        });
    }
  };

  onEditProjectHandler(projectEdit: ProjetoResumoDTO) {
    const visibilidade = projectEdit.publico ? EVisibilidadeProjeto.PUBLICO : EVisibilidadeProjeto.PRIVADO
    let dataFormatada = projectEdit.dataLimiteOrcamento

    if(projectEdit.dataLimiteOrcamento){
      const parts = projectEdit.dataLimiteOrcamento.split('T');
      dataFormatada = parts[0];
    }

    this.projectForm = this.formBuilder.group({
      id: new FormControl(projectEdit.id,),
      arquivo: new FormControl('',),
      observacoes: new FormControl(projectEdit.observacoes,),
      categoria: new FormControl(projectEdit.categoria, {validators: [Validators.required]}),
      estado: new FormControl(projectEdit.categoria, {validators: [Validators.required]}),
      cidade: new FormControl(projectEdit.categoria, {validators: [Validators.required]}),
      dataLimiteOrcamento: new FormControl(dataFormatada, {validators: [Validators.required]}),
      visibilidade: new FormControl(visibilidade),
    });

    this.showModal = true;
  }

  handleRemoveProject(project: ProjetoResumoDTO) {
    this.serviceProject.deleteProject(project)
      .subscribe({
        next: (data: any) => {
          window.location.reload()
        },
        error: (err) => {
        }
      });
  }

  onClientIdHandler(event: number) {
    this.idClienteSelecionado = event;
    this.getDataProject();
  }

  onClienteSelectedHandler(event: ClienteResumoDTO) {
    this.clienteSelecionado = event;
    if(this.clienteSelecionado && this.clienteSelecionado.id){
      this.serviceProject.getCategoriesAvailableForClien(this.clienteSelecionado.id)
        .subscribe({
          next: (data: any) => {
            this.CategoriaProjetoArr = data
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
          }
        });
    }
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  redirecionarParaClientes(){
    window.location.href = '/admin/clientes?addCliente=true'
  }

  protected readonly EVisibilidadeProjeto = EVisibilidadeProjeto;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
}
