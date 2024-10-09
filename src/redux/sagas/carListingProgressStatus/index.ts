import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeLatest } from 'redux-saga/effects';

import { carListingProgressStatusService } from '../../../services/carListingProgressStatus';
import { ProgressStep } from '../../../services/carListingProgressStatus/types';
import {
  getCarListingProgressStatusFailure,
  getCarListingProgressStatusStart,
  getCarListingProgressStatusSuccess,
  updateCarListingProgressStatusFailure,
  updateCarListingProgressStatusStart,
  updateCarListingProgressStatusSuccess,
} from '../../slices/carListingProgressStatus';

function* fetchCarListingProgressStatusSaga() {
  try {
    const carListingProgressStatus: ProgressStep[] = yield call(() =>
      carListingProgressStatusService.getCarListingProgressStatus(),
    );

    yield put(getCarListingProgressStatusSuccess(carListingProgressStatus));
  } catch (error) {
    yield put(
      getCarListingProgressStatusFailure(
        error instanceof Error ? error.message : 'An unknown error occurred',
      ),
    );
  }
}

function* updateCarListingProgressStatusSaga(action: PayloadAction<ProgressStep>) {
  try {
    const updatedProgressStatus: ProgressStep[] = yield call(() =>
      carListingProgressStatusService.updateCarListingProgressStatus(action.payload),
    );

    yield put(updateCarListingProgressStatusSuccess(updatedProgressStatus));
  } catch (error) {
    yield put(
      updateCarListingProgressStatusFailure(
        error instanceof Error ? error.message : 'An unknown error occurred',
      ),
    );
  }
}

export function* watchCarListingSaga() {
  yield takeLatest(getCarListingProgressStatusStart.type, fetchCarListingProgressStatusSaga);
  yield takeLatest(updateCarListingProgressStatusStart.type, updateCarListingProgressStatusSaga);
}
