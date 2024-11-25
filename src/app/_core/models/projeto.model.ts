export interface ProjetoResumoDTO {
  id: number | null;
  idCliente: number;
  observacoes: string | null;
  categoria: string | null;
  dataLimiteOrcamento: string | null;
  publico: boolean;
  endereco: string | null;
  status: string;
  cidade: string | null;
  estado: string | null;
  longitude: number | null;
  latitude: number | null;
  cidadeId: number | null; 
  mapbox_id: string | null;
}

export interface ProjetoDetahesDTO {
  idCliente: number;
  idProjeto: number;
  arquivo: string[] | null;
  nomeProjeto: string | null;
  nomeCliente: string | null;
  contatoCliente: string | null;
  observacoes: string | null;
  categoria: string | null;
  dataLimiteOrcamento: string | null;
  local: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  status: string;
  visibilidade: string;
  qtdOrcamentosRecebidos: number;
  longitude: number | null;
  latitude: number | null;
  cidadeId: number | null;
  mapbox_id: string | null;
  arquivos: Arquivo[];
  plantaBaixa: Arquivo[];
}

export interface Feature {
  text: string;
  place_name: string;
  context?: { name: string }[];
}

export interface Arquivo {
  id: number;
  base64Data: string | null;
  fileName: string | null;
}

export interface ProjetosDisponiveisDTO {
  id: number;
  idCliente: number;
  nomeUsuario: string | null;
  email: string | null;
  contato: string  | null;
  tipoUsuario: string | null;
  nomeProjeto: string | null;
  descricaoProjeto: string | null;
  categoriaProjeto: string | null;
  dataLimiteOrcamento: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  publico: boolean;
}