import { all, fork } from 'redux-saga/effects';

import { watchFetchCarListingSaga } from './carListingProgressStatus/fetchCarListingProgressStatus';
import { watchUpdateCarListingSaga } from './carListingProgressStatus/updateCarListingProgressStatus';
import { watchFetchDeviceSaga } from './devices/fetchDevices';
import { watchUpdateDeviceSaga } from './devices/updateDevices';
import { watchFetchSubscriptionSaga } from './subscription/fetchSubscription';
import { watchUpdateSubscriptionSaga } from './subscription/updateSubscription';

export function* rootSaga() {
  yield all([
    fork(watchFetchDeviceSaga),
    fork(watchUpdateDeviceSaga),
    fork(watchFetchSubscriptionSaga),
    fork(watchUpdateSubscriptionSaga),
    fork(watchFetchCarListingSaga),
    fork(watchUpdateCarListingSaga),
  ]);
}
