import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProgressStep } from '../../../services/carListingProgressStatus/types';

interface CarListingStatusState {
  carListingProgressStatusList: ProgressStep[];
  isLoading: boolean;
  error: string;
}

const initialState: CarListingStatusState = {
  carListingProgressStatusList: [],
  isLoading: false,
  error: '',
};

export const carListingStatusSlice = createSlice({
  name: 'carListingProgressStatus',
  initialState,
  reducers: {
    getCarListingProgressStatusStart: state => {
      state.isLoading = true;
    },
    getCarListingProgressStatusSuccess: (state, action: PayloadAction<ProgressStep[]>) => {
      state.carListingProgressStatusList = action.payload;
      state.isLoading = false;
    },
    getCarListingProgressStatusFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCarListingProgressStatusStart: (_, __) => {
      // No step change required this action is for saga
    },
    updateCarListingProgressStatusSuccess: (state, action: PayloadAction<ProgressStep[]>) => {
      state.carListingProgressStatusList = action.payload;
      state.isLoading = false;
    },
    updateCarListingProgressStatusFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCarListingProgressStatusStart,
  getCarListingProgressStatusSuccess,
  getCarListingProgressStatusFailure,
  updateCarListingProgressStatusStart,
  updateCarListingProgressStatusSuccess,
  updateCarListingProgressStatusFailure,
} = carListingStatusSlice.actions;

export default carListingStatusSlice.reducer;
