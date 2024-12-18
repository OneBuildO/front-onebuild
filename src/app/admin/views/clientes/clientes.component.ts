import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {pageTransition} from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app/shared/components/modal/modal.component";
import {DatatableClientesComponent} from "./datatableClientes/datatable-clientes.component";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpinnerComponent} from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {ClienteService} from "src/app/_core/services/cliente.service";
import {ModalRemoveComponent} from "src/app/shared/components/modalRemove/modalRemove.component";
import {SharedService} from "src/app/_core/services/shared.service";
import {ToastrService} from "ngx-toastr";
import {EMensagemAviso} from "src/app/_core/enums/e-mensagem-aviso";
import {CidadesService, listaEstados} from "src/app/_core/services/cidades.service";
import {ERROR_MESSAGES} from "src/app/shared/components/validation-error/error-messages";
Chart.register(...registerables);

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  standalone: true,
  imports: [
    ModalComponent,
    DatatableClientesComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    ModalRemoveComponent,
    CommonModule
  ],
  animations: [pageTransition]
})
export class ClientesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private serviceCliente: ClienteService,
    private servicesetShared: SharedService,
    private toastr: ToastrService,
    private serviceLocalidade: CidadesService,
  ) {
    this.modalCompnent = new ModalComponent();
  }

  public listaClientes: ClienteResumoDTO[] = []
  public listaCidades: any[] = [];
  showModalAdd: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent
  isEmailValidado : boolean = true;

  clienteForm = this.formBuilder.group({
    id: new FormControl(0,),
    nome: new FormControl('', {validators: [Validators.required]}),
    projeto: new FormControl('', {validators: [Validators.required]}),
    contato: new FormControl('',),  // Contato é opcional, sem Validators.required
    estado: new FormControl('', {validators: [Validators.required]}),
    cidade: new FormControl('', {validators: [Validators.required]}),
  });

  successMessage: string | null = null;
  

  ngOnInit(): void {
    this.isEmailValidado = this.servicesetShared.getUserSharedData().emailValidado
    const urlParams = new URL(window.location.href);
    const isAddCliente = Boolean(urlParams.searchParams.get("addCliente"));

    if(isAddCliente){
      this.handleModal()
    }

    this.serviceCliente.getAllForUser()
      .subscribe({
        next: (data: any) => {
          this.listaClientes = data
        }
      });

    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      this.successMessage = successMessage;
      localStorage.removeItem('successMessage');

      setTimeout(() => {
        this.successMessage = null;
      }, 20000);
    }
  }

  handleModal() {
    if(!this.showModalAdd && !this.isEmailValidado){
      this.toastr.error(EMensagemAviso.EMAIL_NAO_VALIDADO, EMensagemAviso.ATENCAO);
      return
    }

    if(!this.showModalAdd && this.clienteForm.controls.nome){
      this.popularClienteForm();
    }
    this.showModalAdd = !this.showModalAdd;
  }

  popularClienteForm(cliente?: ClienteResumoDTO) {
    if(cliente) {
      // Garantir que os valores não são null
      const estado = cliente.estado || '';
      const cidade = cliente.cidade || '';
  
      this.clienteForm.setValue({
        id: cliente.id,
        nome: cliente.nome,
        projeto: cliente.projeto,
        contato: cliente.contato,
        estado: estado,
        cidade: cidade
      });
  
      // Atualizar a lista de cidades com base no estado atual
      this.obterCidadePorEstado(estado);
    } else {
      this.clienteForm.reset({
        id: 0,
        nome: '',
        projeto: '',
        contato: '',
        estado: '',
        cidade: ''
      });
  
      this.listaCidades = []; // Limpar a lista de cidades
    }
  }

  closeSuccessMessage(): void {
    this.successMessage = null;
  }
  
  onModalCloseHandler(event: boolean) {
    this.showModalAdd = event;
  }

  onDeleteClientHandler(event: ClienteResumoDTO) {
    this.serviceCliente.deleteClient(event)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('successMessage', `Cliente ${event.nome} removido com sucesso!`); 
          window.location.reload()
        }
      });
  }

  onEditClientHandler(clienteEdit: ClienteResumoDTO) {
    this.showModalAdd = true;
    this.popularClienteForm(clienteEdit);
  }

  protected onFormSubmitHandler = () => {
    this.submited = true;
    this.serverMessages = []

    if (this.clienteForm.invalid) return

    const cadastroCliente: ClienteResumoDTO = {
      id: this.clienteForm.controls?.id?.value,
      idUsuario: this.servicesetShared.getUserSharedData().id,
      nome: this.clienteForm.controls?.nome?.value,
      projeto: this.clienteForm.controls?.projeto?.value,
      contato: this.clienteForm.controls?.contato?.value,
      estado: this.clienteForm.controls?.estado?.value,
      cidade: this.clienteForm.controls?.cidade?.value,
      token: null,
    }

    if (cadastroCliente.id && cadastroCliente.id != 0) {
      this.serviceCliente.editClient(cadastroCliente)
        .subscribe({
          next: (data: any) => {
            this.isLoading = false;
            this.handleModal()
            localStorage.setItem('successMessage', `Cliente ${cadastroCliente.nome} editado com sucesso!`);
            window.location.reload();
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
          }
        });
    } else {
      this.serviceCliente.saveNewClient(cadastroCliente)
        .subscribe({
          next: (data: any) => {
            this.tipoAlerta = AlertType.Success
            this.isLoading = false;
            this.handleModal()
            localStorage.setItem('successMessage', `Cliente ${cadastroCliente.nome} salvo com sucesso!`);
            window.location.reload();
          },
          error: (err) => {
            this.tipoAlerta = AlertType.Danger
            this.serverMessages.push(err.error)
            this.isLoading = false;
          }
        });
    }
  };

  onEstadoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const estadoSigla = selectElement.value;
    this.obterCidadePorEstado(estadoSigla);
  }

  obterCidadePorEstado(estadoSigla: string) {
    if (estadoSigla) {
      this.serviceLocalidade.getCidadesByEstado(estadoSigla).subscribe(data => {
        this.listaCidades = data;
      });
    } else {
      this.listaCidades = [];
    }
  }
  
  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  protected readonly listaEstados = listaEstados;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
}
