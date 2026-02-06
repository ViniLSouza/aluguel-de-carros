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

export async function listarClientesID(id: string | number): Promise<ClientesListResponse> {
  return apiRequest<ClientesListResponse>(`/cliente/buscar/${id}`, 'GET');
}