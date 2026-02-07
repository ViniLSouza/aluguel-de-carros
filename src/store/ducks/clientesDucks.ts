import { createDuck } from './createDuck';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as ClientesSDK from '../../sdk/clientesSdk';

const clientesDuck = createDuck('clientes');

export const Types = {
  LISTAR_CLIENTES: clientesDuck.defineType('LISTAR_CLIENTES'),
  LISTAR_CLIENTES_SUCCESS: clientesDuck.defineType('LISTAR_CLIENTES_SUCCESS'),
  LISTAR_CLIENTES_ERROR: clientesDuck.defineType('LISTAR_CLIENTES_ERROR'),

  LISTAR_CLIENTES_ID: clientesDuck.defineType('LISTAR_CLIENTES_ID'),
  LISTAR_CLIENTES_ID_SUCCESS: clientesDuck.defineType('LISTAR_CLIENTES_ID_SUCCESS'),
  LISTAR_CLIENTES_ID_ERROR: clientesDuck.defineType('LISTAR_CLIENTES_ID_ERROR'),

  DESATIVAR_CLIENTE: clientesDuck.defineType('DESATIVAR_CLIENTE'),
  DESATIVAR_CLIENTE_SUCCESS: clientesDuck.defineType('DESATIVAR_CLIENTE_SUCCESS'),
  DESATIVAR_CLIENTE_ERROR: clientesDuck.defineType('DESATIVAR_CLIENTE_ERROR'),

  EDITAR_CLIENTE: clientesDuck.defineType('EDITAR_CLIENTE'),
  EDITAR_CLIENTE_SUCCESS: clientesDuck.defineType('EDITAR_CLIENTE_SUCCESS'),
  EDITAR_CLIENTE_ERROR: clientesDuck.defineType('EDITAR_CLIENTE_ERROR'),
};

export const Actions = {
  listClientes: clientesDuck.createAction(Types.LISTAR_CLIENTES),
  listClientesSuccess: clientesDuck.createAction(Types.LISTAR_CLIENTES_SUCCESS),
  listClientesError: clientesDuck.createAction(Types.LISTAR_CLIENTES_ERROR),

  listClienteID: clientesDuck.createAction(Types.LISTAR_CLIENTES_ID),
  listClienteIDSuccess: clientesDuck.createAction(Types.LISTAR_CLIENTES_ID_SUCCESS),
  listClienteIDError: clientesDuck.createAction(Types.LISTAR_CLIENTES_ID_ERROR),

  desativarCliente: clientesDuck.createAction(Types.DESATIVAR_CLIENTE),
  desativarClienteSuccess: clientesDuck.createAction(Types.DESATIVAR_CLIENTE_SUCCESS),
  desativarClienteError: clientesDuck.createAction(Types.DESATIVAR_CLIENTE_ERROR),

  editarCliente: clientesDuck.createAction(Types.EDITAR_CLIENTE),
  editarClienteSuccess: clientesDuck.createAction(Types.EDITAR_CLIENTE_SUCCESS),
  editarClienteError: clientesDuck.createAction(Types.EDITAR_CLIENTE_ERROR),
};

export const initialState = {
  contentListClientes: [],
  loadingListClientes: false,
  successListClientes: false,
  errorListClientes: false,

  contentlistClienteID: [],
  loadinglistClienteID: false,
  successlistClienteID: false,
  errorlistClienteID: false,

  contentDesativarCliente: [],
  loadingDesativarCliente: false,
  successDesativarCliente: false,
  errorDesativarCliente: false,

  contentEditarCliente: [],
  loadingEditarCliente: false,
  successEditarCliente: false,
  errorEditarCliente: false,
};

const handlers = {
  [Types.LISTAR_CLIENTES]: (state) => ({
    ...state,
    loadingListClientes: true,
    successListClientes: false,
    errorListClientes: false,
  }),
  [Types.LISTAR_CLIENTES_SUCCESS]: (state, action) => ({
    ...state,
    loadingListClientes: false,
    successListClientes: true,
    contentListClientes: action.payload?.content ?? [],
    errorListClientes: false,
  }),
  [Types.LISTAR_CLIENTES_ERROR]: (state, action) => ({
    ...state,
    loadingListClientes: false,
    successListClientes: false,
    errorListClientes: action.payload?.message ?? true,
  }),

  [Types.LISTAR_CLIENTES_ID]: (state) => ({
    ...state,
    loadinglistClienteID: true,
    successlistClienteID: false,
    errorlistClienteID: false,
  }),
  [Types.LISTAR_CLIENTES_ID_SUCCESS]: (state, action) => ({
    ...state,
    loadinglistClienteID: false,
    successlistClienteID: true,
    contentlistClienteID: action.payload?.content ?? [],
    errorlistClienteID: false,
  }),
  [Types.LISTAR_CLIENTES_ID_ERROR]: (state, action) => ({
    ...state,
    loadinglistClienteID: false,
    successlistClienteID: false,
    errorlistClienteID: action.payload?.message ?? true,
  }),

  [Types.DESATIVAR_CLIENTE]: (state) => ({
    ...state,
    loadingDesativarCliente: true,
    successDesativarCliente: false,
    errorDesativarCliente: false,
  }),
  [Types.DESATIVAR_CLIENTE_SUCCESS]: (state, action) => ({
    ...state,
    loadingDesativarCliente: false,
    successDesativarCliente: true,
    contentDesativarCliente: action.payload?.content ?? [],
    errorDesativarCliente: false,
  }),
  [Types.DESATIVAR_CLIENTE_ERROR]: (state, action) => ({
    ...state,
    loadingDesativarCliente: false,
    successDesativarCliente: false,
    errorDesativarCliente: action.payload?.message ?? true,
  }),

  [Types.EDITAR_CLIENTE]: (state) => ({
    ...state,
    loadingEditarCliente: true,
    successEditarCliente: false,
    errorEditarCliente: false,
  }),
  [Types.EDITAR_CLIENTE_SUCCESS]: (state, action) => ({
    ...state,
    loadingEditarCliente: false,
    successEditarCliente: true,
    contentEditarCliente: action.payload?.content ?? [],
    errorEditarCliente: false,
  }),
  [Types.EDITAR_CLIENTE_ERROR]: (state, action) => ({
    ...state,
    loadingEditarCliente: false,
    successEditarCliente: false,
    errorEditarCliente: action.payload?.message ?? true,
  }),
};

export default clientesDuck.createReducer(handlers, initialState);

function* fetchListarClientes() {
  try {
    const result = yield call(ClientesSDK.listarClientes);
    if (Array.isArray(result)) {
      yield put(Actions.listClientesSuccess({ content: result }));
    } else if (result?.sucesso === 'SIM') {
      yield put(Actions.listClientesSuccess({ content: result?.content ?? [] }));
    } else {
      yield put(Actions.listClientesError({ message: result?.message }));
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    yield put(Actions.listClientesError({ message }));
  }
}

function* fetchListarClientesID(action) {
  try {
    if (!action.payload || typeof action.payload.id === 'undefined') {
      yield put(Actions.listClienteIDError({ message: 'ID não fornecido.' }));
      return;
    }
    const result = yield call(ClientesSDK.listarClientesID, action.payload.id);
    if (Array.isArray(result)) {
      yield put(Actions.listClienteIDSuccess({ content: result }));
      return;
    }

    if (result && typeof result === 'object' && 'sucesso' in result) {
      if (result?.sucesso === 'SIM') {
        const content = Array.isArray(result?.content)
          ? result?.content
          : result?.content
            ? [result.content]
            : [];
        yield put(Actions.listClienteIDSuccess({ content }));
      } else {
        yield put(Actions.listClienteIDError({ message: result?.message }));
      }
      return;
    }

    if (result && typeof result === 'object') {
      yield put(Actions.listClienteIDSuccess({ content: [result] }));
      return;
    }

    yield put(Actions.listClienteIDError({ message: 'Resposta inválida.' }));
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    yield put(Actions.listClienteIDError({ message }));
  }
}

function* fetchDesativarCliente(action) {
  try {
    if (!action.payload || typeof action.payload.id === 'undefined') {
      yield put(Actions.desativarClienteError({ message: 'ID não fornecido.' }));
      return;
    }
    const result = yield call(ClientesSDK.desativarCliente, action.payload.id);
    if (Array.isArray(result)) {
      yield put(Actions.desativarClienteSuccess({ content: result }));
      return;
    }

    if (result && typeof result === 'object' && 'sucesso' in result) {
      if (result?.sucesso === 'SIM') {
        const content = Array.isArray(result?.content)
          ? result?.content
          : result?.content
            ? [result.content]
            : [];
        yield put(Actions.desativarClienteSuccess({ content }));
      } else {
        yield put(Actions.desativarClienteError({ message: result?.message }));
      }
      return;
    }

    if (result && typeof result === 'object') {
      yield put(Actions.desativarClienteSuccess({ content: [result] }));
      return;
    }

    yield put(Actions.desativarClienteError({ message: 'Resposta inválida.' }));
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    yield put(Actions.desativarClienteError({ message }));
  }
}

function* fetchEditarCliente(action) {
  try {
    if (!action.payload || typeof action.payload.id === 'undefined') {
      yield put(Actions.editarClienteError({ message: 'ID não fornecido.' }));
      return;
    }
    const result = yield call(
      ClientesSDK.editarCliente,
      action.payload.id,
      action.payload.payload,
    );
    if (Array.isArray(result)) {
      yield put(Actions.editarClienteSuccess({ content: result }));
      return;
    }

    if (result && typeof result === 'object' && 'sucesso' in result) {
      if (result?.sucesso === 'SIM') {
        const content = Array.isArray(result?.content)
          ? result?.content
          : result?.content
            ? [result.content]
            : [];
        yield put(Actions.editarClienteSuccess({ content }));
      } else {
        yield put(Actions.editarClienteError({ message: result?.message }));
      }
      return;
    }

    if (result && typeof result === 'object') {
      yield put(Actions.editarClienteSuccess({ content: [result] }));
      return;
    }

    yield put(Actions.editarClienteError({ message: 'Resposta inválida.' }));
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    yield put(Actions.editarClienteError({ message }));
  }
}

export function* clientesSaga() {
  yield takeLatest(Types.LISTAR_CLIENTES, fetchListarClientes);
  yield takeLatest(Types.LISTAR_CLIENTES_ID, fetchListarClientesID);
  yield takeLatest(Types.DESATIVAR_CLIENTE, fetchDesativarCliente);
  yield takeLatest(Types.EDITAR_CLIENTE, fetchEditarCliente);
}
