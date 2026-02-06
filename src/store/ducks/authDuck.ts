import { createDuck } from './createDuck';
import type { DuckAction, DuckHandlers } from './createDuck';
import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '../../sdk/api';
import type { LoginRequest, LoginResponse } from '../../sdk/api';

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('authToken');
  } catch {
    return null;
  }
};

const authDuck = createDuck('auth');

export const Types = {
  LOGIN: authDuck.defineType('LOGIN'),
  LOGIN_SUCCESS: authDuck.defineType('LOGIN_SUCCESS'),
  LOGIN_ERROR: authDuck.defineType('LOGIN_ERROR'),
  LOGOUT: authDuck.defineType('LOGOUT'),
};

export const Actions = {
  login: authDuck.createAction<LoginRequest>(Types.LOGIN),
  loginSuccess: authDuck.createAction<LoginResponse>(Types.LOGIN_SUCCESS),
  loginError: authDuck.createAction<{ message?: string }>(Types.LOGIN_ERROR),
  logout: authDuck.createAction(Types.LOGOUT),
};

export const initialState: AuthState = {
  isAuthenticated: !!getStoredToken(),
  token: getStoredToken(),
  status: 'idle',
  error: null,
};

type TakeLatestPattern = Parameters<typeof takeLatest>[0];

const handlers = {
  [Types.LOGIN]: (state: AuthState) => ({
    ...state,
    status: 'loading',
    error: null,
  }),
  [Types.LOGIN_SUCCESS]: (state: AuthState, action: DuckAction<LoginResponse>) => {
    const payload = action.payload;
    return {
      ...state,
      status: 'succeeded',
      isAuthenticated: true,
      token: payload?.token ?? null,
      error: null,
    };
  },
  [Types.LOGIN_ERROR]: (state: AuthState, action: DuckAction<{ message?: string }>) => {
    const payload = action.payload;
    return {
      ...state,
      status: 'failed',
      error: payload?.message || 'Falha no login',
    };
  },
  [Types.LOGOUT]: (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    token: null,
    status: 'idle',
    error: null,
  }),
};

export const authReducer = authDuck.createReducer(
  handlers as unknown as DuckHandlers<AuthState>,
  initialState,
);

function* fetchLogin(action: { payload: LoginRequest }) {
  try {
    const result: LoginResponse = yield call(login, action.payload);
    if (result?.token) {
      localStorage.setItem('authToken', result.token);
    }
    yield put(Actions.loginSuccess(result));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Falha no login';
    yield put(Actions.loginError({ message }));
  }
}

function* handleLogout() {
  yield call([localStorage, 'removeItem'], 'authToken');
}

export function* authSaga() {
  yield takeLatest(Types.LOGIN as unknown as TakeLatestPattern, fetchLogin);
  yield takeLatest(Types.LOGOUT as unknown as TakeLatestPattern, handleLogout);
}
