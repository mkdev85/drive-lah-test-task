import { PayloadAction } from '@reduxjs/toolkit';

import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { deviceService } from '../../../../services/devices';
import {
  Device,
  updateDevicesStart,
  updateDevicesFailure,
  updateDevicesSuccess,
} from '../../../slices/devices';
import { showSnackbar } from '../../../slices/snackbar';

function* updateDevices(
  action: PayloadAction<Device[]>,
): Generator<CallEffect<Device[]> | PutEffect, void, Device[]> {
  try {
    const devices: Device[] = yield call(() => deviceService.saveDeviceData(action.payload));
    yield put(updateDevicesSuccess(devices));
    yield put(showSnackbar({ message: 'Devices added successfully!', type: 'success' }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Updating devices failed!';
    yield put(updateDevicesFailure(errorMessage));
  }
}

export function* watchUpdateDeviceSaga() {
  yield takeLatest(updateDevicesStart.type, updateDevices);
}
