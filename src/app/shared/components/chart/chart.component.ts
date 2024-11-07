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
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: string[] = [];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  public barChartPlugins = [];

  // public barChartData: ChartDataset<'bar'>[] = [
  //   { data: [], label: 'Projetos Cadastrados' }
  // ];

  // Gráfico 2: Acertos e Erros por Tipo de Prova
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Projetos Cadastrados por Mês',
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  public barChartLabels: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    {
      data: [],
      label: 'Quantidade de Projetos',
      backgroundColor: '#1C9212',
      borderColor: '#1C9212',
    },
  ];

  constructor(private graficoService: GraficoService) {}

  ngOnInit(): void {
    this.graficoService.getGraficoProjetosCadastro().subscribe(
      data => {
        console.log('Dados recebidos do backend:', data);
        const sortedKeys = Object.keys(data).sort();
        this.barChartLabels = sortedKeys.map(key => {
          const [year, month] = key.split('-');
          return `${month.padStart(2, '0')}/${year}`;
        });
        this.barChartData[0].data = sortedKeys.map(key => data[key]);
      },
      error => {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    );
  }

  private getMonthYearString(index: number): string {
    const year = new Date().getFullYear();
    const month = (index + 1).toString().padStart(2, '0');
    return `${month}/${year}`;
  }
}
