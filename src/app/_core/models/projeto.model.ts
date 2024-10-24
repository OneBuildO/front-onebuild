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
}
