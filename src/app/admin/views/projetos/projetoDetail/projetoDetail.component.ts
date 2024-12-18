import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertType } from 'src/app/shared/components/alert/alert.type';
import { ProjetoService } from 'src/app/_core/services/projeto.service';
import { ProjetoDetahesDTO, Arquivo } from 'src/app/_core/models/projeto.model';
import { formatDatePTBR } from 'src/app/shared/utils/Utils';
import * as mapboxgl from 'mapbox-gl';

Chart.register(...registerables);

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projetoDetail.component.html',
  styleUrls: ['./projetoDetail.component.css'],
  standalone: true,
  imports: [
    ModalComponent,
    DataTableComponent,
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    NgClass,
    AlertComponent,
    NgForOf,
    CommonModule,
  ],
  animations: [pageTransition],
})
export class ProjetoDetailComponent implements OnInit {

  @Output() onEditEmitter = new EventEmitter<ProjetoDetahesDTO>();

  constructor(
    private projectService: ProjetoService,
    private renderer: Renderer2
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdProjeto = Number(this.urlParams.searchParams.get('projeto'));

  projeto!: ProjetoDetahesDTO | null;
  weather!: any;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent;
  naoInformado = 'Não informado';
  hasPlantaBaixa: boolean = false;
  arquivos: any[] = [];
  plantaBaixa: Arquivo[] = [];

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  mapBoxApiKey =
    'pk.eyJ1IjoianZpY3RvcjAxMSIsImEiOiJjbTJrdDF3bjEwNHZuMmxvZXFzbmR2ZXZjIn0.i54Xkjxm3rb7vYvXt2Sq_w';

  ngOnInit(): void {
    this.projectService.getDetailsProjectForId(this.paramIdProjeto).subscribe({
      next: (data: any) => {
        console.log(data);
        this.projeto = data;
        console.log(this.projeto);
        this.arquivos = data.arquivos;
        this.plantaBaixa = data.plantaBaixa;

        // Verifica a presença do arquivo de planta baixa
        this.hasPlantaBaixa = !!data.plantaBaixa && data.plantaBaixa.length > 0;

        this.projectService
          .getWeatherData(data.latitude, data.longitude)
          .subscribe({
            next: (weatherData: any) => {
              console.log('Dados do clima:', weatherData);
              this.weather = weatherData;
              this.initializeMap([-38.528, -3.728]); // Inicialize o mapa em uma posição padrão

              // Obtenha as coordenadas a partir do Mapbox ID
              this.projectService
                .getCoordinatesMapBox(data.mapbox_id)
                .subscribe((response) => {
                  if (response.features && response.features.length > 0) {
                    const coordinates =
                      response.features[0].geometry.coordinates;
                    console.log('Coordenadas recebidas:', coordinates);

                    // Centralize o mapa e adicione um marcador
                    this.map.setCenter(coordinates);
                  } else {
                    console.error('Nenhuma coordenada encontrada.');
                  }
                });
            },
            error: (err) => {
              console.error('Erro ao buscar dados do clima:', err);
              this.isLoading = false;
            },
          });
      },
      error: (err) => {
        this.projeto = null;
      },
    });
  }

  initializeMap(coordinates: [number, number]): void {
    this.map = new mapboxgl.Map({
      accessToken: this.mapBoxApiKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 18,
      attributionControl: false,
    });
  }

  handleBack() {
    window.history.back();
  }

  handleEdit() {
    // Emite o evento de edição
    if (this.projeto) {
      this.onEditEmitter.emit(this.projeto);
    }
  }

  protected readonly formatDatePTBR = formatDatePTBR;
}
