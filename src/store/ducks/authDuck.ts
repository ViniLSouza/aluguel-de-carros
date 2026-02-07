import { createDuck } from './createDuck';
import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '../../sdk/api';

const getStoredToken = () => {
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
  login: authDuck.createAction(Types.LOGIN),
  loginSuccess: authDuck.createAction(Types.LOGIN_SUCCESS),
  loginError: authDuck.createAction(Types.LOGIN_ERROR),
  logout: authDuck.createAction(Types.LOGOUT),
};

export const initialState = {
  isAuthenticated: !!getStoredToken(),
  token: getStoredToken(),
  status: 'idle',
  error: null,
};

const handlers = {
  [Types.LOGIN]: (state) => ({
    ...state,
    status: 'loading',
    error: null,
  }),
  [Types.LOGIN_SUCCESS]: (state, action) => {
    const payload = action.payload;
    return {
      ...state,
      status: 'succeeded',
      isAuthenticated: true,
      token: payload?.token ?? null,
      error: null,
    };
  },
  [Types.LOGIN_ERROR]: (state, action) => {
    const payload = action.payload;
    return {
      ...state,
      status: 'failed',
      error: payload?.message || 'Falha no login',
    };
  },
  [Types.LOGOUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    token: null,
    status: 'idle',
    error: null,
  }),
};

export const authReducer = authDuck.createReducer(
  handlers,
  initialState,
);

function* fetchLogin(action) {
  try {
    const result = yield call(login, action.payload);
    if (result?.token) {
      localStorage.setItem('authToken', result.token);
      yield put(Actions.loginSuccess(result));
      return;
    }

    if (result && typeof result === 'object' && 'sucesso' in result) {
      if (result?.sucesso === 'SIM') {
        yield put(Actions.loginSuccess(result));
      } else {
        yield put(Actions.loginError({ message: result?.message || 'Falha no login' }));
      }
      return;
    }

    yield put(Actions.loginError({ message: 'Resposta inválida.' }));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Falha no login';
    yield put(Actions.loginError({ message }));
  }
}

function* handleLogout() {
  yield call([localStorage, 'removeItem'], 'authToken');
}

export function* authSaga() {
  yield takeLatest(Types.LOGIN, fetchLogin);
  yield takeLatest(Types.LOGOUT, handleLogout);
}
