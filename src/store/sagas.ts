import { all, fork } from 'redux-saga/effects';
import { authSaga } from './ducks/authDuck';

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
