export interface Cliente {
  idUsuario: number;
  nome: string;
  projeto: string | null;
  contato: string | null;
  estado: string | null;
  cidade: string | null;
  dataCadastro: string;
  dataDesativacao: string;
  token: string;
  inUso: boolean;
}

export interface ClienteResumoDTO {
  id: number | null;
  idUsuario: number | null;
  nome: string | null;
  projeto: string | null;
  contato: string | null;
  estado: string | null;
  cidade: string | null;
  token: string | null;
}
