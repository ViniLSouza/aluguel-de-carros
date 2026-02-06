# Aluguel de Carros

Front-end em React + TypeScript para gerenciamento de uma locadora de carros. O app possui autenticação, navegação por rotas e listagem de clientes com integração a API.

## Funcionalidades

- Login com persistência de token em `localStorage`
- Navegação lateral com rotas: Home, Clientes, Carros e Aluguel
- Listagem de clientes em tabela com estados de loading/erro
- Tratamento de rotas inexistentes

## Tecnologias

- Vite + React 19 + TypeScript
- Redux Toolkit + Redux Saga
- React Router
- Material UI (MUI)
- SCSS

## Rotas

- / -> Home
- /clientes -> Lista de clientes
- /carros -> Página de carros (placeholder)
- /aluguel -> Página de aluguel (placeholder)

## Integração com API

Base URL configurada em [src/sdk/api.ts](src/sdk/api.ts):

- POST /autenticacao/login
  - Body: { login, senha }
  - Response: { token }
- GET /cliente/listar
  - Response: { sucesso, content, message } ou lista de clientes

O token retornado é armazenado em `localStorage` (`authToken`) e enviado no header `Authorization: Bearer <token>`.

## Como rodar

Instale as dependências e inicie o servidor de desenvolvimento:

1. npm install
2. npm run dev

Build de produção:

1. npm run build
2. npm run preview

Lint:

1. npm run lint

## Observações

- É necessário ter o backend rodando em http://localhost:8080 para autenticação e listagem de clientes.
- As páginas de Carros e Aluguel estão como placeholders e podem ser evoluídas.
