import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DeviceImage {
  fileName: string;
  fileData: string;
}

export interface Device {
  id: number;
  deviceType: string;
  serialNumber: string;
  isBringingOwnDevice: boolean;
  image: DeviceImage | null;
}

interface DeviceState {
  devices: Device[];
  loading: boolean;
}

const initialState: DeviceState = {
  devices: [],
  loading: false,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    loadDevicesStart: state => {
      state.loading = true;
    },
    loadDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      state.loading = false;
    },
    loadDevicesFailure: state => {
      state.loading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addDevicesStart: (state, action: PayloadAction<Device[]>) => {
      state.loading = true;
    },
    addDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loadDevicesStart,
  loadDevicesSuccess,
  loadDevicesFailure,
  addDevicesStart,
  addDevicesSuccess,
} = deviceSlice.actions;

export default deviceSlice.reducer;
