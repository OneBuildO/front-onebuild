import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {pageTransition} from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app/shared/components/modal/modal.component";
import {DataTableComponent} from "src/app/shared/components/data-table/data-table.component";
import {IColumn, IProjects, TableData} from "../elements/data-table/table.data";
import { CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import { MatIcon } from '@angular/material/icon';
import { EStatusProjeto } from "src/app/_core/enums/e-status-projeto";

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
    ModalRemoveComponent,
    MatIcon,
    CommonModule,
  ],
  animations: [pageTransition],
})
export class ProjetosComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private serviceProject: ProjetoService,
    private serviceLocalidade: CidadesService,
    private toastr: ToastrService,
    private serviceFile: FilesService
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdCliente = Number(this.urlParams.searchParams.get('cliente'));

  public projects: IProjects[] = TableData.projects;
  public pages: number[] = TableData.pageNumber;
  public columnData: IColumn[] = TableData.columnData;
  public listaCidades: any[] = [];

  idClienteSelecionado: number = this.paramIdCliente ? this.paramIdCliente : 0;
  clienteSelecionado?: ClienteResumoDTO;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  isLoadingFile: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent;
  arquivosProjeto: File[] = [];
  CategoriaProjetoArr = [];

  EStatusProjeto = EStatusProjeto; // Adicione o enum ao contexto do componente
  statusProjetoArr: string[] = [];
  successMessage: string | null = null;

  plantaBaixa: File[] = [];
  // projetoForm: FormGroup;

  latitude: number | null = null;
  longitude: number | null = null;

  projectForm = this.formBuilder.group({
    id: new FormControl(0, { validators: [Validators.required] }),
    arquivo: [''],
    plantaBaixa: [''],
    observacoes: new FormControl(''),
    categoria: new FormControl('', { validators: [Validators.required] }),
    estado: new FormControl(''),
    cidade: new FormControl(''),
    dataLimiteOrcamento: new FormControl('', {
      validators: [Validators.required],
    }),
    visibilidade: new FormControl(EVisibilidadeProjeto.PUBLICO),
    endereco: new FormControl(''),
    status: new FormControl(EStatusProjeto.NOVO_PROJETO, {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.statusProjetoArr = Object.values(EStatusProjeto);
    this.projects = [];
    this.getDataProject();
    if (this.idClienteSelecionado && this.idClienteSelecionado !== 0) {
      this.serviceProject
        .getCategoriesAvailableForClien(this.idClienteSelecionado)
        .subscribe({
          next: (data: any) => {
            this.CategoriaProjetoArr = data;
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger;
            this.serverMessages.push(err.error);
            this.isLoading = false;
          },
        });
    }

    // Recupera o ID do cliente selecionado do localStorage
    const storedClientId = localStorage.getItem('selectedClientId');
    if (storedClientId) {
      this.idClienteSelecionado = parseInt(storedClientId, 10);
      this.getDataProject();
      localStorage.removeItem('selectedClientId'); // Remove o ID do cliente do localStorage após recuperar
    }

    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      this.successMessage = successMessage;
      localStorage.removeItem('successMessage');

      setTimeout(() => {
        this.successMessage = null;
      }, 20000);
    }
  }

  getDataProject() {
    this.serviceProject
      .getAllProjectForClient(this.idClienteSelecionado)
      .subscribe({
        next: (data: any) => {
          this.projects = data;
        },
        error: (err) => {},
      });
  }

  handleFilesProject(event: any, tipo: string) {
    const file = event.target.files[0];
    const tiposPermitidos = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];

    if (tiposPermitidos.includes(file.type)) {
      const tamanhoMaximoMB = 10;
      const tamanhoMaximoBytes = tamanhoMaximoMB * 1024 * 1024;

      if (file.size <= tamanhoMaximoBytes) {
        // Verifica o tipo e adiciona ao array correspondente
        if (tipo === 'arquivosProjeto') {
          this.arquivosProjeto.push(file);
        } else if (tipo === 'plantaBaixa') {
          this.plantaBaixa.push(file);
        }
      } else {
        this.toastr.error(
          EMensagemAviso.TAMANHO_ARQUIVO_NAO_VALIDADO,
          EMensagemAviso.ATENCAO
        );
      }
    } else {
      this.toastr.error(
        EMensagemAviso.TIPO_ARQUIVO_NAO_VALIDADO,
        EMensagemAviso.ATENCAO
      );
    }
  }

  handleRemoveFile(fileName: string, tipo: string) {
    if (tipo === 'arquivosProjeto') {
      this.arquivosProjeto = this.arquivosProjeto.filter(
        (file) => file.name !== fileName
      );
    } else if (tipo === 'plantaBaixa') {
      this.plantaBaixa = this.plantaBaixa.filter(
        (file) => file.name !== fileName
      );
    }
  }

  handleModal() {
    this.showModal = !this.showModal;
  }

  onCancelEdit() {
    this.resetForm();
    this.showModal = false;
  }

  onModalCloseHandler(event: boolean) {
    this.showModal = event;
  }

  protected onFormSubmitHandler = () => {
    this.submited = true;
    this.serverMessages = [];

    if (this.projectForm.invalid) return;
    // if(this.arquivosProjeto.length === 0){
    //   this.toastr.error(EMensagemAviso.SEM_ARQUIVO_SELECIONADO, EMensagemAviso.ATENCAO);
    //   return;
    // }
    const cadastroProjeto: ProjetoResumoDTO = {
      id: this.projectForm.controls?.id?.value,
      idCliente: this.idClienteSelecionado,
      observacoes: this.projectForm.controls?.observacoes?.value,
      categoria: this.projectForm.controls?.categoria?.value,
      dataLimiteOrcamento:
        this.projectForm.controls?.dataLimiteOrcamento?.value,
      endereco: this.projectForm.controls?.endereco?.value,
      publico:
        this.projectForm.controls?.visibilidade?.value ===
        EVisibilidadeProjeto.PUBLICO,
      status:
        this.projectForm.controls?.status?.value ?? EStatusProjeto.NOVO_PROJETO,
      cidade: this.projectForm.controls?.cidade?.value,
      estado: this.projectForm.controls?.estado?.value,
      cidadeId: null,
      longitude: this.longitude,
      latitude: this.latitude,
    };

    console.log('Cadastro Projeto:', cadastroProjeto);

    this.isLoadingFile = true;
    const cidade = cadastroProjeto.cidade || ' ';
    const estado = cadastroProjeto.estado || '';

    if (cadastroProjeto.id && cadastroProjeto.id != 0) {
      this.serviceProject.getCoordinates(cidade, estado).subscribe({
        next: (coordinates) => {
          cadastroProjeto.latitude = coordinates.latitude;
          cadastroProjeto.longitude = coordinates.longitude;
          console.log(
            `Latitude: ${cadastroProjeto.latitude}, Longitude: ${cadastroProjeto.longitude}`
          );

          this.serviceProject.editProject(cadastroProjeto).subscribe({
            next: (data: any) => {
              window.location.reload();
            },
            error: (err) => {
              this.tipoAlerta = AlertType.Danger;
              this.serverMessages.push(err.error);
              this.isLoading = false;
              this.isLoadingFile = false;
            },
          });
        },
        error: (error) => {
          console.error('Erro ao buscar coordenadas:', error);
          this.serverMessages.push('Erro ao obter as coordenadas da cidade.');
        },
      });
    } else {
      this.serviceProject.getCoordinates(cidade, estado).subscribe({
        next: (coordinates) => {
          cadastroProjeto.latitude = coordinates.latitude;
          cadastroProjeto.longitude = coordinates.longitude;
          console.log(
            `Latitude: ${cadastroProjeto.latitude}, Longitude: ${cadastroProjeto.longitude}`
          );

          this.serviceProject.saveNewProject(cadastroProjeto).subscribe({
            next: (data: any) => {
              this.serviceFile
                .saveFileInAwsS3(this.arquivosProjeto, data)
                .subscribe({
                  next: (data: any) => {
                    console.log('Arquivos salvos com sucesso:', data);
                  },
                  error: (err) => {
                    this.tipoAlerta = AlertType.Danger;
                    this.serverMessages.push(err.error);
                    this.isLoading = false;
                  },
                });
            },
            error: (err) => {
              this.tipoAlerta = AlertType.Danger;
              this.serverMessages.push(err.error);
              this.isLoading = false;
              this.isLoadingFile = false;
            },
          });
        },
        error: (error) => {
          console.error('Erro ao buscar coordenadas:', error);
          this.serverMessages.push('Erro ao obter as coordenadas da cidade.');
        },
      });
    }
  };

  resetForm() {
    this.projectForm.reset({
      arquivo: '',
      plantaBaixa: '',
      observacoes: '',
      categoria: '',
      estado: '',
      cidade: '',
      dataLimiteOrcamento: '',
      endereco: '',
      status: EStatusProjeto.NOVO_PROJETO,
      visibilidade: EVisibilidadeProjeto.PUBLICO,
    });
  }

  onEditProjectHandler(projectEdit: ProjetoResumoDTO) {
    const visibilidade = projectEdit.publico
      ? EVisibilidadeProjeto.PUBLICO
      : EVisibilidadeProjeto.PRIVADO;
    const status = projectEdit.status ?? EStatusProjeto.NOVO_PROJETO;
    let dataFormatada = projectEdit.dataLimiteOrcamento;

    if (projectEdit.dataLimiteOrcamento) {
      const parts = projectEdit.dataLimiteOrcamento.split('T');
      dataFormatada = parts[0];
    }

    this.projectForm = this.formBuilder.group({
      id: new FormControl(projectEdit.id),
      arquivo: new FormControl(''),
      plantaBaixa: new FormControl(''),
      observacoes: new FormControl(projectEdit.observacoes),
      categoria: new FormControl(projectEdit.categoria, {
        validators: [Validators.required],
      }),
      estado: new FormControl(projectEdit.estado, {
        validators: [Validators.required],
      }),
      cidade: new FormControl(projectEdit.cidade, {
        validators: [Validators.required],
      }),
      dataLimiteOrcamento: new FormControl(dataFormatada, {
        validators: [Validators.required],
      }),
      visibilidade: new FormControl(visibilidade),
      endereco: new FormControl(projectEdit.endereco),
      status: new FormControl(EStatusProjeto.NOVO_PROJETO),
    });

    this.showModal = true;
  }

  handleRemoveProject(project: ProjetoResumoDTO) {
    this.serviceProject.deleteProject(project).subscribe({
      next: (data: any) => {
        // Verifica se há um cliente selecionado e mantém o ID no localStorage
        if (this.idClienteSelecionado !== null) {
          localStorage.setItem('selectedClientId', this.idClienteSelecionado.toString());
        }
        // Atualiza a tabela de projetos sem recarregar a página
        this.getDataProject();
        this.successMessage = `Projeto ${project.categoria} removido com sucesso!`;
      },
      error: (err) => {
        this.tipoAlerta = AlertType.Danger;
        this.serverMessages.push(err.error);
        this.isLoading = false;
      },
    });
  }

  onClientIdHandler(event: number) {
    this.idClienteSelecionado = event;
    this.getDataProject();
  }

  onClienteSelectedHandler(event: ClienteResumoDTO) {
    this.clienteSelecionado = event;
    if (this.clienteSelecionado && this.clienteSelecionado.id) {
      this.serviceProject
        .getCategoriesAvailableForClien(this.clienteSelecionado.id)
        .subscribe({
          next: (data: any) => {
            this.CategoriaProjetoArr = data;
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger;
            this.serverMessages.push(err.error);
            this.isLoading = false;
          },
        });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent, tipo: string) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files, tipo);
    }
  }

  processFiles(files: FileList, tipo: string) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (tipo === 'plantaBaixa') {
        // Adiciona o arquivo ao array plantaBaixa, se ele não existir ainda
        if (!this.plantaBaixa.some((f) => f.name === file.name)) {
          this.plantaBaixa.push(file);
        }
      } else {
        // Adiciona ao array arquivosProjeto, se ele não existir ainda
        if (!this.arquivosProjeto.some((f) => f.name === file.name)) {
          this.arquivosProjeto.push(file);
        }
      }
    }
  }

  onEstadoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const estadoNome = selectElement.value;
    this.obterCidadePorNomeEstado(estadoNome);
  }

  obterCidadePorNomeEstado(estadoNome: string) {
    if (estadoNome) {
      this.serviceLocalidade.getCidadesByNomeEstado(estadoNome).subscribe(
        (data) => {
          this.listaCidades = data;
        },
        (error) => {
          this.listaCidades = [];
        }
      );
    } else {
      this.listaCidades = [];
    }
  }

  closeSuccessMessage(): void {
    this.successMessage = null;
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  redirecionarParaClientes() {
    window.location.href = '/admin/clientes?addCliente=true';
  }

  protected readonly EVisibilidadeProjeto = EVisibilidadeProjeto;
  protected readonly listaEstados = listaEstados;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
}