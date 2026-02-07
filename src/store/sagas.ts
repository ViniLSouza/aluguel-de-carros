import { all, fork } from 'redux-saga/effects';
import { authSaga } from './ducks/authDuck';
import { clientesSaga } from './ducks/clientesDucks.ts';

export function* rootSaga() {
  yield all([fork(authSaga), fork(clientesSaga)]);
}
