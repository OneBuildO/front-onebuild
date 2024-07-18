export interface Usuario {
  idUsuario : number;
  nome: string;
  tipoUsuario : string;
  categoria : string;
  perfilUsuario: string;
  email : boolean;
  contato: string;
  CNPJ : boolean;
  senha : string;
  dataCadastro : string;
  inUso : boolean;
  emailValidado : boolean;
  codigoEmailAutenticacao : string;
  token : string;
  acessoBloqueado : boolean;
  qtdTentativaLogin : number;
  nivelConta : string;
}


export interface UsuarioModel {
  id : number;
  nome: string;
  tipoUsuario : string;
  perfilUsuario : string;
  email: string;
  emailValidado : boolean;
  token: string;
  acessoBloqueado : boolean;
  nivelConta : string;
}

export interface ValidacaoEmailDTO {
  email: string | null;
  codigoAutenticacao: string | null;
}

export interface DadosEstatisticaUsuario {
  qtdTotalClientes : number;
  qtdTotalProjetos : number;
  qtdTotalFornecedores : number;
  qtdProjetosEmAndamento : number;
}
