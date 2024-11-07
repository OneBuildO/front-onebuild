import { Component } from '@angular/core';
import { ChartType, ChartOptions, ChartData, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { GraficoService } from 'src/app/_core/services/grafico.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Projetos Cadastrados por Mês',
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
  public barChartLabels: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    {
      data: [],
      label: 'Quantidade de Projetos',
      backgroundColor: '#1C9212',
      borderColor: '#1C9212',
      maxBarThickness: 20,
      minBarLength: 2
    },
  ];

  constructor(private graficoService: GraficoService) {}

  ngOnInit(): void {
    this.graficoService.getGraficoProjetosCadastro().subscribe(
      data => {
        console.log('Dados recebidos do backend:', data);
        const monthData = new Array(12).fill(0);
        const labels = new Array(12).fill('').map((_, index) => this.getMonthYearString(index));
        Object.keys(data).forEach(key => {
          const [year, month] = key.split('-');
          const monthIndex = parseInt(month, 10) - 1;
          monthData[monthIndex] += data[key];
        });
        this.barChartData[0].data = monthData;
        this.barChartLabels = labels;
      },
      error => {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    );
  }

  private getMonthYearString(index: number): string {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const month = monthNames[index];
    return `${month}`;
  }
}
