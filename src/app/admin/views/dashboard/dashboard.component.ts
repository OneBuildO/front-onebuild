import { formatDate } from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {DadosEstatisticaUsuario} from "../../../_core/models/usuario.model";
import {CategoriasProjetoArr} from "../../../_core/enums/e-categorias-projeto";
import {UsuarioService} from "../../../_core/services/usuario.service";
Chart.register(...registerables);

import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {ClienteService} from "src/app/_core/services/cliente.service";
import {ETipoUsuario} from "src/app/_core/enums/e-tipo-usuario";
import {EPerfilUsuario} from "src/app/_core/enums/e-perfil-usuario";
import {UsuarioModel} from "src/app/_core/models/usuario.model";
import {AuthService} from "src/app/_core/services/auth.service";
import { CommonService } from 'src/app/_core/services/common.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { AdminRoutes, ElementRoutes, SettingRoutes } from '../../admin.routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;

  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');
  dadosPerfil!: DadosEstatisticaUsuario;
  showModal: boolean = false;

 public listaClientes: ClienteResumoDTO[] = [];
  clienteSelected! : ClienteResumoDTO;
  showClientesPopup: boolean = false;

  sortDirectionNome: boolean = true;
  sortDirectionProjeto: boolean = true;

  tipoUsuario!: ETipoUsuario;
  @Input()
  userLogged? : UsuarioModel | null;


  constructor(
    private readonly serviceUsuario : UsuarioService,
    private serviceCliente: ClienteService,
    protected authService : AuthService,
    public readonly commonServices: CommonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.showModal = false;
    console.log("userLogged:", this.userLogged);
    console.log("perfilUsuario:", this.userLogged?.perfilUsuario); 

    this.serviceUsuario.getEstatisticResumeUser()
      .subscribe({
        next: (data: any) => {
          this.dadosPerfil = data;
          this.serviceUsuario.getUserLogged()
            .subscribe({
              next: (data: any) => {
                this.userLogged = data;
                console.log("userLogged:", this.userLogged);
              },
            });
        },
        error: (err) => {
          console.error(err);
        }
      });

      this.serviceCliente. getAllForUser()
      .subscribe({
        next: (data: ClienteResumoDTO[]) => {
          this.listaClientes = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  handleModal() {
    this.showModal = !this.showModal; // Alterna o estado do modal manualmente
  }

  onModalCloseHandler(event: boolean) {
    this.showModal = event; // Atualiza o estado do modal com base no evento de fechamento
  }

  openClientesPopup(): void {
    this.showClientesPopup = true;
  }

  closeClientesPopup(): void {
    this.showClientesPopup = false;
  }

  onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('popup')) {
      this.closeClientesPopup();
    }
  }

  sortByNome(): void {
    this.listaClientes.sort((a, b) => {
      const aValue = a.nome ?? '';
      const bValue = b.nome ?? '';
      if (aValue < bValue) {
        return this.sortDirectionNome ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirectionNome ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.sortDirectionNome = !this.sortDirectionNome; // Toggle the sort direction
  }

  sortByProjeto(): void {
    this.listaClientes.sort((a, b) => {
      const aValue = a.projeto ?? '';
      const bValue = b.projeto ?? '';
      if (aValue < bValue) {
        return this.sortDirectionProjeto ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirectionProjeto ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.sortDirectionProjeto = !this.sortDirectionProjeto; // Toggle the sort direction
  }

  protected readonly ETipoUsuario = ETipoUsuario;
  protected readonly EPerfilUsuario = EPerfilUsuario;
}
