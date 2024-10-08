import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSnackbarOpen: false,
  snackbarMessage: '',
  snackbarType: 'info', 
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.isSnackbarOpen = true;
      state.snackbarMessage = action.payload.message;
      state.snackbarType = action.payload.type || 'info'; 
    },
    closeSnackbar: (state) => {
      state.isSnackbarOpen = false;
      state.snackbarMessage = '';
      state.snackbarType = 'info';
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;