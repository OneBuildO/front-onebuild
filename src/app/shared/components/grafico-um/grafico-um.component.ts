import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartData, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { GraficoService } from 'src/app/_core/services/grafico.service';

@Component({
  selector: 'app-grafico-um',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './grafico-um.component.html',
  styleUrl: './grafico-um.component.css'
})
export class GraficoUmComponent implements OnInit {
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
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    {
      data: [],
      label: 'Quantidade de Projetos',
      backgroundColor: '#004590',
      borderColor: '#004590',
      maxBarThickness: 20,
      minBarLength: 2
    },
  ];

  constructor(private graficoService: GraficoService) {}

  ngOnInit(): void {
    this.graficoService.contarProjetosPorStatus().subscribe(
      (data) => {
        this.projetosStatus = data;
        console.log('Projetos por status:', this.projetosStatus);
      },
      (error) => {
        console.error('Erro ao buscar projetos por status:', error);
      }
    );
  }
}
