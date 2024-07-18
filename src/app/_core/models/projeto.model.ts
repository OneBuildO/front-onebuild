export interface ProjetoResumoDTO {
  id: number | null;
  idCliente: number;
  observacoes: string | null;
  categoria: string | null;
  dataLimiteOrcamento: string | null;
  publico: boolean;
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
  cidade: string | null;
  visibilidade: string;
  qtdOrcamentosRecebidos: number;
}
