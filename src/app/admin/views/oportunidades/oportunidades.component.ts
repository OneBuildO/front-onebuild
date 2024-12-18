import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app//shared/components/modal/modal.component";
import {DataTableComponent} from "src/app//shared/components/data-table/data-table.component";
import {IColumn, TableData} from "../elements/data-table/table.data";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpinnerComponent} from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app//shared/components/alert/alert.component";
import {AlertType} from "src/app//shared/components/alert/alert.type";
import {ProjetoService} from "src/app//_core/services/projeto.service";
import {SelectClienteComponent} from "src/app//shared/components/select-cliente/select-cliente.component";
import {DatatableOportunidadesComponent} from "./datatableOportunidades/datatable-oportunidades.component";
import { ProjetosDisponiveisDTO } from "../../../_core/models/projeto.model";
Chart.register(...registerables);
import { CommonModule } from '@angular/common';
import { MinhasOfertasDTO } from '../../../_core/models/oferta.model';
import { OfertaService } from "src/app/_core/services/oferta.service";

@Component({
    selector: 'app-oportunidades',
    templateUrl: './oportunidades.component.html',
    styleUrls: ['./oportunidades.component.css'],
    standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    SelectClienteComponent,
    DatatableOportunidadesComponent,
    NgForOf,
    CommonModule
  ],
    animations: [pageTransition]
})
export class OportunidadesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjetoService,
    private ofertaService: OfertaService,
  ) {}

  urlParams = new URL(window.location.href);
  paramIdCliente = Number(this.urlParams.searchParams.get("cliente"));

  public columnData:IColumn[] = TableData.columnData;
  idClienteSelecionado : number = this.paramIdCliente ? this.paramIdCliente : 0
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  listaProjetosDisponiveis : ProjetosDisponiveisDTO[] = []
  selectedOportunidade: ProjetosDisponiveisDTO | null = null;

  showDetailModal: boolean = false;
  promocoes: MinhasOfertasDTO[] = [];
  currentPage: number = 1;
  currentPageProjetos: number = 1;
  itemsPerPage: number = 12;

  ngOnInit() {
    this.listaProjetosDisponiveis = [];
    this.projectService.getAllProjectAvailableForSupplier()
      .subscribe({
        next: (data: any) => {
          this.listaProjetosDisponiveis = data
          console.log('Projetos Disponíveis:', this.listaProjetosDisponiveis);
        },
        error: (err) => {
        }
      });

      this.ofertaService.getPromocoes().subscribe({
        next: (data: MinhasOfertasDTO[]) => {
          this.promocoes = data;
        },
        error: (err) => {
          console.error('Erro ao buscar promoções:', err);
        }
      });
  }

  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  detailsModal(projeto?: ProjetosDisponiveisDTO) {
    if (projeto) {
      this.selectedOportunidade = projeto;
      this.showDetailModal = true;
    } else {
      this.selectedOportunidade = null;
      this.showDetailModal = false;
    }
  }

  onModalDetailsHandler(event: boolean) {
    this.showDetailModal = event;
  }

  get paginatedPromocoes(): MinhasOfertasDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.promocoes.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.promocoes.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPageProjetos(): void {
    if ((this.currentPageProjetos * this.itemsPerPage) < this.listaProjetosDisponiveis.length) {
      this.currentPageProjetos++;
    }
  }

  previousPageProjetos(): void {
    if (this.currentPageProjetos > 1) {
      this.currentPageProjetos--;
    }
  }

  get projetosPaginados() {
    const inicio = (this.currentPageProjetos - 1) * this.itemsPerPage;
    const fim = inicio + this.itemsPerPage;
    console.log('Projetos na Página:', this.listaProjetosDisponiveis.slice(inicio, fim));
    return this.listaProjetosDisponiveis.slice(inicio, fim);
  }
  

  mudarPaginaProjetos(novaPagina: number) {
    if (novaPagina >= 1 && novaPagina <= this.totalPaginasProjetos) {
      this.currentPageProjetos = novaPagina;
    }
  }

  get totalPaginasProjetos() {
    return Math.ceil(this.listaProjetosDisponiveis.length / this.itemsPerPage);
  }
}
