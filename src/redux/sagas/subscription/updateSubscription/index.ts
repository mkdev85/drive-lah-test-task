import { PayloadAction } from '@reduxjs/toolkit';

import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { subscriptionService } from '../../../../services/subscriptions';
import { showSnackbar } from '../../../slices/snackbar';
import {
  Subscription,
  updateSubscriptionFailure,
  updateSubscriptionStart,
  updateSubscriptionSuccess,
} from '../../../slices/subscriptions';

function* updateSubscription(
  action: PayloadAction<Subscription>,
): Generator<CallEffect<Subscription> | PutEffect, void, Subscription> {
  try {
    const subscription: Subscription = yield call(() =>
      subscriptionService.saveSubscriptionData(action.payload),
    );
    yield put(updateSubscriptionSuccess(subscription));
    yield put(showSnackbar({ message: 'Subscription updated successfully!', type: 'success' }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Subscription submission failed!';
    yield put(updateSubscriptionFailure(errorMessage));
    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchUpdateSubscriptionSaga() {
  yield takeLatest(updateSubscriptionStart.type, updateSubscription);
}
