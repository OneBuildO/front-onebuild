import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatetimeHelper } from 'src/app/_core/helpers/datetime.helper';
import { CommonService } from 'src/app/_core/services/common.service';
import { pageTransition } from 'src/app/shared/utils/animations';
import { AlertType } from 'src/app/shared/components/alert/alert.type';
import { PublicRoutes } from '../../public.routes';
import { ETipoUsuario, TipoUsuarioArr } from "src/app/_core/enums/e-tipo-usuario";
import { CadastroUsuarioDTO } from "src/app/_core/models/cadastro.model";
import { UsuarioService } from "src/app/_core/services/usuario.service";
import { AuthService } from "src/app/_core/services/auth.service";
import { ERROR_MESSAGES } from "src/app/shared/components/validation-error/error-messages";
import { CategoriasProjetoArr } from "src/app/_core/enums/e-categorias-projeto";
import { EMessages } from "src/app/_core/enums/e-messages";

@Component({
  selector: 'app-signup',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [pageTransition]
})
export class CadastroComponent {
  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private serviceUser: UsuarioService,
  ) {}

  protected readonly AlertType = AlertType;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  isLoading: boolean = false;
  submited: boolean = false;

  serverErrors: string[] = [];
  tipoAlerta = AlertType.Warning;

  cadastroForm = this.formBuilder.group({
    nome: new FormControl('', { validators: [Validators.required] }),
    tipoUsuario: new FormControl('', { validators: [Validators.required] }),
    categoria: new FormControl(''), // Sem validação obrigatória inicialmente
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    contato: new FormControl('', { validators: [Validators.required] }),
    cnpj: new FormControl('', { validators: [Validators.required] }),
    senha: new FormControl('', { validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),
    terms: new FormControl(false, { validators: [Validators.requiredTrue] }) // Adicionando o campo de termos
  });

  urlParams = new URL(window.location.href);
  paramIdConvite = this.urlParams.searchParams.get("convite");

  ngOnInit() {
    this.cadastroForm.get('tipoUsuario')?.valueChanges.subscribe(value => {
      if (value === ETipoUsuario.FORNECEDOR) {
        this.cadastroForm.get('categoria')?.setValidators([Validators.required]);
      } else {
        this.cadastroForm.get('categoria')?.clearValidators();
      }
      this.cadastroForm.get('categoria')?.updateValueAndValidity();
    });
  }

  onFormSubmitHandler(event?: Event) {
    console.log("Formulário submetido!");

    if (event) {
      event.preventDefault();
    }

    this.submited = true;
    this.serverErrors = [];

    console.log('Formulário inválido:', this.cadastroForm.invalid);
    
    // Log detalhado de cada controle
    Object.keys(this.cadastroForm.controls).forEach(key => {
        const control = this.cadastroForm.get(key);
        console.log(`Controle: ${key} - Inválido: ${control?.invalid} - Erros:`, control?.errors);
    });

    if (this.cadastroForm.invalid) return;
    if (!this.isSenhaValida()) return;

    this.isLoading = true;

    console.log("Todos os dados do formulário estão válidos, preparando para envio...");

    const dadosCadastro: CadastroUsuarioDTO = {
      nome: this.cadastroForm.get('nome')?.value || '',
      tipoUsuario: this.cadastroForm.get('tipoUsuario')?.value || '',
      categoria: this.cadastroForm.get('categoria')?.value || '',
      email: this.cadastroForm.get('email')?.value || '',
      contato: this.cadastroForm.get('contato')?.value || '',
      cnpj: this.cadastroForm.get('cnpj')?.value || '',
      senha: this.cadastroForm.get('senha')?.value || '',
      convite: this.paramIdConvite || ''
    };

    console.log("Dados do cadastro preparados:", dadosCadastro);

    this.serviceUser.saveUser(dadosCadastro).subscribe({
      next: (data: any) => {
        console.log("Dados recebidos do backend:", data);
        this.authService.handleSetToken(data);
        window.location.href = `/validacao-email?email=${dadosCadastro.email}`;
      },
      error: (err) => {
        console.log("Erro ao tentar salvar o usuário:", err);

        this.tipoAlerta = AlertType.Danger;
        if (err.statusText === "Unknown Error") {
          this.serverErrors.push(EMessages.SERVER_ERROR);
        } else if (err.error && typeof err.error === 'string') {
          this.serverErrors.push(err.error);
        } else {
          this.serverErrors.push("Ocorreu um erro desconhecido. Por favor, tente novamente.");
        }
      
        this.isLoading = false;
        this.scrollTop();
      }
    });
  }

  handleChange(){
    this.serverErrors = [];
    this.isSenhaValida();
  }

  isSenhaValida() {
    const senha = this.cadastroForm.controls.senha.value;
    const confirmPassword = this.cadastroForm.controls.confirmPassword.value;

    console.log("Validando a senha...");

    if (!senha || senha?.length < 8) {
      console.log("Erro: Senha com menos de 8 caracteres.");
      this.serverErrors.push("Sua senha deve conter pelo menos 8 caracteres");
      this.scrollTop();
      return false;
    }

    if (confirmPassword && senha !== confirmPassword) {
      console.log("Erro: Senha e confirmação de senha não coincidem.");
      this.serverErrors.push("As senhas informadas não coincidem");
      this.scrollTop();
      return false;
    }

    return true;
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly CategoriaProjetoArr = CategoriasProjetoArr;
  protected readonly TipoUsuarioArr = TipoUsuarioArr;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  protected readonly ETipoUsuario = ETipoUsuario;
}
