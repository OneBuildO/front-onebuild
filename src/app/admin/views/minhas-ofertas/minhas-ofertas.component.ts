import { Component, OnInit } from '@angular/core';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { CommonModule, NgClass, NgIf } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-minhas-ofertas',
  standalone: true,
  imports: [
    ModalComponent,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './minhas-ofertas.component.html',
  styleUrl: './minhas-ofertas.component.css',
  animations: [pageTransition]
})
export class MinhasOfertasComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.modalComponent = new ModalComponent();
    this.ofertaForm = this.formBuilder.group({
      nomeproduto: [''],
      descricao: [''],
      contato: [''],
      valor: [0],
      porcentagem: [0]
    });
  }

  ofertaForm: FormGroup;
  showModalAdd: boolean = false;
  isLoading: boolean = false;
  modalComponent: ModalComponent;
  resultado: number = 0;

  ngOnInit(): void {
    this.ofertaForm.valueChanges.subscribe(() => {
      this.calculateDiscount();
    });
  }

  handleModal() {
    this.showModalAdd = !this.showModalAdd;
  }

  onModalCloseHandler(event: boolean) {
    this.showModalAdd = event;
  }

  calculateDiscount(): void {
    const valor = this.ofertaForm.get('valor')?.value || 0;
    const porcentagem = this.ofertaForm.get('porcentagem')?.value || 0;
    this.resultado = valor - (valor * (porcentagem / 100));
  }

}
