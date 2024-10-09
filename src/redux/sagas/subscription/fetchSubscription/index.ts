import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { subscriptionService } from '../../../../services/subscriptions';
import { showSnackbar } from '../../../slices/snackbar';
import {
  fetchSubscriptionFailure,
  fetchSubscriptionStart,
  fetchSubscriptionSuccess,
  Subscription,
} from '../../../slices/subscriptions';

function* fetchSubscription(): Generator<CallEffect | PutEffect, void, Subscription | null> {
  try {
    const subscription: Subscription | null = yield call(() =>
      subscriptionService.getSubscriptionData(),
    );
    if (subscription) {
      yield put(fetchSubscriptionSuccess(subscription));
    } else {
      yield put(fetchSubscriptionFailure('No subscription data found.'));
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to load subscription data!';
    yield put(fetchSubscriptionFailure(errorMessage));
    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchFetchSubscriptionSaga() {
  yield takeLatest(fetchSubscriptionStart.type, fetchSubscription);
}
