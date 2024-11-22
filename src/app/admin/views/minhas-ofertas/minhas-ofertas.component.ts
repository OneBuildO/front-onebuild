import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import { CommonModule, NgClass, NgIf } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MinhasOfertasDTO } from "src/app/_core/models/oferta.model";
import { OfertaService } from "src/app/_core/services/oferta.service";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {ERROR_MESSAGES} from "src/app/shared/components/validation-error/error-messages";
import {EMensagemAviso} from "src/app/_core/enums/e-mensagem-aviso";

@Component({
  selector: 'app-minhas-ofertas',
  standalone: true,
  imports: [
    ModalComponent,
    SpinnerComponent,
    CommonModule,
    AlertComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './minhas-ofertas.component.html',
  styleUrl: './minhas-ofertas.component.css',
  animations: [pageTransition]
})
export class MinhasOfertasComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private ofertaService: OfertaService,
    private cdr: ChangeDetectorRef,
  ) {
    this.modalComponent = new ModalComponent();
    this.ofertaForm = this.formBuilder.group({
      id: [''],
      titulo: [''],
      descricao: [''],
      instagram: [''],
      valor: [''],
      valorOriginal: [''],
      porcentagemDesconto: [''],
      dataLimitePromocao: ['']
    });
  }

  public minhasOfertas: MinhasOfertasDTO[] = []

  ofertaForm: FormGroup;
  showModalAdd: boolean = false;
  isLoading: boolean = false;
  modalComponent: ModalComponent;
  submited: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;

  selectedImage: string='';
  uploadedImage: string='';
  fotoPreviews: { [key: string]: string | ArrayBuffer | null } = {};

  fotoProd: File | null = null;
  arquivosPromocao: File[] = [];
  idPromocao: number | null = null;

  valor: number = 0; // Valor inicial
  porcentagem: number = 0; // Desconto inicial
  resultado: number = 0; // Resultado do cálculo

  ngOnInit(): void {
    this.ofertaForm.valueChanges.subscribe(() => {
      this.calculateDiscount();
    });
  }

  protected onFormSubmitHandler = () => {
    this.submited = true;
    this.serverMessages = [];

    if (this.ofertaForm.invalid) return;

    const cadastroOferta: MinhasOfertasDTO = {
      id: this.ofertaForm.controls['id'].value,
      titulo: this.ofertaForm.controls['titulo'].value,
      descricao: this.ofertaForm.controls['descricao'].value,
      instagram: this.ofertaForm.controls['instagram'].value,
      valor: this.ofertaForm.controls['valor'].value,
      valorOriginal: this.ofertaForm.controls['valorOriginal'].value,
      porcentagemDesconto: this.ofertaForm.controls['porcentagemDesconto'].value,
      base64Data: this.fotoPreviews['fotoProd'] as string,
      dataLimitePromocao: this.ofertaForm.controls['dataLimitePromocao'].value
    };

    this.isLoading = true;

    if (cadastroOferta.id && cadastroOferta.id != 0) {
      console.log('Editando oferta existente...');
      this.ofertaService.editOferta(cadastroOferta).subscribe({
        next: (data: any) => {
          console.log('Resposta da edição:', data);
          this.isLoading = false;
          this.handleModal();
          localStorage.setItem('successMessage', `Oferta ${cadastroOferta.titulo} editada com sucesso!`);
          window.location.reload();
        },
        error: (err: any) => {
          console.error('Erro na edição:', err);
          this.tipoAlerta = AlertType.Danger;
          this.serverMessages.push(err.error);
          this.isLoading = false;
        }
      });
    } else {
      console.log('Salvando nova oferta...');
      this.ofertaService.saveNewOferta(cadastroOferta, this.arquivosPromocao, this.idPromocao).subscribe({
        next: (data: any) => {
          console.log('Resposta do salvamento:', data);
          this.tipoAlerta = AlertType.Success;
          this.isLoading = false;
          this.handleModal();
          localStorage.setItem('successMessage', `Oferta ${cadastroOferta.titulo} salva com sucesso!`);
          window.location.reload();
        },
        error: (err: any) => {
          console.error('Erro no salvamento:', err);
          this.tipoAlerta = AlertType.Danger;
          this.serverMessages.push(err.error);
          this.isLoading = false;
        }
      });
    }
  };

  handleModal() {
    this.showModalAdd = !this.showModalAdd;
  }

  onModalCloseHandler(event: boolean) {
    this.showModalAdd = event;
  }

  calculateDiscount(): void {
    if (this.valor > 0 && this.porcentagem >= 0 && this.porcentagem <= 100) {
      this.resultado = this.valor - (this.valor * (this.porcentagem / 100));
    } else {
      this.resultado = 0;
    }
  }
  
  

  onDrop(event: DragEvent, field: string) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreviews[field] = reader.result;
        console.debug(`Imagem arrastada para o campo ${field}.`);
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelectedImage(event: any, alternativaIndex: string) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreviews[alternativaIndex] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      switch (field) {
        case 'fotoProd':
          this.fotoProd = file;
          break;
        default:
          break;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreviews[field] = reader.result;
        console.log(`Arquivo carregado para o campo ${field}.`);
      };
      reader.readAsDataURL(file);
    }
  }

  isImage(file: any): boolean {
    return file && file.startsWith('data:image/');
  }

  handleImageChange(event: any, index: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
