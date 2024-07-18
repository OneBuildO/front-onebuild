export enum ERoutes {
  PATH_AUTH = 'auth',
  PATH_PRIVATE = '',
  LOGIN = 'login',
  RECUPERAR_ACESSO = 'recuperar-acesso',
  ALTERAR_SENHA = 'alterar-senha',
  HOME = 'home',
  AMOSTRA = 'amostra',
  EMPRESA = 'empresa',
  CARGO = 'cargo',
  FERS = 'fers',
  CROMATOGRAFIA = 'cromatografia',
  ESTACAO = 'estacao',
  TAG = 'tag',
  MANOMETRO = 'manometro',
  CAMPO = 'campo',
  PERFIL = 'perfil',
  ZONA_PRODUTORA = 'zona-produtora',
  PONTO_MEDICAO = 'ponto-medicao',
  ALTERAR_INSTRUMENTO = 'alterar-instrumento',
  ALTERAR_ESTADO = 'alterar-estado',
  MEDICAO_FISCAL_LINHA_GAS = 'medicao-fiscal-linha-gas',
  MEDICAO_FISCAL_LINHA_OLEO = 'medicao-fiscal-linha-oleo',
  MEDICAO_FISCAL = 'medicao-fiscal',
  TRANSFERENCIA_FISCAL_TANQUE = 'transferencia-fiscal-tanque',
  CLUSTER = 'cluster',
  POCO = 'poco',
  PARADA = 'parada',
  MEDICAO_FISCAL_TANQUE = 'medicao-fiscal-tanque',
  INJECAO = 'injecao',
  CICLOS = 'ciclos',
  COLABORADOR = 'colaborador',
  USUARIO = 'usuario',
  TESTE_POCO = 'teste-poco',
  RESERVATORIO = 'reservatorio',
  CAPTACAO = 'captacao',
  DENSIDADE = 'densidade',
  RGO = 'rgo',
  BSW = 'bsw',
  CRIAR = 'criar',
  IMPORTAR = 'importar',
  EDITAR = 'editar',
  DETALHAR = 'detalhar',
  VALIDAR = 'validar',
  ENCERRAR = 'encerrar',
  CALIBRACOES = 'calibracoes',
  DIAGNOSTICAR = 'diagnosticar',
  CARACTERISTICA = 'caracteristica',
  POCO_ZONA = 'associacao-zonas',
  MEDICAO_AGUA = 'medicao-agua',
  CONSUMO_IBU = 'consumo-ibu',
  PRODUCAO_DIARIA = 'producao-diaria',
  BMP = 'BMP',
  CONSOLIDACAO = 'consolidacao',
  JUSTIFICATIVA = 'justificativa',
  INJECAO_DIARIA = 'injecao-diaria',
  INJECAO_DIARIA_AGUA = 'injecao-diaria-agua',
  INJECAO_DIARIA_VAPOR = 'injecao-diaria-vapor',
  EQUIPAMENTO_BALANCA = 'equipamento-balanca',
  EQUIPAMENTO_BANHO_MARIA = 'equipamento-banho-maria',
  EQUIPAMENTO_BEQUER = 'equipamento-bequer',
  EQUIPAMENTO_BOMBA_VACUO = 'equipamento-bomba-vacuo',
  EQUIPAMENTO_CENTRIFUGA = 'equipamento-centrifuga',
  EQUIPAMENTO_CILINDRO = 'equipamento-cilindro',
  EQUIPAMENTO_CROMATOGRAFO = 'equipamento-cromatografo',
  EQUIPAMENTO_DENSIMETRO_DIGITAL = 'equipamento-densimetro-digital',
  EQUIPAMENTO_DENSIMETRO = 'equipamento-densimetro',
  EQUIPAMENTO_ESTUFA = 'equipamento-estufa',
  EQUIPAMENTO_PHMETRO = 'equipamento-phmetro',
  EQUIPAMENTO_PROVETA = 'equipamento-proveta',
  EQUIPAMENTO_SALIMETRO = 'equipamento-salimetro',
  EQUIPAMENTO_TERMOMETRO = 'equipamento-termometro',
  EQUIPAMENTO_TITRANDO = 'equipamento-titrando',
  EQUIPAMENTO_TITRINO = 'equipamento-titrino',
  EQUIPAMENTO_TUBO = 'equipamento-tubo',
  H2S = 'h2s',
  SALINIDADE = 'salinidade',
  SONOLOG = 'sonolog',
  GAS_VENTILADO = 'gas-ventilado',
  ACOMPANHAMENTO_POCO = 'acompanhamento-poco',
  BRA = 'bra',
  RELATORIO = 'relatorio',
  PAP = 'pap',
  UNIDADE_BOMBEIO = 'unidade-bombeio',
  CONFIGURACAO_SUPERFICIE_POCO = 'configuracao-superficie',
  TRANSFORMADOR = 'transformador',
  CABECOTE = 'cabecote',
  FABRICANTE = 'fabricante',
  INSTRUMENTO_COMPUTADOR_VAZAO = 'instrumento-computador-vazao',
  INSTRUMENTO_ELEMENTO_TEMPERATURA = 'instrumento-elemento-temperatura',
  INSTRUMENTO_MANOMETRO = 'instrumento-manometro',
  INSTRUMENTO_MVS = 'instrumento-mvs',
  INSTRUMENTO_MEDIDOR_VAZAO_CORIOLIS = 'instrumento-medidor-vazao-coriolis',
  INSTRUMENTO_MEDIDOR_VAZAO_ROTATIVO = 'instrumento-medidor-vazao-rotativo',
  INSTRUMENTO_PLACA_ORIFICIO = 'instrumento-placa-orificio',
  INSTRUMENTO_REGUA = 'instrumento-regua',
  INSTRUMENTO_TANQUE = 'instrumento-tanque',
  INSTRUMENTO_TERMOMETRO = 'instrumento-termometro',
  INSTRUMENTO_TERMOMETRO_COSTADO_TANQUE = 'instrumento-termometro-costado-tanque',
  INSTRUMENTO_TERMOMETRO_IMERSAO_TANQUE = 'instrumento-termometro-imersao-tanque',
  INSTRUMENTO_TRANSMISSOR_DE_NIVEL = 'instrumento-transmissor-nivel',
  INSTRUMENTO_TRANSMISSOR_DIFERENCIAL_PRESSAO = 'instrumento-transmissor-diferencial-pressao',
  INSTRUMENTO_TRANSMISSOR_PRESSAO = 'instrumento-transmissor-pressao',
  INSTRUMENTO_TRANSMISSOR_TEMPERATURA = 'instrumento-transmissor-temperatura',
  INSTRUMENTO_TRECHO_RETO = 'instrumento-trecho-reto',
  INSTRUMENTO_TRENA = 'instrumento-trena',
  INSTRUMENTO_TURBIDIMETRO = 'instrumento-turbidimetro',
  INSTRUMENTO_VALVULA = 'instrumento-valvula',
  LOCACAO = 'locacao',
  TIPO_PROJETO = 'tipo-projeto',
  GESTAO_FALHAS = 'gestao-falhas',
  GESTAO_PRAZOS = 'gestao-prazos',
  INSTRUMENTO = 'instrumento',
  NO = 'no',
  MTBF = 'mtbf',
  PERDA = 'perda',
  GESTAO_LACRES = 'gestao-lacres',
  GESTAO_CARTA = 'gestao-carta',
  INSTALACAO_REMOCAO = 'instalacao-remocao',
  INSTALAR = 'instalar',
  REMOVER = 'remover',
  PACOTE_PROJETO = 'pacote-projeto',
  POTENCIAL = 'potencial',
  GRUPO_PERDA = 'grupo-perda',
  SUBGRUPO_PERDA = 'subgrupo-perda',
  ENVIO = 'envio',
  TESTE = 'teste',
  SUPERINTENDENCIA = 'superintendencia',
  INSTALACAO_DESTINO_TRANSFERENCIA = 'instalacao-destino-transferencia',
  FORNECEDORES = 'fornecedores'
}
