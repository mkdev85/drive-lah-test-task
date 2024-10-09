import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeLatest } from 'redux-saga/effects';

import { carListingProgressStatusService } from '../../../../services/carListingProgressStatus';
import { ProgressStep } from '../../../../services/carListingProgressStatus/types';
import {
  updateCarListingProgressStatusFailure,
  updateCarListingProgressStatusStart,
  updateCarListingProgressStatusSuccess,
} from '../../../slices/carListingProgressStatus';
import { showSnackbar } from '../../../slices/snackbar';

function* updateCarListingProgressStatusSaga(action: PayloadAction<ProgressStep>) {
  try {
    const updatedProgressStatus: ProgressStep[] = yield call(() =>
      carListingProgressStatusService.updateCarListingProgressStatus(action.payload),
    );

    yield put(updateCarListingProgressStatusSuccess(updatedProgressStatus));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update progressStatus data!';
    yield put(updateCarListingProgressStatusFailure(errorMessage));

    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchUpdateCarListingSaga() {
  yield takeLatest(updateCarListingProgressStatusStart.type, updateCarListingProgressStatusSaga);
}
