import { PayloadAction } from '@reduxjs/toolkit';

import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { subscriptionService } from '../../../services/subscriptions';
import { showSnackbar } from '../../slices/snackbar';
// Use Singleton instance
import { Subscription } from '../../slices/subscriptions';
import {
  loadSubscriptionFailure,
  loadSubscriptionStart,
  loadSubscriptionSuccess,
  submitSubscriptionStart,
  submitSubscriptionSuccess,
  submitSubscriptionFailure,
} from '../../slices/subscriptions';

function* loadSubscription(): Generator<CallEffect | PutEffect, void, Subscription | null> {
  try {
    const subscription: Subscription | null = yield call(() =>
      subscriptionService.getSubscriptionData(),
    );
    if (subscription) {
      yield put(loadSubscriptionSuccess(subscription));
    } else {
      yield put(loadSubscriptionFailure('No subscription data found.'));
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to load subscription data!';
    yield put(loadSubscriptionFailure(errorMessage));
    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

function* submitSubscription(
  action: PayloadAction<Subscription>,
): Generator<CallEffect<Subscription> | PutEffect, void, Subscription> {
  try {
    const subscription: Subscription = yield call(() =>
      subscriptionService.saveSubscriptionData(action.payload),
    );
    yield put(submitSubscriptionSuccess(subscription));
    yield put(showSnackbar({ message: 'Subscription updated successfully!', type: 'success' }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Subscription submission failed!';
    yield put(submitSubscriptionFailure(errorMessage));
    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchSubscriptionSaga() {
  yield takeLatest(loadSubscriptionStart.type, loadSubscription);
  yield takeLatest(submitSubscriptionStart.type, submitSubscription);
}
