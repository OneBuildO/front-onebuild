import { Component, OnInit, Renderer2 } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {pageTransition} from 'src/app/shared/utils/animations';
import {ModalComponent} from "src/app/shared/components/modal/modal.component";
import {DataTableComponent} from "src/app/shared/components/data-table/data-table.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "src/app/shared/components/spinner/spinner.component";
import {AlertComponent} from "src/app/shared/components/alert/alert.component";
import {AlertType} from "src/app/shared/components/alert/alert.type";
import {ProjetoService} from "src/app/_core/services/projeto.service";
import {ProjetoDetahesDTO} from "src/app/_core/models/projeto.model";
import {formatDatePTBR} from "src/app/shared/utils/Utils";

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
    NgForOf
  ],
  animations: [pageTransition]
})
export class ProjetoDetailComponent implements OnInit {

  constructor(
    private projectService: ProjetoService,
    private renderer: Renderer2
  ) {
    this.modalCompnent = new ModalComponent();
  }

  urlParams = new URL(window.location.href);
  paramIdProjeto = Number(this.urlParams.searchParams.get("projeto"));

  projeto!: ProjetoDetahesDTO | null;
  showModal: boolean = false;
  submited: boolean = false;
  isLoading: boolean = false;
  serverMessages: string[] = [];
  tipoAlerta = AlertType.Warning;
  modalCompnent: ModalComponent
  naoInformado = 'Não informado'

  ngOnInit(): void {
    this.projectService.getDetailsProjectForId(this.paramIdProjeto)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.projeto = data;
          this.loadWeatherWidget(data.cidadeId);
        },
        error: (err) => {
          this.projeto = null;
        }
      });
  }

  loadWeatherWidget(cidadeId: number): void {
    (window as any).myWidgetParam = (window as any).myWidgetParam || [];
    (window as any).myWidgetParam.push({
      id: 12,
      cityid: cidadeId,
      appid: 'dd3ce94aa0b74ec4b1cc3086d70a3c0d',
      units: 'metric',
      lang: 'pt_br',
      containerid: 'openweathermap-widget-12',
    });

    const script = this.renderer.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
    this.renderer.appendChild(document.body, script);
  }


  handleBack(){
    window.history.back();
  }

  protected readonly formatDatePTBR = formatDatePTBR;
}
