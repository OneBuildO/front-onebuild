import { Injectable } from '@angular/core';
import { SidebarModuleRoutingType, SidebarModulesName } from '@core/components';
import { EAguaVapor, EPermissions, ERoutes } from '@core/enums';
import { PermissionService } from '@core/services/permission.service';
import { compareStrings } from '@core/utils';
import { ETipoCarta } from '@features/gestao-carta/utils';
import { EMedicaoFiscal } from '@features/relatorio-medicao-fiscal/utils';
import { SidebarConfiguration } from './../components/sidebar/sidebar-config.type';
import { LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  //dashboard
  private isVisible_Dashboard = false;

  //Gestão da Produção
  private isVisible_GestaoProducaoCadastro = false;
  private isVisible_Campos = false;
  private isVisible_InstalacaoDestinoTransferencia = false;
  private isVisible_Estacoes = false;
  private isVisible_Pocos = false;

  private isVisible_GestaoProducaoGestaoFluido = false;
  private isVisible_Captacao = false;
  private isVisible_InjecaoAguaVapor = false;

  private isVisible_GestaoProducaoMedicao = false;
  private isVisible_MedicaoAgua = false;
  private isVisible_GasVentilado = false;
  private isVisible_GestaoProducaoMedicaoFiscal = false;
  private isVisible_MedicoesFiscaisLinhaGas = false;
  private isVisible_MedicoesFiscaisLinhaOleo = false;
  private isVisible_MedicoesFiscaisTanque = false;

  private isVisible_ConsumoMedicaoIBU = false;
  private isVisible_Paradas = false;
  private isVisible_Sonolog = false;
  private isVisible_GestaoFalhas = false;
  private isVisible_TestesPoco = false;

  private isVisible_GestaoProducao = false;

  private isVisible_ConfigSuperficiePoco = false;

  private isVisible_Cluster = false;
  private isVisible_No = false;

  private isVisible_ClassificacaoPerda = false;
  private isVisible_GrupoPerda = false;
  private isVisible_SubgrupoPerda = false;

  // Fechamento de Produção
  private isVisible_AcompanhamentoPocos = false;
  private isVisible_BMP = false;
  private isVisible_InjecaoDiaria = false;
  private isVisible_ProducaoDiaria = false;
  private isVisible_FechamentoProducao = false;

  // Gestão de Prazos
  private isVisible_GestaoPrazos = false;

  private isVisible_GestaoPrazoTestePoco = false;
  private isVisible_GestaoPrazoTestePocoTeste = false;
  private isVisible_GestaoPrazoTestePocoEnvio = false;

  private isVisible_GestaoPrazoMedicaoFiscal = false;
  private isVisible_GestaoPrazoMedicaoFiscalTanque = false;
  private isVisible_GestaoPrazoMedicaoFiscalLinha = false;

  private isVisible_GestaoPrazoInstrumento = false;
  private isVisible_GestaoPrazoGasVentilado = false;
  private isVisible_GestaoPrazoParada = false;

  private isVisible_GestaoPrazoAnaliseQuimica = false;
  private isVisible_GestaoPrazoBSW = false;
  private isVisible_GestaoPrazoFERS = false;

  // Gestão de Cartas
  private isVisible_GestaoCartasCadastro = false;
  private isVisible_Superintendencia = false;

  private isVisible_GestaoCartas = false;
  private isVisible_CartasEnviadas = false;
  private isVisible_CartasRecebidas = false;

  //Reservatório
  private isVisible_ReservatorioCadastro = false;
  private isVisible_Reservatorios = false;
  private isVisible_RGO = false;
  private isVisible_ZonasProdutoras = false;

  private isVisible_AssociarZonas = false;
  private isVisible_Potencial = false;

  private isVisible_Reservatorio = false;
  private isVisible_PAP = false;

  //Equipamento
  private isVisible_laboratorio_equipamentos = false;
  private isVisible_instrumentos = false;

  private isVisible_superficie_equipamentos = false;
  private isVisible_Cabecote = false;
  private isVisible_Transformador = false;
  private isVisible_UnidadesBombeio = false;

  private isVisible_Tags = false;
  private isVisible_PontosMedicao = false;

  private isVisible_Fabricantes = false;

  private isVisible_GestaoLacres = false;
  private isVisible_Lotes = false;
  private isVisible_Lacres = false;
  private isVisible_Fornecedores = false;

  private isVisible_Equipamento = false;

  //Laboratório
  private isVisible_Amostras = false;
  private isVisible_BSWs = false;
  private isVisible_Cromatografias = false;
  private isVisible_Densidades = false;
  private isVisible_FERSs = false;
  private isVisible_H2Ss = false;
  private isVisible_Salinidades = false;

  private isVisible_Laboratorio = false;

  //Administração
  private isVisible_AdministracaoCadastro = false;
  private isVisible_Cargos = false;
  private isVisible_Colaboradores = false;
  private isVisible_Empresas = false;
  private isVisible_Perfis = false;
  private isVisible_Usuarios = false;

  private isVisible_Administracao = false;

  // Relatórios
  private isVisible_Relatorios = false;
  private isVisible_RelatorioTransferenciaFiscaisTanque = false;
  private isVisible_RelatorioMedicaoFiscal = false;
  private isVisible_RelatorioMTBF = false;
  private isVisible_RelatorioPerda = false;
  private isVisible_RelatorioProducoesDiarias = false;
  private isVisible_RelatorioInjecoesDiarias = false;

  // Catálogo de Oportunidades
  private isVisible_CatalogoOportunidades = false;
  private isVisible_CadastroCatalogoOportunidades = false;
  private isVisible_Locacao = false;
  private isVisible_TiposProjetos = false;
  private isVisible_Pacote_Projeto = false;

  private sidebarRouting: SidebarModuleRoutingType[];

  constructor(private readonly permissionService: PermissionService, public readonly localStorageService: LocalStorageService) {}

  handleGetSidebarConfig() {
    return this.localStorageService.getSidebarConfig();
  }

  handleSetSidebarConfig(sidebarConfig: SidebarConfiguration) {
    this.localStorageService.saveSidebarConfig(sidebarConfig);
  }

  createSideBar(): SidebarModuleRoutingType[] {
    return [
      {
        id: 'dashboard',
        moduleName: SidebarModulesName.DASHBOARD,
        iconName: 'web',
        hasTopics: false,
        hasSubtopics: false,
        routeName: ERoutes.HOME,
        isVisible: this.isVisible_Dashboard
      },
      // {
      //   id: 'catalogo-oportunidades',
      //   moduleName: SidebarModulesName.CATALOGO_OPORTUNIDADES,
      //   iconName: 'menu_book',
      //   hasTopics: true,
      //   hasSubtopics: false,
      //   isVisible: this.isVisible_CatalogoOportunidades,
      //   topics: [
      //     {
      //       id: 'catalogo-oportunidades-cadastro-auxiliares',
      //       hasSubtopics: true,
      //       hasTopics: false,
      //       iconName: '',
      //       isVisible: this.isVisible_CadastroCatalogoOportunidades,
      //       moduleName: SidebarModulesName.CADASTRO,
      //       subtopics: [
      //         {
      //           id: 'catalogo-oportunidades-cadastro-auxiliares-locacao',
      //           isVisible: this.isVisible_Locacao,
      //           name: 'Locações',
      //           routeName: ERoutes.LOCACAO
      //         },
      //         {
      //           id: 'catalogo-oportunidades-cadastro-auxiliares-pacote-projeto',
      //           isVisible: this.isVisible_Pacote_Projeto,
      //           name: 'Pacotes de Projeto',
      //           routeName: ERoutes.PACOTE_PROJETO
      //         },
      //         {
      //           id: 'catalogo-oportunidades-cadastro-auxiliares-tipos-projetos',
      //           isVisible: this.isVisible_TiposProjetos,
      //           name: 'Tipos de Projeto',
      //           routeName: ERoutes.TIPO_PROJETO
      //         }
      //       ]
      //     }
      //   ]
      // },
      {
        id: 'gestao-producao',
        moduleName: SidebarModulesName.GESTAO_DA_PRODUCAO,
        iconName: 'gas_meter',
        hasTopics: true,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_GestaoProducao,
        topics: [
          {
            id: 'gestao-producao-cadastro',
            moduleName: SidebarModulesName.CADASTRO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoProducaoCadastro,
            subtopics: [
              {
                id: 'gestao-producao-cadastro-campos',
                name: 'Campos',
                routeName: ERoutes.CAMPO,
                isVisible: this.isVisible_Campos
              },
              {
                id: 'gestao-producao-cadastro-cluster',
                name: 'Clusters',
                routeName: ERoutes.CLUSTER,
                isVisible: this.isVisible_Cluster
              },
              {
                id: 'gestao-producao-cadastro-estacoes',
                name: 'Estações',
                routeName: ERoutes.ESTACAO,
                isVisible: this.isVisible_Estacoes
              },
              {
                id: 'Gestao-producao-cadastro-instalacao',
                name: 'Instalações de Destino de Transferência',
                routeName: ERoutes.INSTALACAO_DESTINO_TRANSFERENCIA,
                isVisible: this.isVisible_InstalacaoDestinoTransferencia
              },
              {
                id: 'gestao-producao-cadastro-no',
                name: 'Nós',
                routeName: ERoutes.NO,
                isVisible: this.isVisible_No
              },
              {
                id: 'gestao-producao-cadastro-pocos',
                name: 'Poços',
                routeName: ERoutes.POCO,
                isVisible: this.isVisible_Pocos
              }
            ]
          },
          {
            id: 'gestao-producao-classificacao-perdas',
            moduleName: SidebarModulesName.CLASSIFICACAO_DE_PERDAS,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_ClassificacaoPerda,
            subtopics: [
              {
                id: 'gestao-producao-classificacao-perdas-grupos',
                name: 'Grupos de Perdas',
                routeName: ERoutes.GRUPO_PERDA,
                isVisible: this.isVisible_GrupoPerda
              },
              {
                id: 'gestao-producao-classificacao-perdas-subgrupos',
                name: 'Subgrupos de Perdas',
                routeName: ERoutes.SUBGRUPO_PERDA,
                isVisible: this.isVisible_SubgrupoPerda
              }
            ],
            topics: []
          },
          {
            id: 'gestao-producao-gestao-fluido',
            moduleName: SidebarModulesName.GESTAO_DE_FLUIDOS,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoProducaoGestaoFluido,
            subtopics: [
              {
                id: 'gestao-producao-gestao-fluido-captacoes',
                name: 'Captações de Água',
                routeName: ERoutes.CAPTACAO,
                isVisible: this.isVisible_Captacao
              }
            ],
            topics: [
              {
                id: 'gestao-producao-gestao-fluido-injecoes',
                hasSubtopics: true,
                moduleName: SidebarModulesName.INJECOES,
                routeName: ERoutes.INJECAO,
                isVisible: this.isVisible_InjecaoAguaVapor,
                iconName: '',
                hasTopics: true,
                subtopics: [
                  {
                    id: 'gestao-producao-gestao-fluido-injecoes-agua',
                    name: 'Água',
                    routeName: `${ERoutes.INJECAO}/${EAguaVapor.AGUA}`,
                    isVisible: this.isVisible_InjecaoAguaVapor
                  },
                  {
                    id: 'gestao-producao-gestao-fluido-injecoes-vapor',
                    name: 'Vapor',
                    routeName: `${ERoutes.INJECAO}/${EAguaVapor.VAPOR}`,
                    isVisible: this.isVisible_InjecaoAguaVapor
                  }
                ]
              }
            ]
          },
          {
            id: 'gestao-producao-medicao',
            moduleName: SidebarModulesName.MEDICAO,
            iconName: '',
            hasTopics: true,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoProducaoMedicao,
            topics: [
              {
                id: 'gestao-producao-medicao-fiscal',
                moduleName: SidebarModulesName.FISCAL,
                iconName: '',
                hasTopics: false,
                hasSubtopics: true,
                isOpen: false,
                isVisible: this.isVisible_GestaoProducaoMedicaoFiscal,
                subtopics: [
                  {
                    id: 'gestao-producao-medicao-fiscal-medicoes-fiscais-linha-gas',
                    name: 'Linha | Gás',
                    routeName: ERoutes.MEDICAO_FISCAL_LINHA_GAS,
                    isVisible: this.isVisible_MedicoesFiscaisLinhaGas
                  },
                  {
                    id: 'gestao-producao-medicao-fiscal-medicoes-fiscais-linha-oleo',
                    name: 'Linha | Óleo',
                    routeName: ERoutes.MEDICAO_FISCAL_LINHA_OLEO,
                    isVisible: this.isVisible_MedicoesFiscaisLinhaOleo
                  },
                  {
                    id: 'gestao-producao-medicao-fiscal-medicoes-fiscais-tanque',
                    name: 'Tanque',
                    routeName: ERoutes.CICLOS,
                    isVisible: this.isVisible_MedicoesFiscaisTanque
                  }
                ]
              }
            ],
            subtopics: [
              {
                id: 'gestao-producao-medicao-consumo-ibu',
                name: 'Consumo IBU',
                routeName: ERoutes.CONSUMO_IBU,
                isVisible: this.isVisible_ConsumoMedicaoIBU
              },
              {
                id: 'gestao-producao-gas-ventilado',
                name: 'Gás Ventilado',
                routeName: ERoutes.GAS_VENTILADO,
                isVisible: this.isVisible_GasVentilado
              },
              {
                id: 'gestao-producao-medicao-medicoes-agua',
                name: 'Medições de Água e Vapor',
                routeName: ERoutes.MEDICAO_AGUA,
                isVisible: this.isVisible_MedicaoAgua
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'gestao-producao-configuracao-superficie-poco',
            name: 'Configuração de Superfície de Poço',
            routeName: ERoutes.CONFIGURACAO_SUPERFICIE_POCO,
            isVisible: this.isVisible_ConfigSuperficiePoco
          },
          {
            id: 'gestao-producao-gestao-falhas',
            name: 'Gestão de Falhas de Poço',
            routeName: ERoutes.GESTAO_FALHAS,
            isVisible: this.isVisible_GestaoFalhas
          },
          {
            id: 'gestao-producao-paradas',
            name: 'Paradas',
            routeName: ERoutes.PARADA,
            isVisible: this.isVisible_Paradas
          },
          {
            id: 'gestao-producao-sonologs',
            name: 'Sonologs',
            routeName: ERoutes.SONOLOG,
            isVisible: this.isVisible_Sonolog
          },
          {
            id: 'gestao-producao-testes-poco',
            name: 'Testes de Poço',
            routeName: ERoutes.TESTE_POCO,
            isVisible: this.isVisible_TestesPoco
          }
        ]
      },
      {
        id: 'fechamento-producao',
        moduleName: SidebarModulesName.FECHAMENTO_PRODUCAO,
        iconName: 'fact_check',
        hasTopics: true,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_FechamentoProducao,
        topics: [
          {
            id: 'injecao-diaria',
            moduleName: SidebarModulesName.INJECOES_DIARIAS,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_InjecaoDiaria,
            subtopics: [
              {
                id: 'fechamento-producao-injecao-diaria-agua',
                name: 'Água',
                routeName: `${ERoutes.INJECAO_DIARIA}/${EAguaVapor.AGUA}`,
                isVisible: this.isVisible_InjecaoDiaria
              },
              {
                id: 'fechamento-producao-injecao-diaria-vapor',
                name: 'Vapor',
                routeName: `${ERoutes.INJECAO_DIARIA}/${EAguaVapor.VAPOR}`,
                isVisible: this.isVisible_InjecaoDiaria
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'fechamento-producao-acompanhamento-pocos',
            name: 'Acompanhamento de Poços',
            routeName: ERoutes.ACOMPANHAMENTO_POCO,
            isVisible: this.isVisible_AcompanhamentoPocos
          },
          {
            id: 'fechamento-producao-bmp',
            name: 'BMP',
            routeName: ERoutes.BMP,
            isVisible: this.isVisible_BMP
          },
          {
            id: 'fechamento-producao-producao-diaria',
            name: 'Produções Diárias',
            routeName: ERoutes.PRODUCAO_DIARIA,
            isVisible: this.isVisible_ProducaoDiaria
          }
        ]
      },
      {
        id: 'relatorios',
        moduleName: SidebarModulesName.RELATORIOS,
        iconName: 'description',
        hasSubtopics: true,
        hasTopics: true,
        isOpen: false,
        isVisible: this.isVisible_Relatorios,
        topics: [
          {
            id: 'relatorios-injecao-diaria',
            moduleName: SidebarModulesName.INJECOES_DIARIAS,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_RelatorioInjecoesDiarias,
            subtopics: [
              {
                id: 'relatorios-injecao-diaria-agua',
                name: 'Água',
                routeName: `${ERoutes.RELATORIO}/${ERoutes.INJECAO_DIARIA}/${EAguaVapor.AGUA}`,
                isVisible: this.isVisible_RelatorioInjecoesDiarias
              },
              {
                id: 'relatorios-injecao-diaria-vapor',
                name: 'Vapor',
                routeName: `${ERoutes.RELATORIO}/${ERoutes.INJECAO_DIARIA}/${EAguaVapor.VAPOR}`,
                isVisible: this.isVisible_RelatorioInjecoesDiarias
              }
            ]
          },
          {
            id: 'relatorios-medicao-fiscal',
            moduleName: SidebarModulesName.MEDICAO_FISCAL,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_RelatorioMedicaoFiscal,
            subtopics: [
              {
                id: 'relatorios-medicao-fiscal-linha',
                name: 'Linha',
                routeName: `${ERoutes.RELATORIO}/${ERoutes.MEDICAO_FISCAL}/${EMedicaoFiscal.LINHA}`,
                isVisible: this.isVisible_RelatorioMedicaoFiscal
              },
              {
                id: 'relatorios-medicao-fiscal-tanque',
                name: 'Tanque',
                routeName: `${ERoutes.RELATORIO}/${ERoutes.MEDICAO_FISCAL}/${EMedicaoFiscal.TANQUE}`,
                isVisible: this.isVisible_RelatorioMedicaoFiscal
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'relatorios-transferencia-fiscais-tanque',
            isVisible: this.isVisible_RelatorioTransferenciaFiscaisTanque,
            name: 'Transferências Fiscais de Tanque',
            routeName: `${ERoutes.RELATORIO}/${ERoutes.TRANSFERENCIA_FISCAL_TANQUE}`
          },
          {
            id: 'relatorios-mtbf',
            isVisible: this.isVisible_RelatorioMTBF,
            name: 'MTBF',
            routeName: `${ERoutes.RELATORIO}/${ERoutes.MTBF}`
          },
          {
            id: 'relatorios-perda',
            isVisible: this.isVisible_RelatorioPerda,
            name: 'Perdas',
            routeName: `${ERoutes.RELATORIO}/${ERoutes.PERDA}`
          },
          {
            id: 'relatorios-producao-diaria',
            name: 'Produções Diárias',
            routeName: `${ERoutes.RELATORIO}/${ERoutes.PRODUCAO_DIARIA}`,
            isVisible: this.isVisible_RelatorioProducoesDiarias
          }
        ]
      },
      {
        id: 'gestao-prazos',
        moduleName: SidebarModulesName.GESTAO_DE_PRAZOS,
        iconName: 'hourglass_bottom',
        hasSubtopics: true,
        hasTopics: true,
        isOpen: false,
        isVisible: this.isVisible_GestaoPrazos,
        topics: [
          {
            id: 'gestao-prazos-analise-quimica',
            moduleName: SidebarModulesName.ANALISE_QUIMICA,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoPrazoAnaliseQuimica,
            subtopics: [
              {
                id: 'gestao-prazos-analise-quimica-bsw',
                isVisible: this.isVisible_GestaoPrazoBSW,
                name: 'BSW',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.BSW}`
              },
              {
                id: 'gestao-prazos-analise-quimica-fers',
                isVisible: this.isVisible_GestaoPrazoFERS,
                name: 'FE & RS',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.FERS}`
              }
            ]
          },
          {
            id: 'gestao-prazos-medicao-fiscal',
            moduleName: SidebarModulesName.MEDICAO_FISCAL,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoPrazoMedicaoFiscal,
            subtopics: [
              {
                id: 'gestao-prazos-medicao-fiscal-medicoes-fiscais-linha-gas',
                isVisible: this.isVisible_GestaoPrazoMedicaoFiscalLinha,
                name: 'Linha | Gás',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.MEDICAO_FISCAL_LINHA_GAS}`
              },
              {
                id: 'gestao-prazos-medicao-fiscal-medicoes-fiscais-linha-oleo',
                isVisible: this.isVisible_GestaoPrazoMedicaoFiscalLinha,
                name: 'Linha | Óleo',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.MEDICAO_FISCAL_LINHA_OLEO}`
              },
              {
                id: 'gestao-prazos-medicao-fiscal-medicoes-fiscais-tanque',
                isVisible: this.isVisible_GestaoPrazoMedicaoFiscalTanque,
                name: 'Tanque',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.MEDICAO_FISCAL_TANQUE}`
              }
            ]
          },
          {
            id: 'gestao-prazos-teste-poco',
            moduleName: SidebarModulesName.TESTE_POCO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoPrazoTestePoco,
            subtopics: [
              {
                id: 'gestao-prazos-teste-poco-teste',
                isVisible: this.isVisible_GestaoPrazoTestePocoTeste,
                name: 'Teste',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.TESTE_POCO}/${ERoutes.TESTE}`
              },
              {
                id: 'gestao-prazos-teste-poco-envio',
                isVisible: this.isVisible_GestaoPrazoTestePocoEnvio,
                name: 'Envio',
                routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.TESTE_POCO}/${ERoutes.ENVIO}`
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'gestao-prazos-instrumento',
            isVisible: this.isVisible_GestaoPrazoInstrumento,
            name: 'Calibração de Instrumentos',
            routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.INSTRUMENTO}`
          },
          {
            id: 'gestao-prazos-gas-ventilado',
            isVisible: this.isVisible_GestaoPrazoGasVentilado,
            name: 'Gás Ventilado',
            routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.GAS_VENTILADO}`
          },
          {
            id: 'gestao-prazos-parada',
            isVisible: this.isVisible_GestaoPrazoParada,
            name: 'Paradas',
            routeName: `${ERoutes.GESTAO_PRAZOS}/${ERoutes.PARADA}`
          }
        ]
      },
      {
        id: 'gestao-cartas',
        moduleName: SidebarModulesName.GESTAO_CARTAS,
        iconName: 'email',
        hasTopics: true,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_GestaoCartas,
        topics: [
          {
            id: 'gestao-cartas-cadastro',
            moduleName: SidebarModulesName.CADASTRO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_GestaoCartasCadastro,
            subtopics: [
              {
                id: 'gestao-cartas-cadastro-superintendencia',
                name: 'Superintendências',
                routeName: ERoutes.SUPERINTENDENCIA,
                isVisible: this.isVisible_Superintendencia
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'gestao-cartas-enviadas',
            name: 'Enviadas',
            routeName: `${ERoutes.GESTAO_CARTA}/${ETipoCarta.ENVIADA}`,
            isVisible: this.isVisible_CartasEnviadas
          },
          {
            id: 'gestao-cartas-recebidas',
            name: 'Recebidas',
            routeName: `${ERoutes.GESTAO_CARTA}/${ETipoCarta.RECEBIDA}`,
            isVisible: this.isVisible_CartasRecebidas
          }
        ]
      },
      {
        id: 'reservatorio',
        moduleName: SidebarModulesName.RESERVATORIO,
        iconName: 'oil_barrel',
        hasTopics: true,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_Reservatorio,
        topics: [
          {
            id: 'reservatorio-cadastro',
            moduleName: SidebarModulesName.CADASTRO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_ReservatorioCadastro,
            subtopics: [
              {
                id: 'reservatorio-cadastro-pap',
                name: 'PAP',
                routeName: ERoutes.PAP,
                isVisible: this.isVisible_PAP
              },
              {
                id: 'reservatorio-cadastro-rgos',
                name: 'RGOs',
                isVisible: this.isVisible_RGO,
                routeName: ERoutes.RGO
              },
              {
                id: 'reservatorio-cadastro-reservatorios',
                name: 'Reservatórios',
                routeName: ERoutes.RESERVATORIO,
                isVisible: this.isVisible_Reservatorios
              },
              {
                id: 'reservatorio-cadastro-zonas-produtoras',
                name: 'Zonas Produtoras',
                routeName: ERoutes.ZONA_PRODUTORA,
                isVisible: this.isVisible_ZonasProdutoras
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'reservatorio-potencial',
            name: 'Potenciais',
            routeName: ERoutes.POTENCIAL,
            isVisible: this.isVisible_Potencial
          },
          {
            id: 'reservatorio-cadastro-associar-zonas',
            name: 'Associar Zonas',
            routeName: ERoutes.POCO_ZONA,
            isVisible: this.isVisible_AssociarZonas
          }
        ]
      },
      {
        id: 'equipamento',
        moduleName: SidebarModulesName.EQUIPAMENTO,
        iconName: 'construction',
        hasTopics: true,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_Equipamento,
        topics: [
          {
            id: 'equipamento-gestao-lacres',
            moduleName: SidebarModulesName.GESTAO_DE_LACRES,
            iconName: '',
            hasSubtopics: true,
            hasTopics: false,
            isOpen: false,
            isVisible: this.isVisible_GestaoLacres,
            subtopics: [
              {
                id: 'equipamento-gestao-lacres-geracao',
                name: 'Geração de Lacres',
                routeName: ERoutes.GESTAO_LACRES,
                isVisible: this.isVisible_Lotes
              },
              {
                id: 'equipamento-gestao-lacres-instalados-removidos',
                name: 'Instalação e Remoção de Lacres',
                routeName: `${ERoutes.GESTAO_LACRES}/${ERoutes.INSTALACAO_REMOCAO}`,
                isVisible: this.isVisible_Lacres
              },
              {
                id: 'equipamento-gestao-lacres-fornecedores',
                name: 'Fornecedores',
                routeName: `${ERoutes.FORNECEDORES}`,
                isVisible: this.isVisible_Fornecedores
              }
            ]
          },
          {
            id: 'equipamento-instrumento',
            moduleName: SidebarModulesName.INSTRUMENTOS,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_instrumentos,
            subtopics: [
              {
                id: 'equipamento-instrumento-computador-vazao',
                name: 'Computador de Vazão',
                routeName: ERoutes.INSTRUMENTO_COMPUTADOR_VAZAO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-elemento-temperatura',
                name: 'Elemento de Temperatura',
                routeName: ERoutes.INSTRUMENTO_ELEMENTO_TEMPERATURA,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-manometro',
                name: 'Manômetro',
                routeName: ERoutes.INSTRUMENTO_MANOMETRO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-medidor-vazao-coriolis',
                name: 'Medidor de Vazão Coriolis',
                routeName: ERoutes.INSTRUMENTO_MEDIDOR_VAZAO_CORIOLIS,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-medidor-vazao-rotativo',
                name: 'Medidor de Vazão Rotativo',
                routeName: ERoutes.INSTRUMENTO_MEDIDOR_VAZAO_ROTATIVO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-mvs',
                name: 'MVS',
                routeName: ERoutes.INSTRUMENTO_MVS,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-placa-orificio',
                name: 'Placa de Orifício',
                routeName: ERoutes.INSTRUMENTO_PLACA_ORIFICIO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-regua',
                name: 'Régua',
                routeName: ERoutes.INSTRUMENTO_REGUA,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-tanque',
                name: 'Tanque',
                routeName: ERoutes.INSTRUMENTO_TANQUE,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-termometro',
                name: 'Termômetro',
                routeName: ERoutes.INSTRUMENTO_TERMOMETRO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-termometro-costado-tanque',
                name: 'Termômetro do Costado do Tanque',
                routeName: ERoutes.INSTRUMENTO_TERMOMETRO_COSTADO_TANQUE,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-termometro-imersao-tanque',
                name: 'Termômetro de Imersão do Tanque',
                routeName: ERoutes.INSTRUMENTO_TERMOMETRO_IMERSAO_TANQUE,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-transmissor-nivel',
                name: 'Transmissor de Nível',
                routeName: ERoutes.INSTRUMENTO_TRANSMISSOR_DE_NIVEL,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-transmissor-diferencial-pressao',
                name: 'Transmissor de Pressão Diferencial',
                routeName: ERoutes.INSTRUMENTO_TRANSMISSOR_DIFERENCIAL_PRESSAO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-transmissor-pressao',
                name: 'Transmissor de Pressão',
                routeName: ERoutes.INSTRUMENTO_TRANSMISSOR_PRESSAO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-transmissor-temperatura',
                name: 'Transmissor de Temperatura',
                routeName: ERoutes.INSTRUMENTO_TRANSMISSOR_TEMPERATURA,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-trecho-reto',
                name: 'Trecho Reto',
                routeName: ERoutes.INSTRUMENTO_TRECHO_RETO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-trena',
                name: 'Trena',
                routeName: ERoutes.INSTRUMENTO_TRENA,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-turbidimetro',
                name: 'Turbidímetro',
                routeName: ERoutes.INSTRUMENTO_TURBIDIMETRO,
                isVisible: this.isVisible_instrumentos
              },
              {
                id: 'equipamento-instrumento-valvula',
                name: 'Válvula',
                routeName: ERoutes.INSTRUMENTO_VALVULA,
                isVisible: this.isVisible_instrumentos
              }
            ]
          },
          {
            id: 'equipamento-laboratorio',
            moduleName: SidebarModulesName.EQUIPAMENTO_LABORATORIO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_laboratorio_equipamentos,
            subtopics: [
              {
                id: 'equipamento-laboratorio-balanca',
                name: 'Balança',
                routeName: ERoutes.EQUIPAMENTO_BALANCA,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-banho-maria',
                name: 'Banho Maria',
                routeName: ERoutes.EQUIPAMENTO_BANHO_MARIA,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-bequer',
                name: 'Bequer',
                routeName: ERoutes.EQUIPAMENTO_BEQUER,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-bomba-vacuo',
                name: 'Bomba Vácuo',
                routeName: ERoutes.EQUIPAMENTO_BOMBA_VACUO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-centrifuga',
                name: 'Centrífuga',
                routeName: ERoutes.EQUIPAMENTO_CENTRIFUGA,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-cilindro',
                name: 'Cilindro',
                routeName: ERoutes.EQUIPAMENTO_CILINDRO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-cromatografo',
                name: 'Cromatógrafo',
                routeName: ERoutes.EQUIPAMENTO_CROMATOGRAFO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-densimetro-digital',
                name: 'Densímetro Digital',
                routeName: ERoutes.EQUIPAMENTO_DENSIMETRO_DIGITAL,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-densimetro',
                name: 'Densímetro',
                routeName: ERoutes.EQUIPAMENTO_DENSIMETRO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-estufa',
                name: 'Estufa',
                routeName: ERoutes.EQUIPAMENTO_ESTUFA,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-phmetro',
                name: 'PHmetro',
                routeName: ERoutes.EQUIPAMENTO_PHMETRO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-proveta',
                name: 'Proveta',
                routeName: ERoutes.EQUIPAMENTO_PROVETA,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-salimetro',
                name: 'Salímetro',
                routeName: ERoutes.EQUIPAMENTO_SALIMETRO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-termometro',
                name: 'Termômetro',
                routeName: ERoutes.EQUIPAMENTO_TERMOMETRO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-titrando',
                name: 'Titrando',
                routeName: ERoutes.EQUIPAMENTO_TITRANDO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-titrino',
                name: 'Titrino',
                routeName: ERoutes.EQUIPAMENTO_TITRINO,
                isVisible: this.isVisible_laboratorio_equipamentos
              },
              {
                id: 'equipamento-laboratorio-tubo',
                name: 'Tubo',
                routeName: ERoutes.EQUIPAMENTO_TUBO,
                isVisible: this.isVisible_laboratorio_equipamentos
              }
            ]
          },
          {
            id: 'equipamento-superficie',
            moduleName: SidebarModulesName.EQUIPAMENTO_SUPERFICIE,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_superficie_equipamentos,
            subtopics: [
              {
                id: 'equipamento-superficie-fabricantes',
                isVisible: this.isVisible_Fabricantes,
                name: 'Fabricantes',
                routeName: ERoutes.FABRICANTE
              },
              {
                id: 'equipamento-superficie-cabecotes',
                name: 'Cabeçotes',
                routeName: ERoutes.CABECOTE,
                isVisible: this.isVisible_Cabecote
              },
              {
                id: 'equipamento-transformadores',
                name: 'Transformadores',
                routeName: ERoutes.TRANSFORMADOR,
                isVisible: this.isVisible_Transformador
              },
              {
                id: 'equipamento-unidades-bombeio',
                name: 'Unidades de Bombeio',
                routeName: ERoutes.UNIDADE_BOMBEIO,
                isVisible: this.isVisible_UnidadesBombeio
              }
            ]
          }
        ],
        subtopics: [
          {
            id: 'equipamento-tags',
            name: 'Tags',
            routeName: ERoutes.TAG,
            isVisible: this.isVisible_Tags
          },
          {
            id: 'equipamento-pontos-medicao',
            name: 'Pontos de Medição',
            routeName: ERoutes.PONTO_MEDICAO,
            isVisible: this.isVisible_PontosMedicao
          }
        ]
      },
      {
        id: 'laboratorio',
        moduleName: SidebarModulesName.LABORATORIO,
        iconName: 'science',
        hasTopics: false,
        hasSubtopics: true,
        isOpen: false,
        isVisible: this.isVisible_Laboratorio,
        subtopics: [
          {
            id: 'laboratorio-amostras',
            name: 'Amostras',
            routeName: ERoutes.AMOSTRA,
            isVisible: this.isVisible_Amostras
          },
          {
            id: 'laboratorio-analise-bsws',
            name: 'BSWs',
            routeName: ERoutes.BSW,
            isVisible: this.isVisible_BSWs
          },
          {
            id: 'laboratorio-cromatografia',
            name: 'Cromatografias',
            routeName: ERoutes.CROMATOGRAFIA,
            isVisible: this.isVisible_Cromatografias
          },
          {
            id: 'laboratorio-amostras-densidade',
            name: 'Densidades & Grau API',
            routeName: ERoutes.DENSIDADE,
            isVisible: this.isVisible_Densidades
          },
          {
            id: 'laboratorio-fers',
            name: 'FE & RS',
            isVisible: this.isVisible_FERSs,
            routeName: ERoutes.FERS
          },
          {
            id: 'laboratorio-h2s',
            name: 'H2S',
            isVisible: this.isVisible_H2Ss,
            routeName: ERoutes.H2S
          },
          {
            id: 'laboratorio-salinidade',
            name: 'Salinidade',
            isVisible: this.isVisible_Salinidades,
            routeName: ERoutes.SALINIDADE
          }
        ]
      },
      {
        id: 'administracao',
        moduleName: SidebarModulesName.ADMINISTRACAO,
        iconName: 'groups',
        hasTopics: true,
        hasSubtopics: false,
        isOpen: false,
        isVisible: this.isVisible_Administracao,
        topics: [
          {
            id: 'administracao-cadastro',
            moduleName: SidebarModulesName.CADASTRO,
            iconName: '',
            hasTopics: false,
            hasSubtopics: true,
            isOpen: false,
            isVisible: this.isVisible_AdministracaoCadastro,
            subtopics: [
              {
                id: 'administracao-cadastro-cargos',
                name: 'Cargos',
                routeName: ERoutes.CARGO,
                isVisible: this.isVisible_Cargos
              },
              {
                id: 'administracao-cadastro-colaboradores',
                name: 'Colaboradores',
                routeName: ERoutes.COLABORADOR,
                isVisible: this.isVisible_Colaboradores
              },
              {
                id: 'administracao-cadastro-empresas',
                name: 'Empresas',
                routeName: ERoutes.EMPRESA,
                isVisible: this.isVisible_Empresas
              },
              {
                id: 'administracao-cadastro-perfis',
                name: 'Perfis',
                routeName: ERoutes.PERFIL,
                isVisible: this.isVisible_Perfis
              },
              {
                id: 'administracao-cadastro-usuarios',
                name: 'Usuários',
                routeName: ERoutes.USUARIO,
                isVisible: this.isVisible_Usuarios
              }
            ]
          }
        ],
        subtopics: []
      }
    ];
  }

  getRoutes() {
    this.updatePermission();
    this.sidebarRouting = this.createSideBar();
    return this.sidebarRouting.filter((f) => f.isVisible);
  }

  hasAnyPermission(ePermission: EPermissions[]) {
    return this.permissionService.userHasPermissions(ePermission);
  }

  validateSearch(modules: SidebarModuleRoutingType[], textSearch: string) {
    return modules.filter((module) => {
      if (compareStrings(module.moduleName, textSearch)) {
        return module;
      }
      if (module.hasSubtopics && module.subtopics.filter((subtopic) => compareStrings(subtopic.name, textSearch)).length > 0) {
        module.isOpen = true;
        return module;
      }
      if (module.hasTopics) {
        if (
          module.topics.filter((topic) => {
            if (topic.hasSubtopics) {
              if (topic.subtopics.filter((subtopic) => compareStrings(subtopic.name, textSearch)).length > 0) {
                module.isOpen = true;
                topic.isOpen = true;
                return module;
              }
            }
          }).length > 0
        ) {
          module.isOpen = true;
          return module;
        }
        if (module.topics.filter((topic) => compareStrings(topic.moduleName, textSearch)).length > 0) {
          module.isOpen = true;
          return module;
        }
      }
    });
  }

  // prettier-ignore
  private updatePermission() {
    //dashboard
    this.isVisible_Dashboard = true;

    //Gestão da Produção > Cadastro
    this.isVisible_Campos = this.hasAnyPermission([EPermissions.VISUALIZAR_CAMPO]);
    this.isVisible_InstalacaoDestinoTransferencia = this.hasAnyPermission([EPermissions.VISUALIZAR_INSTALACAO_DESTINO_TRANSFERENCIA]);
    this.isVisible_Estacoes = this.hasAnyPermission([EPermissions.VISUALIZAR_ESTACAO]);
    this.isVisible_Pocos = this.hasAnyPermission([EPermissions.VISUALIZAR_POCO]);
    this.isVisible_Cluster = this.hasAnyPermission([EPermissions.VISUALIZAR_CLUSTER]);
    this.isVisible_No = this.hasAnyPermission([EPermissions.VISUALIZAR_NO]);

    this.isVisible_GestaoProducaoCadastro = this.isVisible_Estacoes || this.isVisible_InstalacaoDestinoTransferencia || this.isVisible_Campos || this.isVisible_Pocos || this.isVisible_Cluster || this.isVisible_No;

    //Gestão da Produção > Gestão de fluidos
    this.isVisible_Captacao = this.hasAnyPermission([EPermissions.VISUALIZAR_CAPTACAO]);
    this.isVisible_InjecaoAguaVapor = this.hasAnyPermission([EPermissions.VISUALIZAR_INJECAO]);

    this.isVisible_GestaoProducaoGestaoFluido = this.isVisible_Captacao || this.isVisible_InjecaoAguaVapor;

    //Gestão da Produção > Classificação de Falhas
    this.isVisible_GrupoPerda = this.hasAnyPermission([EPermissions.VISUALIZAR_GRUPO_PERDA])
    this.isVisible_SubgrupoPerda = this.hasAnyPermission([EPermissions.VISUALIZAR_SUBGRUPO_PERDA])

    this.isVisible_ClassificacaoPerda = this.isVisible_GrupoPerda || this.isVisible_SubgrupoPerda

    //Gestão da Produção > Medições
    this.isVisible_MedicaoAgua = this.hasAnyPermission([EPermissions.VISUALIZAR_MEDICAO_AGUA]);
    this.isVisible_GasVentilado = this.hasAnyPermission([EPermissions.VISUALIZAR_BOLETIM_GAS_VENTILADO]);

    //Gestão da Produção > Medições > Fiscais
    this.isVisible_MedicoesFiscaisLinhaGas = this.hasAnyPermission([EPermissions.VISUALIZAR_MEDICAO_FISCAL_LINHA]);
    this.isVisible_MedicoesFiscaisLinhaOleo = this.hasAnyPermission([EPermissions.VISUALIZAR_MEDICAO_FISCAL_LINHA]);
    this.isVisible_MedicoesFiscaisTanque = this.hasAnyPermission([EPermissions.VISUALIZAR_MEDICAO_FISCAL_TANQUE]);

    this.isVisible_GestaoProducaoMedicaoFiscal = this.isVisible_MedicoesFiscaisLinhaGas || this.isVisible_MedicoesFiscaisLinhaOleo ||  this.isVisible_MedicoesFiscaisTanque;
    this.isVisible_GestaoProducaoMedicao = this.isVisible_GestaoProducaoMedicaoFiscal || this.isVisible_MedicaoAgua || this.isVisible_GasVentilado ;

    //Gestão da Produção
    this.isVisible_ConsumoMedicaoIBU = this.hasAnyPermission([EPermissions.VISUALIZAR_CONSUMO_IBU]);
    this.isVisible_Paradas = this.hasAnyPermission([EPermissions.VISUALIZAR_PARADA_DE_POCO]);
    this.isVisible_Sonolog = this.hasAnyPermission([EPermissions.VISUALIZAR_SONOLOG]);
    this.isVisible_GestaoFalhas = this.hasAnyPermission([EPermissions.VISUALIZAR_FALHA]);
    this.isVisible_TestesPoco = this.hasAnyPermission([EPermissions.VISUALIZAR_TESTE_POCO]);
    this.isVisible_ConsumoMedicaoIBU = this.hasAnyPermission([EPermissions.VISUALIZAR_CONSUMO_IBU]);

    this.isVisible_ConfigSuperficiePoco = this.hasAnyPermission([EPermissions.VISUALIZAR_CONFIG_SUPERFICIE_POCO])


    this.isVisible_GestaoProducao =
      this.isVisible_GestaoProducaoCadastro ||
      this.isVisible_GestaoProducaoGestaoFluido ||
      this.isVisible_GestaoProducaoMedicao ||
      this.isVisible_ConsumoMedicaoIBU ||
      this.isVisible_Paradas ||
      this.isVisible_Sonolog ||
      this.isVisible_GestaoFalhas ||
      this.isVisible_TestesPoco ||
      this.isVisible_ConfigSuperficiePoco ||
      this.isVisible_Cluster ||
      this.isVisible_No

    //Fechamento da Produção
    this.isVisible_AcompanhamentoPocos = this.hasAnyPermission([EPermissions.ACOMPANHAMENTO_POCO]);
    this.isVisible_BMP = this.hasAnyPermission([EPermissions.GERAR_BMP]);
    this.isVisible_InjecaoDiaria = this.hasAnyPermission([EPermissions.INJECAO_DIARIA_DE_PRODUCAO]);
    this.isVisible_ProducaoDiaria = this.hasAnyPermission([EPermissions.PRODUCAO_DIARIA_DE_PRODUCAO]);
    this.isVisible_FechamentoProducao = this.isVisible_ProducaoDiaria || this.isVisible_InjecaoDiaria || this.isVisible_BMP || this.isVisible_AcompanhamentoPocos;

    // Relatórios
    this.isVisible_RelatorioTransferenciaFiscaisTanque  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_TRANSFERENCIA_FISCAL_TANQUE])
    this.isVisible_RelatorioMedicaoFiscal  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_MEDICAO_FISCAL])
    this.isVisible_RelatorioMTBF  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_MTBF])
    this.isVisible_RelatorioPerda  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_PERDA])
    this.isVisible_RelatorioProducoesDiarias  = this.hasAnyPermission([EPermissions.PRODUCAO_DIARIA_DE_PRODUCAO])
    this.isVisible_RelatorioInjecoesDiarias  = this.hasAnyPermission([EPermissions.INJECAO_DIARIA_DE_PRODUCAO])

    this.isVisible_Relatorios = this.isVisible_RelatorioTransferenciaFiscaisTanque || this.isVisible_RelatorioMedicaoFiscal || this.isVisible_RelatorioMTBF ||
      this.isVisible_RelatorioPerda || this.isVisible_RelatorioProducoesDiarias || this.isVisible_RelatorioInjecoesDiarias;

    // Gestão de Prazos
    this.isVisible_GestaoPrazoBSW  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_BSW])
    this.isVisible_GestaoPrazoFERS  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_FERS])
    this.isVisible_GestaoPrazoAnaliseQuimica = this.isVisible_GestaoPrazoBSW || this.isVisible_GestaoPrazoFERS

    this.isVisible_GestaoPrazoMedicaoFiscalLinha  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_MEDICAO_LINHA])
    this.isVisible_GestaoPrazoMedicaoFiscalTanque  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_MEDICAO_TANQUE])
    this.isVisible_GestaoPrazoMedicaoFiscal  = this.isVisible_GestaoPrazoMedicaoFiscalLinha || this.isVisible_GestaoPrazoMedicaoFiscalTanque

    this.isVisible_GestaoPrazoTestePocoTeste  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_TESTE_POCO])
    this.isVisible_GestaoPrazoTestePocoEnvio  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_ENVIO_TESTE_POCO])
    this.isVisible_GestaoPrazoTestePoco  = this.isVisible_GestaoPrazoTestePocoTeste || this.isVisible_GestaoPrazoTestePocoEnvio

    this.isVisible_GestaoPrazoInstrumento  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_INSTRUMENTO])
    this.isVisible_GestaoPrazoGasVentilado  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_GAS_VENTILADO])
    this.isVisible_GestaoPrazoParada  = this.hasAnyPermission([EPermissions.GERAR_RELATORIO_GESTAO_PRAZO_PARADA])

    this.isVisible_GestaoPrazos = this.isVisible_GestaoPrazoAnaliseQuimica || this.isVisible_GestaoPrazoMedicaoFiscal ||
      this.isVisible_GestaoPrazoTestePoco || this.isVisible_GestaoPrazoInstrumento || this.isVisible_GestaoPrazoGasVentilado || this.isVisible_GestaoPrazoParada;

    //Gestão de Cartas > cadastro
    this.isVisible_Superintendencia = this.hasAnyPermission([EPermissions.VISUALIZAR_SUPERINTENDENCIA])
    this.isVisible_GestaoCartasCadastro = this.isVisible_Superintendencia

    //Gestão de Cartas
    this.isVisible_CartasEnviadas = this.hasAnyPermission([EPermissions.VISUALIZAR_GESTAO_CARTA])
    this.isVisible_CartasRecebidas = this.hasAnyPermission([EPermissions.VISUALIZAR_GESTAO_CARTA])

    this.isVisible_GestaoCartas = this.isVisible_GestaoCartasCadastro || this.isVisible_CartasEnviadas || this.isVisible_CartasRecebidas

    //Reservatório > Cadastro
    this.isVisible_Reservatorios = this.hasAnyPermission([EPermissions.VISUALIZAR_RESERVATORIO]);
    this.isVisible_RGO = this.hasAnyPermission([EPermissions.VISUALIZAR_RGO])
    this.isVisible_ZonasProdutoras = this.hasAnyPermission([EPermissions.VISUALIZAR_ZONA_PRODUTORA]);
    this.isVisible_PAP = this.hasAnyPermission([EPermissions.VISUALIZAR_PAP])
    this.isVisible_ReservatorioCadastro = this.isVisible_ZonasProdutoras  || this.isVisible_Reservatorios || this.isVisible_RGO || this.isVisible_PAP;

    //Reservatório
    this.isVisible_Potencial = this.hasAnyPermission([EPermissions.VISUALIZAR_POTENCIAL]);
    this.isVisible_AssociarZonas = this.hasAnyPermission([EPermissions.VISUALIZAR_ZONA]);
    this.isVisible_Reservatorio = this.isVisible_ReservatorioCadastro || this.isVisible_Potencial || this.isVisible_AssociarZonas;

    //Equipamento > Laboratório
    this.isVisible_laboratorio_equipamentos = this.hasAnyPermission([EPermissions.VISUALIZAR_EQUIPAMENTO]);

    //Equipamento > Instrumentos
    this.isVisible_instrumentos = this.hasAnyPermission([EPermissions.VISUALIZAR_INSTRUMENTO]);

    //Equipamento > Superfície
    this.isVisible_Cabecote = this.hasAnyPermission([EPermissions.VISUALIZAR_CABECOTE]);
    this.isVisible_Transformador = this.hasAnyPermission([EPermissions.VISUALIZAR_TRANSFORMADOR]);
    this.isVisible_UnidadesBombeio = this.hasAnyPermission([EPermissions.VISUALIZAR_UNIDADE_BOMBEIO]);
    this.isVisible_Fabricantes = this.hasAnyPermission([EPermissions.VISUALIZAR_FABRICANTE])
    this.isVisible_superficie_equipamentos = this.isVisible_Cabecote || this.isVisible_Transformador  || this.isVisible_UnidadesBombeio || this.isVisible_Fabricantes;

    //Equipamento
    this.isVisible_Tags = this.hasAnyPermission([EPermissions.VISUALIZAR_TAG]);
    this.isVisible_PontosMedicao = this.hasAnyPermission([EPermissions.VISUALIZAR_PONTO_MEDICAO]);
    this.isVisible_Lotes = this.hasAnyPermission([EPermissions.VISUALIZAR_LOTE])
    this.isVisible_Lacres = this.hasAnyPermission([EPermissions.VISUALIZAR_LACRE])
    this.isVisible_Fornecedores = this.hasAnyPermission([EPermissions.VISUALIZAR_FORNECEDOR])
    this.isVisible_GestaoLacres = this.isVisible_Lotes || this.isVisible_Lacres || this.isVisible_Fornecedores
    //this.isVisible_Manometros = this.hasAnyPermission([EPermissions.CADASTRAR_MANOMETRO, EPermissions.EDITAR_MANOMETRO, EPermissions.APAGAR_MANOMETRO]);
    this.isVisible_Equipamento =
      this.isVisible_laboratorio_equipamentos || this.isVisible_instrumentos || this.isVisible_superficie_equipamentos || this.isVisible_Tags || this.isVisible_PontosMedicao || this.isVisible_GestaoLacres;

    //Administração > Cadastro
    this.isVisible_Empresas = this.hasAnyPermission([EPermissions.VISUALIZAR_EMPRESA]);
    this.isVisible_Colaboradores = this.hasAnyPermission([EPermissions.VISUALIZAR_COLABORADOR]);
    this.isVisible_Usuarios = this.hasAnyPermission([EPermissions.VISUALIZAR_USUARIO]);
    this.isVisible_Cargos = this.hasAnyPermission([EPermissions.VISUALIZAR_CARGO]);
    this.isVisible_Perfis = this.hasAnyPermission([EPermissions.VISUALIZAR_PERFIL]);

    this.isVisible_AdministracaoCadastro =
      this.isVisible_Empresas || this.isVisible_Colaboradores || this.isVisible_Usuarios || this.isVisible_Cargos || this.isVisible_Perfis;

    this.isVisible_Administracao = this.isVisible_AdministracaoCadastro;

    //Laboratório
    this.isVisible_Amostras = this.hasAnyPermission([EPermissions.VISUALIZAR_AMOSTRA]);
    this.isVisible_BSWs = this.hasAnyPermission([EPermissions.VISUALIZAR_BSW]);
    this.isVisible_Cromatografias = this.hasAnyPermission([EPermissions.VISUALIZAR_CROMATOGRAFIA]);
    this.isVisible_Densidades = this.hasAnyPermission([EPermissions.VISUALIZAR_DENSIDADE]);
    this.isVisible_FERSs = this.hasAnyPermission([EPermissions.VISUALIZAR_FERS]);
    this.isVisible_H2Ss = this.hasAnyPermission([EPermissions.VISUALIZAR_H2S]);
    this.isVisible_Salinidades = this.hasAnyPermission([EPermissions.VISUALIZAR_SALINIDADE]);

    this.isVisible_Laboratorio = this.isVisible_Amostras || this.isVisible_BSWs || this.isVisible_Cromatografias || this.isVisible_Densidades || this.isVisible_FERSs || this.isVisible_H2Ss || this.isVisible_Salinidades;

    // Catálogo de Oportunidades
    this.isVisible_Locacao = this.hasAnyPermission([EPermissions.VISUALIZAR_LOCACAO])
    this.isVisible_TiposProjetos = this.hasAnyPermission([EPermissions.VISUALIZAR_TIPO_PROJETO])
    this.isVisible_Pacote_Projeto = this.hasAnyPermission([EPermissions.VISUALIZAR_PACOTE_PROJETO])
    this.isVisible_CadastroCatalogoOportunidades = this.isVisible_Locacao || this.isVisible_TiposProjetos || this.isVisible_Pacote_Projeto
    this.isVisible_CatalogoOportunidades = this.isVisible_CadastroCatalogoOportunidades
  }
}
