import { PayloadAction } from '@reduxjs/toolkit';

import { takeLatest, put, call, CallEffect, PutEffect } from 'redux-saga/effects';

import { deviceService } from '../../../services/devices';
import {
  Device,
  loadDevicesStart,
  loadDevicesSuccess,
  loadDevicesFailure,
  addDevicesStart,
  addDevicesSuccess,
} from '../../slices/devices';
import { showSnackbar } from '../../slices/snackbar';

function* loadDevices(): Generator<CallEffect<Device[]> | PutEffect, void, Device[]> {
  try {
    const devices: Device[] = yield call(() => deviceService.getDeviceData());
    yield put(loadDevicesSuccess(devices));
  } catch (error) {
    yield put(loadDevicesFailure());
    yield put(
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to load devices!',
        type: 'error',
      }),
    );
  }
}

function* addDevices(
  action: PayloadAction<Device[]>,
): Generator<CallEffect<Device[]> | PutEffect, void, Device[]> {
  try {
    const devices: Device[] = yield call(() => deviceService.saveDeviceData(action.payload));
    yield put(addDevicesSuccess(devices));
    yield put(showSnackbar({ message: 'Devices added successfully!', type: 'success' }));
  } catch (error) {
    yield put(
      showSnackbar({
        message: error instanceof Error ? error.message : 'Adding devices failed!',
        type: 'error',
      }),
    );
  }
}

export function* watchDeviceSaga() {
  yield takeLatest(loadDevicesStart.type, loadDevices);
  yield takeLatest(addDevicesStart.type, addDevices);
}
