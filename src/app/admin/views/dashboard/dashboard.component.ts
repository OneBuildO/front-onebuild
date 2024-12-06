import { formatDate } from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Renderer2 } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {DadosEstatisticaUsuario} from "../../../_core/models/usuario.model";
import {ProjetoService} from "../../../_core/services/projeto.service";
import {UsuarioService} from "../../../_core/services/usuario.service";
Chart.register(...registerables);

import {ClienteResumoDTO} from "src/app/_core/models/clienteResumo";
import {ClienteService} from "src/app/_core/services/cliente.service";
import {ETipoUsuario} from "src/app/_core/enums/e-tipo-usuario";
import {EPerfilUsuario} from "src/app/_core/enums/e-perfil-usuario";
import {UsuarioModel} from "src/app/_core/models/usuario.model";
import {AuthService} from "src/app/_core/services/auth.service";
import { CommonService } from 'src/app/_core/services/common.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { AdminRoutes } from '../../admin.routes';
import { ChartType, ChartOptions, ChartData, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { GraficoService } from 'src/app/_core/services/grafico.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition],
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

  projetosFinalizados: number = 0;
  projetosStatus: { [key: string]: number } = {};

  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
      }
    },
    scales: {
      xAxes: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          maxRotation: 90,
          font: {
            size: 10,
          }
        },
      },
    },
  };
  public barChartLabels: string[] = ['Status dos Projetos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    {
      data: [0], // Valor para "Cotação"
      label: 'Cotação', // Rótulo clicável
      backgroundColor: '#FFA500',
      borderColor: '#FFA500',
      maxBarThickness: 80,
      minBarLength: 2,
    },
    {
      data: [0], // Valor para "Andamento"
      label: 'Andamento', // Rótulo clicável
      backgroundColor: '#004590',
      borderColor: '#004590',
      maxBarThickness: 80,
      minBarLength: 2,
    },
    {
      data: [0], // Valor para "Finalizado"
      label: 'Finalizado', // Rótulo clicável
      backgroundColor: '#008000',
      borderColor: '#008000',
      maxBarThickness: 80,
      minBarLength: 2,
    },
  ];


  constructor(
    private readonly serviceUsuario : UsuarioService,
    private serviceCliente: ClienteService,
    private projetoService: ProjetoService,
    protected authService : AuthService,
    public readonly commonServices: CommonService,
    private router: Router,
    private graficoService: GraficoService,
    private renderer: Renderer2
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

      this.projetoService.contarProjetosFinalizados().subscribe(
        (data) => {
          this.projetosFinalizados = data;
          console.log('Projetos finalizados:', this.projetosFinalizados);
        },
        (error) => {
          console.error('Erro ao buscar projetos finalizados:', error);
        }
      );

      this.graficoService.contarProjetosPorStatus().subscribe(
        (data) => {
          this.barChartData[0].data = [
            data['Cotação'] || 0,
            data['Andamento'] || 0,
            data['Finalizado'] || 0
          ];
        },
        (error) => {
          console.error('Erro ao buscar dados do gráfico:', error);
        }
      );
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

  positionPopup(): void {
    const card = document.getElementById('totalClientesCard');
    const popup = document.getElementById('clientesPopup');
    if (card && popup) {
      const rect = card.getBoundingClientRect();
      this.renderer.setStyle(popup, 'top', `${rect.bottom + window.scrollY}px`);
      this.renderer.setStyle(popup, 'left', `${rect.left + window.scrollX}px`);
      this.renderer.setStyle(popup, 'width', `${rect.width}px`);
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
