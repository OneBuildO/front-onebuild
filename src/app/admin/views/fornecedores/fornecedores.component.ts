import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import {
  IColumn,
  IProjects,
  TableData,
} from '../elements/data-table/table.data';
import { NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { ProjetoService } from '../../../_core/services/projeto.service';
Chart.register(...registerables);

import { FornecedorService } from '../../../_core/services/fornecedor.service';
import { FornecedorDTO } from '../../../_core/models/fornecedor.model';
import { CommonModule } from '@angular/common';

import { ChartComponent } from '../../../shared/components/chart/chart.component';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
  standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    CommonModule,
    ChartComponent,
  ],
  animations: [pageTransition],
})
export class FornecedoresComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  mapBoxApiKey =
    'pk.eyJ1IjoianZpY3RvcjAxMSIsImEiOiJjbTJrdDF3bjEwNHZuMmxvZXFzbmR2ZXZjIn0.i54Xkjxm3rb7vYvXt2Sq_w';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjetoService,
    private fornecedorService: FornecedorService
  ) {
    this.modalCompnent = new ModalComponent();
  }

  // public selectedProjet?: ProjetoModelDTO | null;
  public projects: IProjects[] = TableData.projects;
  public pages: number[] = TableData.pageNumber;
  public columnData: IColumn[] = TableData.columnData;
  public fornecedores: FornecedorDTO[] = [];
  selectedFornecedor: FornecedorDTO | null = null;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent;

  showDetailModal: boolean = false;

  projectForm = this.formBuilder.group({
    arquivo: new FormControl(''),
    nomeProjeto: new FormControl('', { validators: [Validators.required] }),
    nomeCliente: new FormControl('', { validators: [Validators.required] }),
    dataLimiteOrcamento: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.getFornecedores();
    this.projects = [];
    this.projectService.getAllProjectForUser().subscribe({
      next: (data: any) => {
        this.projects = data;
      },
      error: (err) => {},
    });
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = this.mapBoxApiKey;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [-38.528, -3.728],
      zoom: 12,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  handleModal() {
    this.showModal = !this.showModal;
  }

  detailsModal(fornecedor?: FornecedorDTO): void {
    if (fornecedor) {
      this.selectedFornecedor = fornecedor;
      this.showDetailModal = true;
    } else {
      this.selectedFornecedor = null;
      this.showDetailModal = false;
    }
  }

  onModalCloseHandler(event: boolean) {
    this.showModal = event;
  }

  onModalDetailsHandler(event: boolean) {
    this.showDetailModal = event;
  }

  protected onFormSubmitHandler = () => {
    this.submited = true;
    this.serverMessages = [];

    if (this.projectForm.invalid) return;

    // const dadosProjeto : ProjetoModelDTO = {
    //   nome: this.projectForm.controls?.nomeProjeto?.value,
    //   nomeCliente: this.projectForm.controls?.nomeCliente?.value,
    //   dataLimiteOrcamento: this.projectForm.controls?.dataLimiteOrcamento?.value,
    //   arquivo: null,
    // }
    // this.projectService.saveNewProject(dadosProjeto)
    //   .subscribe({
    //     next: (data: any) => {
    //       this.tipoAlerta = AlertType.Success
    //       this.serverMessages.push('sucess')
    //       this.isLoading = false;
    //       this.handleModal()
    //       window.location.reload()
    //     },
    //     error: (err) => {
    //       this.tipoAlerta = AlertType.Danger
    //       this.serverMessages.push(err.error)
    //       this.isLoading = false;
    //     }
    //   });
  };

  handleView() {
    console.log('view');
  }

  handleEdit() {
    console.log('Edit');
  }

  handleRemove() {
    console.log('Remove');
  }
  protected onAlertCloseHandler = (e: any) => {
    this.serverMessages = [];
  };

  getFornecedores(): void {
    this.fornecedorService
      .getFornecedores()
      .subscribe((data: FornecedorDTO[]) => {
        this.fornecedores = data;
      });
  }
}
