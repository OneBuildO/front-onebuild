import { Component, OnInit } from '@angular/core';
import { pageTransition } from 'src/app/shared/utils/animations';
import { UsuarioService } from 'src/app/_core/services/usuario.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertType } from 'src/app/shared/components/alert/alert.type';
import { CadastroUsuarioDTO } from 'src/app/_core/models/cadastro.model';
import { ETipoUsuario } from 'src/app/_core/enums/e-tipo-usuario';
import {PublicRoutes} from "src/app/public/public.routes";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [pageTransition]
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;
  isLoading: boolean = false;
  submited: boolean = false;
  serverErrors: string[] = [];
  tipoAlerta = AlertType.Warning;
  tipoCadastro: ETipoUsuario = ETipoUsuario.ARQUITETO;

  initialFormValues: any;

  cadastroForm = this.formBuilder.group({
    nome: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    contato: new FormControl({ value: '', disabled: true }, Validators.required),
    cnpj: new FormControl({ value: '', disabled: true }),
    senha: new FormControl({ value: '', disabled: true }, Validators.required),
    confirmPassword: new FormControl({ value: '', disabled: true }, Validators.required)
  });

  constructor(
    private userService: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getUserLogged().subscribe({
      next: (data: any) => {
        this.cadastroForm.patchValue({
          nome: data.nome,
          email: data.email,
          contato: data.contato,
          cnpj: data.cnpj
        });
        this.tipoCadastro = data.tipoUsuario;
        this.initialFormValues = this.cadastroForm.getRawValue(); // Guardar valores iniciais
      },
      error: (err) => {
        console.error('Erro ao obter dados do usuário', err);
        // Handle error
      }
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.cadastroForm.enable(); // Habilitar todos os campos para edição
    this.cadastroForm.controls.senha.setValue(''); // Limpar campo senha
    this.cadastroForm.controls.confirmPassword.setValue(''); // Limpar campo confirmar senha
  }

  onCancel(): void {
    this.isEditing = false;
    this.serverErrors = []; // Limpar mensagens de erro
    this.cadastroForm.patchValue(this.initialFormValues); // Restaurar valores iniciais
    this.cadastroForm.disable(); // Desabilitar os campos
  }

  handleChange(): void {
    this.serverErrors = [];
    this.isSenhaValida();
  }

  isSenhaValida(): boolean {
    const senha = this.cadastroForm.controls.senha.value;
    const confirmPassword = this.cadastroForm.controls.confirmPassword.value;

    if (!senha || senha.length < 8) {
      this.serverErrors.push('Sua senha deve conter pelo menos 8 caracteres');
      this.scrollTop();
      return false;
    }

    if (confirmPassword && senha !== confirmPassword) {
      this.serverErrors.push('As senhas informadas não coincidem');
      this.scrollTop();
      return false;
    }

    return true;
  }

  onFormSubmitHandler(event: SubmitEvent): void {
    event.preventDefault();
    this.submited = true;
    this.serverErrors = [];

    if (this.cadastroForm.invalid || !this.isSenhaValida()) return;

    this.isLoading = true;

    const dadosCadastro: CadastroUsuarioDTO = {
      nome: this.cadastroForm.controls.nome.value,
      email: this.cadastroForm.controls.email.value,
      contato: this.cadastroForm.controls.contato.value,
      cnpj: this.cadastroForm.controls.cnpj.value,
      senha: this.cadastroForm.controls.senha.value,
      tipoUsuario: null,
      categoria: null,
      convite: null
    };

    this.userService.saveUser(dadosCadastro).subscribe({
      next: (data: any) => {
        this.tipoAlerta = AlertType.Success;
        this.serverErrors.push(data);
        this.isEditing = false; // Desabilitar edição após salvar
        this.initialFormValues = this.cadastroForm.getRawValue(); // Atualizar valores iniciais
        this.cadastroForm.disable(); // Desabilitar campos novamente
        this.isLoading = false;
      },
      error: (err) => {
        this.tipoAlerta = AlertType.Danger;
        this.serverErrors.push(err.error);
        this.isLoading = false;
      }
    });
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly ETipoUsuario = ETipoUsuario;
  protected readonly publicRoutes = PublicRoutes;
}