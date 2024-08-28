import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import {DadosEstatisticaUsuario} from "../../../_core/models/usuario.model";
import {CategoriasProjetoArr} from "../../../_core/enums/e-categorias-projeto";
import {UsuarioService} from "../../../_core/services/usuario.service";
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {
  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');
  dadosPerfil! : DadosEstatisticaUsuario;

  constructor(
    private readonly serviceUsuario : UsuarioService,
  ) {}

  ngOnInit(): void {
    this.serviceUsuario.getEstatisticResumeUser()
      .subscribe({
        next: (data: any) => {
          this.dadosPerfil = data
        },
        error: (err) => {

        }
      });

    var myChart = new Chart("areaWiseSale", {
      type: 'doughnut',
      data: {
        labels: CategoriasProjetoArr,
        datasets: [{
          label: 'quantidade: ',
          data: [12, 19, 3, 5],
        }]
      },
      options: {
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          },
        },
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
          },
        },
      },
    });
  }
}
