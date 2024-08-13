import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from 'src/app/_core/services/common.service';
import {pageTransition} from 'src/app/shared/utils/animations';
import {AlertType} from 'src/app/shared/components/alert/alert.type';
import {PublicRoutes} from '../../public.routes';
import {AuthService} from "src/app/_core/services/auth.service";
import {UsuarioService} from "src/app/_core/services/usuario.service";
import {ValidacaoEmailDTO} from "src/app/_core/models/usuario.model";

@Component({
  selector: 'app-validacao-email',
  templateUrl: './validacaoEmail.component.html',
  styleUrls: ['./validacaoEmail.component.css'],
  animations: [pageTransition],
})
export class ValidacaoEmailComponent implements OnInit, OnDestroy {
  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private serviceAuth: AuthService,
    private serviceUser: UsuarioService
  ) {}
  protected readonly AlertType = AlertType;
  readonly publicRoutes = PublicRoutes;

  urlParams = new URL(window.location.href);
  emailValidation = this.urlParams.searchParams.get("email");

  isLoading: boolean = false;
  isLiberadoNovaSolicitacao: boolean = false;
  submited: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;

  codeTimeRemain = '';
  remainingTime = 30;
  intervalId!: number;

  ngOnInit() {
    if(!this.emailValidation) window.location.href = (`/`)
    this.startCountdown()
  }

  startCountdown() {
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
      this.codeTimeRemain = `${this.remainingTime} segundos`;
      if (this.remainingTime === 0) {
        this.codeTimeRemain = '';
        this.isLiberadoNovaSolicitacao = true;
        this.serverMessages = [];
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  codeForm = this.formBuilder.group({
    code: new FormControl( '', { validators: [Validators.required] }),
  });

  handleSendCode(){
    this.serverMessages = [];
    this.serviceUser.resendCodeValidationEmail(String(this.emailValidation))
      .subscribe({
        next: (data: any) => {
          this.tipoAlerta = AlertType.Success;
          this.remainingTime = 30;
          this.startCountdown();
          this.isLiberadoNovaSolicitacao = false;
          this.serverMessages.push('Código reenviado para seu email');
        },
        error: (err) => {
          this.tipoAlerta = AlertType.Danger;
          this.serverMessages.push(err.error);
        }
      });
  }

  protected onFormSubmitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    this.submited = true;
    this.serverMessages = []

    if(this.codeForm.invalid) return
    this.isLoading = true

    const validacao : ValidacaoEmailDTO = {
      email : this.emailValidation,
      codigoAutenticacao : this.codeForm?.controls?.code?.value
    }

    this.serviceUser.validacaoEmail(validacao)
      .subscribe({
        next: (data: any) => {
          this.tipoAlerta = AlertType.Success;
          this.serverMessages.push('Email validado com sucesso!')
          this.serviceAuth.handleSetToken(data);
          setTimeout(()=>{
            window.location.href = "/admin/dashboard"
          })
        },
        error: (err) => {
          if(err.error == "Seu email já foi autenticado, faça login para acessar sua conta"){
            window.location.href = "/admin/dashboard"
            return
          }
          this.tipoAlerta = AlertType.Danger
          this.serverMessages.push(err.error)
        }
      });

    this.scrollTop()
    this.isLoading = false;
  };


  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  scrollTop(){
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }
}
