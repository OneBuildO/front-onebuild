import { NgClass, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {ModalRemoveComponent} from "src/app/shared/components/modalRemove/modalRemove.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import {onRedrectForWhatsApp, redirectProjectoClient} from "src/app/shared/utils/Utils";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'datatable-clientes',
  standalone: true,
  imports: [NgClass, NgIf, ModalRemoveComponent, AlertComponent, MatIconModule],
  templateUrl: './datatable-clientes.component.html',
  styleUrl: './datatable-clientes.component.css',
})
export class DatatableClientesComponent {
  @Input() listaClientes: ClienteResumoDTO[] = [];
  @Input() titleTable? : string = ''
  @Output() showModal = new EventEmitter<boolean>();

  @Output() onDeleteClientEmitter = new EventEmitter<ClienteResumoDTO>();
  @Output() onEditClientEmitter = new EventEmitter<ClienteResumoDTO>();
  showModalConfirmRemove: boolean = false;
  clienteSelected! : ClienteResumoDTO;
  isShowAlertCopy : boolean = false;

  onEditClient(client? : ClienteResumoDTO){
    this.onEditClientEmitter.emit(client)
  }

  handleShowRemoveModal(client? : ClienteResumoDTO){
    if(client) this.clienteSelected = client;
    this.showModalConfirmRemove = !this.showModalConfirmRemove;
  }

  onConfirmRemoveClient(){
    this.onDeleteClientEmitter.emit(this.clienteSelected);
  }

  onCopyTextTransferArea(text: string | undefined): void {
    if(text) {
      navigator.clipboard.writeText(text)
      this.isShowAlertCopy = true;

      setTimeout(()=>{
        this.isShowAlertCopy = false
      }, 3000)
    }
  }

  protected readonly onRedrectForWhatsApp = onRedrectForWhatsApp;
  protected readonly redirectProjectoClient = redirectProjectoClient;
}
