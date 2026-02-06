import { apiRequest } from "./api";
import type { Cliente } from "../types/cliente";

type ClientesListResponse =
  | {
      sucesso?: string;
      content?: Cliente[];
      message?: string;
    }
  | Cliente[];

export async function listarClientes(): Promise<ClientesListResponse> {
  return apiRequest<ClientesListResponse>('/cliente/listar', 'GET');
}