import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {ClienteService} from "src/app/_core/services/cliente.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-select-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './select-cliente.component.html',
  styleUrls: ['./select-cliente.component.css']
})
export class SelectClienteComponent implements OnInit{
  @Output() onClientIdEmitter = new EventEmitter<number>();
  @Output() onClientDataEmitter = new EventEmitter<ClienteResumoDTO>();

  listaClientes: ClienteResumoDTO[] = []
  urlParams = new URL(window.location.href);
  clienteSelected = Number(this.urlParams.searchParams.get("cliente"));
  isLoading : boolean = true;

  constructor(
    private clienteService : ClienteService,
    private formBuilder: FormBuilder,
  ) {}

  clienteSelecionadoForm = this.formBuilder.group({
    id: new FormControl( this.clienteSelected ? this.clienteSelected : 0),
  });

  ngOnInit() {
    this.clienteService.getAllForUser()
      .subscribe({
        next: (data: any) => {
          this.listaClientes = data;
          this.isLoading = false;
  
          const clienteSelectElement = document.querySelector('select') as HTMLSelectElement;
  
          this.onClienteChange(clienteSelectElement);
        },
        error: (err) => {
          // Lide com erros se necessário
        }
      });
  }
  

  onClienteChange(clienteSelect: HTMLSelectElement) {
    const idSelecionado = Number(this.clienteSelecionadoForm.value.id);
    const clienteEncontrado = this.listaClientes.find(clie => clie.id === idSelecionado);
  
    this.onClientIdEmitter.emit(idSelecionado);
    this.onClientDataEmitter.emit(clienteEncontrado);
  
    // Remover o foco do select após a seleção
    clienteSelect.blur();
  }  
  
}
