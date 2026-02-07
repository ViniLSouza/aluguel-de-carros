import { apiRequest } from "./api";

export async function listarClientes() {
  return apiRequest('/cliente/listar', 'GET');
}

export async function listarClientesID(id) {
  return apiRequest(`/cliente/buscar/${id}`, 'GET');
}

export async function desativarCliente(id) {
  return apiRequest(`/cliente/desativar/${id}`, 'DELETE');
}

export async function editarCliente(id, payload) {
  return apiRequest(`/cliente/editar/${id}`, 'PUT', payload);
}

