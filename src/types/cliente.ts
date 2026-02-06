export type Cliente = {
  id: string | number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento?: string;
  endereco?: {
    logradouro?: string;
    bairro?: string;
    cep?: string;
    numero?: string | number;
    complemento?: string;
    cidade?: string;
    uf?: string;
  };
  ativo?: boolean;
};
