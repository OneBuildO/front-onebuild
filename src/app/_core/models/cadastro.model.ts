export interface CadastroUsuarioDTO {
  nome: string | null;
  tipoUsuario: string | null;
  categoria: string | null;
  email: string | null;
  contato: string | null;
  cnpj: string | null;
  senha: string | null;
  convite: string | null;
  estado?: string;
  cidade?: string;
  mapbox_id?: string;
  endereco?: string;
}
