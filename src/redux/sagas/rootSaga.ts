import { all, fork } from 'redux-saga/effects';
import { watchDeviceSaga } from './devices';
import { watchSubscriptionSaga } from './subscription';

export function* rootSaga() {
  yield all([
    fork(watchDeviceSaga),
    fork(watchSubscriptionSaga),
  ]);
}
