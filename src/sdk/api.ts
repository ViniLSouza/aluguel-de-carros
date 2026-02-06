const API_BASE_URL = 'http://localhost:8080';

type LoginRequest = {
  login: string;
  senha: string;
};

type LoginResponse = {
  token: string;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  method: HttpMethod,
  body?: TBody,
): Promise<TResponse> {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Falha na requisição');
  }

  return response.json() as Promise<TResponse>;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse, LoginRequest>('/autenticacao/login', 'POST', payload);
}

export type { LoginRequest, LoginResponse };
