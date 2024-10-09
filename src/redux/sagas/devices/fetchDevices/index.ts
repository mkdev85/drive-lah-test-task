import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { deviceService } from '../../../../services/devices';
import {
  Device,
  fetchDevicesFailure,
  fetchDevicesStart,
  fetchDevicesSuccess,
} from '../../../slices/devices';
import { showSnackbar } from '../../../slices/snackbar';

function* fetchDevices(): Generator<CallEffect<Device[]> | PutEffect, void, Device[]> {
  try {
    const devices: Device[] = yield call(() => deviceService.getDeviceData());
    yield put(fetchDevicesSuccess(devices));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch devices!';
    yield put(fetchDevicesFailure(errorMessage));
    yield put(showSnackbar({ message: errorMessage, type: 'error' }));
  }
}

export function* watchFetchDeviceSaga() {
  yield takeLatest(fetchDevicesStart.type, fetchDevices);
}
