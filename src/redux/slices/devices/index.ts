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
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    fetchDevicesStart: state => {
      state.loading = true;
    },
    fetchDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      state.loading = false;
    },
    fetchDevicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDevicesStart: (state,_) => {
      state.loading = true;
    },
    updateDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      state.loading = false;
    },
    updateDevicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDevicesStart,
  fetchDevicesSuccess,
  fetchDevicesFailure,
  updateDevicesStart,
  updateDevicesSuccess,
  updateDevicesFailure,
} = deviceSlice.actions;

export default deviceSlice.reducer;
