const API_BASE_URL = 'http://localhost:8080';

export async function apiRequest(path, method, body = undefined) {
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

  return response.json();
}

export async function login(payload) {
  return apiRequest('/autenticacao/login', 'POST', payload);
}
