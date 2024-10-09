import { call, put, takeLatest } from 'redux-saga/effects';

import { carListingProgressStatusService } from '../../../../services/carListingProgressStatus';
import { ProgressStep } from '../../../../services/carListingProgressStatus/types';
import {
  getCarListingProgressStatusFailure,
  getCarListingProgressStatusStart,
  getCarListingProgressStatusSuccess,
} from '../../../slices/carListingProgressStatus';
import { showSnackbar } from '../../../slices/snackbar';

function* fetchCarListingProgressStatusSaga() {
  try {
    const carListingProgressStatus: ProgressStep[] = yield call(() =>
      carListingProgressStatusService.getCarListingProgressStatus(),
    );

    yield put(getCarListingProgressStatusSuccess(carListingProgressStatus));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch progressStatus data!';
    yield put(getCarListingProgressStatusFailure(errorMessage));

    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchFetchCarListingSaga() {
  yield takeLatest(getCarListingProgressStatusStart.type, fetchCarListingProgressStatusSaga);
}
