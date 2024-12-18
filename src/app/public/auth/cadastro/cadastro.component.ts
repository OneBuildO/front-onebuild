import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
import {CidadesService, listaEstados} from "src/app/_core/services/cidades.service";

import {ProjetoService} from "src/app/_core/services/projeto.service";

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
    private serviceLocalidade: CidadesService,
    private serviceProject: ProjetoService
  ) {}

  protected readonly AlertType = AlertType;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;
  public listaCidades: any[] = [];

  isLoading: boolean = false;
  submited: boolean = false;

  serverErrors: string[] = [];
  tipoAlerta = AlertType.Warning;

  mapbox_id: string = '';
  enderecoCompleto: string = '';
  enderecoSelecionado: boolean = false;
  enderecosSugestoes: any[] = [];

  cadastroForm = this.formBuilder.group({
    nome: new FormControl('', { validators: [Validators.required] }),
    tipoUsuario: new FormControl('', { validators: [Validators.required] }),
    categoria: new FormControl(''), // Sem validação obrigatória inicialmente
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    contato: new FormControl('', { validators: [Validators.required] }),
    cnpj: new FormControl('', { validators: [Validators.required] }),
    senha: new FormControl('', { validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),
    terms: new FormControl(false, { validators: [Validators.requiredTrue] }),
    estado: new FormControl('', { validators: [Validators.required] }),
    cidade: new FormControl('', { validators: [Validators.required] }),
    endereco: new FormControl('', { validators: [Validators.required, this.validateEnderecoSelecionado()] }),
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

    const tipoUsuario = this.cadastroForm.get('tipoUsuario')?.value;
    let categoria = this.cadastroForm.get('categoria')?.value;
    const estado = this.cadastroForm.get('estado')?.value;
    const cidade = this.cadastroForm.get('cidade')?.value;

    // Só enviar a categoria se o tipoUsuario for FORNECEDOR
    if (tipoUsuario !== ETipoUsuario.FORNECEDOR) {
      categoria = '';  // Limpar a categoria se não for fornecedor
    }

    const dadosCadastro: CadastroUsuarioDTO = {
      nome: this.cadastroForm.get('nome')?.value || '',
      tipoUsuario: tipoUsuario || '',
      categoria: categoria || '',
      email: this.cadastroForm.get('email')?.value || '',
      contato: this.cadastroForm.get('contato')?.value || '',
      cnpj: this.cadastroForm.get('cnpj')?.value || '',
      senha: this.cadastroForm.get('senha')?.value || '',
      convite: this.paramIdConvite || '',
      estado: estado || '',
      cidade: cidade || '',
      endereco: this.enderecoCompleto || '',
      mapbox_id: this.mapbox_id || '' 
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

  onEstadoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const estadoNome = selectElement.value;
    this.obterCidadePorNomeEstado(estadoNome);
  }

  obterCidadePorNomeEstado(estadoNome: string) {
    if (estadoNome) {
      this.serviceLocalidade.getCidadesByNomeEstado(estadoNome).subscribe(
        (data) => {
          this.listaCidades = data;
        },
        (error) => {
          this.listaCidades = [];
        }
      );
    } else {
      this.listaCidades = [];
    }
  }

  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;

    if (searchText.length > 3) {
      this.serviceProject.getEnderecoMap(searchText).subscribe(
        (data: {
          suggestions: { name: string; place_formatted: string; mapbox_id: string }[];
        }) => {
          if (data.suggestions && data.suggestions.length > 0) {
            console.log('Sugestões recebidas:', data.suggestions);
            this.enderecosSugestoes = data.suggestions.map((suggestion) => ({
              name: suggestion.name,
              full_address: suggestion.name+ ', ' + suggestion.place_formatted, // Alterado para usar place_formatted
              mapbox_id: suggestion.mapbox_id,
            }));
            this.enderecoSelecionado = false;
            console.log('enderecosSugestoes:', this.enderecosSugestoes);
          } else {
            this.enderecosSugestoes = [];
            console.log('enderecosSugestoes:', this.enderecosSugestoes);
          }
        },
        (error) => {
          console.error('Erro ao buscar coordenadas:', error);
          this.enderecosSugestoes = [];
          this.enderecoSelecionado = false;
        }
      );
    } else {
      this.enderecosSugestoes = [];
    }
  }

  selectEndereco(endereco: { name: string; full_address: string; mapbox_id: string }): void {
    console.log('isValid:', this.enderecoSelecionado);
    this.enderecoCompleto = endereco.full_address;
    this.mapbox_id = endereco.mapbox_id;
    this.enderecoSelecionado = true;
    this.enderecosSugestoes = [];
    const enderecoControl = this.cadastroForm.get('endereco') as FormControl;
    if (enderecoControl) {
      enderecoControl.setValue(endereco.full_address);
    }
    console.log('Endereço completo selecionado:', this.enderecoCompleto);
    console.log('isValid:', this.enderecoSelecionado);
  }

  private validateEnderecoSelecionado(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!this.enderecoSelecionado) {
            return { enderecoInvalido: true };
        }
        return null;
    };
}

  protected readonly CategoriaProjetoArr = CategoriasProjetoArr;
  protected readonly TipoUsuarioArr = TipoUsuarioArr;
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  protected readonly ETipoUsuario = ETipoUsuario;
  protected readonly listaEstados = listaEstados;
}
