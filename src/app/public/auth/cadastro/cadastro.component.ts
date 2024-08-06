import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatetimeHelper} from 'src/app/_core/helpers/datetime.helper';
import {CommonService} from 'src/app/_core/services/common.service';
import {pageTransition} from 'src/app/shared/utils/animations';
import {AlertType} from 'src/app/shared/components/alert/alert.type';
import {PublicRoutes} from '../../public.routes';
import {ETipoUsuario, TipoUsuarioArr} from "src/app/_core/enums/e-tipo-usuario";
import {CadastroUsuarioDTO} from "src/app/_core/models/cadastro.model";
import {UsuarioService} from "src/app/_core/services/usuario.service";
import {AuthService} from "src/app/_core/services/auth.service";
import {ERROR_MESSAGES} from "src/app/shared/components/validation-error/error-messages";
import {CategoriasProjetoArr} from "src/app/_core/enums/e-categorias-projeto";
import {EMessages} from "src/app/_core/enums/e-messages";

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
      private serviceUser : UsuarioService,
  ) {}
  protected readonly AlertType = AlertType;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  isLoading: boolean = false;
  submited: boolean = false;

  serverErrors: string[] = [];
  tipoAlerta = AlertType.Warning;

  cadastroForm = this.formBuilder.group({
    nome: new FormControl( '', { validators: [Validators.required] }),
    tipoUsuario: new FormControl( '', { validators: [Validators.required] }),
    categoria: new FormControl( '', { validators: [Validators.required] }),
    email: new FormControl( '', { validators: [Validators.required] }),
    contato: new FormControl( '', { validators: [Validators.required] }),
    cnpj: new FormControl( '', { validators: [Validators.required] }),
    senha: new FormControl( '', { validators: [Validators.required] }),
    confirmPassword: new FormControl( '', { validators: [Validators.required] }),
    terms: new FormControl(false, { validators: [Validators.requiredTrue] }) // Adicionando o campo de termos
  });

  urlParams = new URL(window.location.href);
  paramIdConvite = this.urlParams.searchParams.get("convite");

  onFormSubmitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    this.submited = true;
    this.serverErrors = []

    if(this.cadastroForm.invalid) return
    if(!this.isSenhaValida()) return;

    this.isLoading = true;

    const dadosCadastro : CadastroUsuarioDTO  = {
      nome : this.cadastroForm.controls?.nome?.value,
      tipoUsuario : this.cadastroForm.controls?.tipoUsuario?.value,
      categoria : this.cadastroForm.controls?.categoria?.value,
      email : this.cadastroForm.controls?.email?.value,
      contato : this.cadastroForm.controls?.contato?.value,
      cnpj : this.cadastroForm.controls?.cnpj?.value,
      senha : this.cadastroForm.controls?.senha?.value,
      convite : this.paramIdConvite
    }

    this.serviceUser.saveUser(dadosCadastro)
      .subscribe({
        next: (data: any) => {
          this.authService.handleSetToken(data);
          window.location.href = `/validacao-email?email=${dadosCadastro.email}`
        },
        error: (err) => {
          this.tipoAlerta = AlertType.Danger
          if(err.statusText == "Unknown Error"){
            this.serverErrors.push(EMessages.SERVER_ERROR)
          }else{
            this.serverErrors.push(err.error)
          }

          this.isLoading = false;
          this.scrollTop()
        }
      });
  }

  handleChange(){
    this.serverErrors = []
    this.isSenhaValida()
  }

  isSenhaValida(){
    const senha = this.cadastroForm.controls.senha.value
    const confirmPassword = this.cadastroForm.controls.confirmPassword.value

    if(!senha || senha?.length < 8) {
      this.serverErrors.push("Sua senha deve conter pelo menos 8 caracteres")
      this.scrollTop()
      return false;
    }

    if(confirmPassword && senha !== confirmPassword) {
      this.serverErrors.push("As senhas informadas não coincidem")
      this.scrollTop()
      return false;
    }

    return true;
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };

  scrollTop(){
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }
  protected readonly CategoriaProjetoArr = CategoriasProjetoArr;
  protected readonly TipoUsuarioArr = TipoUsuarioArr;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  protected readonly ETipoUsuario = ETipoUsuario;
}