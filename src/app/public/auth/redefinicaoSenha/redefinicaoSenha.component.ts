import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { AdminRoutes } from 'src/app/admin/admin.routes';
import { AppRoutes } from 'src/app/app.routes';
import { pageTransition } from 'src/app/shared/utils/animations';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { PublicRoutes } from '../../public.routes';
import { AuthService } from "../../../_core/services/auth.service";
import {LoginModelDTO} from "../../../_core/models/login.model";

@Component({
  selector: 'app-redefinicaoSenha',
  templateUrl: './redefinicaoSenha.component.html',
  styleUrls: ['./redefinicaoSenha.component.css'],
  animations: [pageTransition],
})
export class RedefinicaoSenhaComponent {
  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  protected readonly AlertType = AlertType;
  readonly publicRoutes = PublicRoutes;

  isLoading: boolean = false;
  submited: boolean = false;
  isEmailEnviado: boolean = false;

  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;

  emailForm = this.formBuilder.group({
    email: new FormControl( '', { validators: [Validators.required] }),
  });

  passwordForm = this.formBuilder.group({
    email: new FormControl( '', { validators: [Validators.required] }),
    password: new FormControl( '', { validators: [Validators.required] }),
  });

  protected onFormSubmitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    this.submited = true;
    this.serverMessages = []

    // if(this.loginForm.invalid) return

    this.isLoading = true;
    // const email = this.loginForm.controls.username.value
    // const senha = this.loginForm.controls.password.value

    // const dadosLogin : LoginModelDTO = {
    //   login : email,
    //   senha : senha
    // }

    // this.authService.login(dadosLogin)
    //   .subscribe({
    //     next: (data: any) => {
    //       this.tipoAlerta = AlertType.Success
    //       this.authService.handleSetToken(data)
    //       this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
    //     },
    //     error: (err) => {
    //       this.tipoAlerta = AlertType.Danger
    //       this.serverMessages.push(err.error)
    //     }
    //   });

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
