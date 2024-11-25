export interface MinhasOfertasDTO {
  id: number | null;
  titulo: string | null;
  descricao: string | null;
  instagram: string | null;
  valor: string | null;
  valorOriginal: string | null;
  porcentagemDesconto: string | null;
  base64Data: string | null;
  dataLimitePromocao: string | null;
}

export interface PromocoesDTO {
    id: number | null;
    titulo: string | null;
    descricao: string | null;
    valor: string | null;
    valorOriginal: string | null;
    porcentagemDesconto: string | null;
    nomeDaLoja: string | null;
    cidade: string | null;
    estado: string | null;
    rua: string | null;
    dataLimitePromocao: string | null;
    telefone: string | null;
    instagram: string | null;
    base64Data: string | null;
}
