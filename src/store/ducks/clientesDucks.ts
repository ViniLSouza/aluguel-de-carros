import { createDuck } from './createDuck';
import type { DuckAction, DuckHandlers } from './createDuck';
import { call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';

import * as ClientesSDK from '../../sdk/clientesSdk'
import type { Cliente } from '../../types/cliente'

const clientesDuck = createDuck('clientes')

export const Types = {
    LISTAR_CLIENTES: clientesDuck.defineType('LISTAR_CLIENTES'),
    LISTAR_CLIENTES_SUCCESS: clientesDuck.defineType('LISTAR_CLIENTES_SUCCESS'),
    LISTAR_CLIENTES_ERROR: clientesDuck.defineType('LISTAR_CLIENTES_ERROR'),

    LISTAR_CLIENTES_ID: clientesDuck.defineType('LISTAR_CLIENTES_ID'),
    LISTAR_CLIENTES_ID_SUCCESS: clientesDuck.defineType('LISTAR_CLIENTES_ID_SUCCESS'),
    LISTAR_CLIENTES_ID_ERROR: clientesDuck.defineType('LISTAR_CLIENTES_ID_ERROR'),
}

type ClientesState = {
    contentListClientes: Cliente[];
    loadingListClientes: boolean;
    successListClientes: boolean;
    errorListClientes: boolean | string;

    contentListClientesID?: Cliente[];
    loadingListClientesID?: boolean;
    successListClientesID?: boolean;
    errorListClientesID?: boolean | string;
}

type ClientesListPayload = { content: Cliente[] };
type ClientesErrorPayload = { message?: string };

type ClientesListResponse =
    | {
          sucesso?: string;
          content?: Cliente[];
          message?: string;
      }
    | Cliente[];

export const Actions = {
    listClientes: clientesDuck.createAction<void>(Types.LISTAR_CLIENTES),
    listClientesSuccess: clientesDuck.createAction<ClientesListPayload>(Types.LISTAR_CLIENTES_SUCCESS),
    listClientesError: clientesDuck.createAction<ClientesErrorPayload>(Types.LISTAR_CLIENTES_ERROR),

    listClientesID: clientesDuck.createAction<{ id: string | number }>(Types.LISTAR_CLIENTES_ID),
    listClientesIDSuccess: clientesDuck.createAction<ClientesListPayload>(Types.LISTAR_CLIENTES_ID_SUCCESS),
    listClientesIDError: clientesDuck.createAction<ClientesErrorPayload>(Types.LISTAR_CLIENTES_ID_ERROR),
}

export const initialState: ClientesState = {
    contentListClientes: [],
    loadingListClientes: false,
    successListClientes: false,
    errorListClientes: false,

    contentListClientesID: [],
    loadingListClientesID: false,
    successListClientesID: false,
    errorListClientesID: false,
}

const handlers = {
    [Types.LISTAR_CLIENTES]: (state: ClientesState) => ({
        ...state,
        loadingListClientes: true,
        successListClientes: false,
        errorListClientes: false
    }),
    [Types.LISTAR_CLIENTES_SUCCESS]: (state: ClientesState, action: DuckAction<ClientesListPayload>) => ({
        ...state,
        loadingListClientes: false,
        successListClientes: true,
        contentListClientes: action.payload?.content ?? [],
        errorListClientes: false
    }),
    [Types.LISTAR_CLIENTES_ERROR]: (state: ClientesState, action: DuckAction<ClientesErrorPayload>) => ({
        ...state,
        loadingListClientes: false,
        successListClientes: false,
        errorListClientes: action.payload?.message ?? true
    }),

    [Types.LISTAR_CLIENTES_ID]: (state: ClientesState) => ({
        ...state,
        loadingListClientesID: true,
        successListClientesID: false,
        errorListClientesID: false
    }),
    [Types.LISTAR_CLIENTES_ID_SUCCESS]: (state: ClientesState, action: DuckAction<ClientesListPayload>) => ({
        ...state,
        loadingListClientesID: false,
        successListClientesID: true,
        contentListClientesID: action.payload?.content ?? [],
        errorListClientesID: false
    }),
    [Types.LISTAR_CLIENTES_ID_ERROR]: (state: ClientesState, action: DuckAction<ClientesErrorPayload>) => ({
        ...state,
        loadingListClientesID: false,
        successListClientesID: false,
        errorListClientesID: action.payload?.message ?? true
    }),
} as unknown as DuckHandlers<ClientesState>

export default clientesDuck.createReducer(handlers, initialState)

function* fetchListarClientes(): SagaIterator {
    try {
        const result: ClientesListResponse = yield call(ClientesSDK.listarClientes)
        if (Array.isArray(result)) {
            yield put(Actions.listClientesSuccess({ content: result }))
        } else if (result?.sucesso === 'SIM') {
            yield put(Actions.listClientesSuccess({ content: result?.content ?? [] }))
        } else {
            yield put(Actions.listClientesError({ message: result?.message }))
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : undefined
        yield put(Actions.listClientesError({ message }))
    }
}

function* fetchListarClientesID(action: DuckAction<{ id: string | number }>): SagaIterator {
    try {
        if (!action.payload || typeof action.payload.id === 'undefined') {
            yield put(Actions.listClientesIDError({ message: 'ID não fornecido.' }))
            return;
        }
        const result: ClientesListResponse = yield call(ClientesSDK.listarClientesID, action.payload.id)
        if (Array.isArray(result)) {
            yield put(Actions.listClientesIDSuccess({ content: result }))
            return;
        }

        if (result && typeof result === 'object' && 'sucesso' in result) {
            if (result?.sucesso === 'SIM') {
                const content = Array.isArray(result?.content)
                    ? result?.content
                    : result?.content
                        ? [result.content]
                        : []
                yield put(Actions.listClientesIDSuccess({ content }))
            } else {
                yield put(Actions.listClientesIDError({ message: result?.message }))
            }
            return;
        }

        if (result && typeof result === 'object') {
            yield put(Actions.listClientesIDSuccess({ content: [result as Cliente] }))
            return;
        }

        yield put(Actions.listClientesIDError({ message: 'Resposta inválida.' }))
    } catch (err) {
        const message = err instanceof Error ? err.message : undefined
        yield put(Actions.listClientesIDError({ message }))
    }
}

export function* clientesSaga() {
    yield takeLatest(Types.LISTAR_CLIENTES, fetchListarClientes)
    yield takeLatest(Types.LISTAR_CLIENTES_ID, fetchListarClientesID)
}