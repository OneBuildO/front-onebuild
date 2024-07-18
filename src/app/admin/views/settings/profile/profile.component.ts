import {Component, OnInit} from '@angular/core';
import { pageTransition } from 'src/app/shared/utils/animations';
import {UsuarioService} from "src/app/_core/services/usuario.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {CadastroUsuarioDTO} from "src/app/_core/models/cadastro.model";
import {ETipoUsuario} from "src/app/_core/enums/e-tipo-usuario";
import {PublicRoutes} from "src/app/public/public.routes";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  animations: [pageTransition]
})
export class ProfileComponent implements OnInit{

  isLoading: boolean = false;
  submited: boolean = false;
  serverErrors: string[] = [];
  tipoAlerta = AlertType.Warning;
  tipoCadastro : ETipoUsuario = ETipoUsuario.ARQUITETO

  constructor(
    private userService : UsuarioService,
    private formBuilder: FormBuilder,
  ) {}

  cadastroForm = this.formBuilder.group({
    nome: new FormControl( '', { validators: [Validators.required] }),
    email: new FormControl( '', { validators: [Validators.required] }),
    contato: new FormControl( '', { validators: [Validators.required] }),
    cpf: new FormControl( '', ),
    cnpj: new FormControl( '', ),
    senha: new FormControl( '', { validators: [Validators.required] }),
    confirmPassword: new FormControl( '', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.userService.getUserLogged()
      .subscribe({
        next: (data: any) => {
          this.cadastroForm = this.formBuilder.group({
            nome: new FormControl( data.nome, { validators: [Validators.required] }),
            email: new FormControl( data.email, { validators: [Validators.required] }),
            contato: new FormControl( data.contato, { validators: [Validators.required] }),
            cpf: new FormControl( data.cpf, ),
            cnpj: new FormControl( data.cnpj, ),
            senha: new FormControl( '', { validators: [Validators.required] }),
            confirmPassword: new FormControl( '', { validators: [Validators.required] }),
          });

        },
        error: (err) => {
          // this.isLoading = this.authService.isTokenInvalid(err)
        }
      });
  }

  onFormSubmitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    this.submited = true;
    this.serverErrors = []

    if(this.cadastroForm.invalid) return
    if(!this.isSenhaValida()) return;

    this.isLoading = true;

    const dadosCadastro : CadastroUsuarioDTO  = {
      nome : this.cadastroForm.controls?.nome?.value,
      email : this.cadastroForm.controls?.email?.value,
      contato : this.cadastroForm.controls?.contato?.value,
      cnpj : this.cadastroForm.controls?.cnpj?.value,
      senha : this.cadastroForm.controls?.senha?.value,
      tipoUsuario : null,
      categoria: null,
      convite: null,
    }

    this.userService.saveUser(dadosCadastro)
      .subscribe({
        next: (data: any) => {
          this.tipoAlerta = AlertType.Success;
          this.serverErrors.push(data);
        },
        error: (err) => {
          this.tipoAlerta = AlertType.Danger
          this.serverErrors.push(err.error)
        }
      });

    this.isLoading = false;
    this.scrollTop()

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

    if(!confirmPassword || senha !== confirmPassword) {
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

  protected readonly ETipoUsuario = ETipoUsuario;
  protected readonly publicRoutes = PublicRoutes;
}
