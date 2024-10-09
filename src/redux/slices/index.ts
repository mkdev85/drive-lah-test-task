import { combineReducers } from 'redux';

import carListingProgressStatusReducer from '../slices/carListingProgressStatus';
import snackBarReducer from '../slices/snackbar';

const rootReducer = combineReducers({
  snackbar: snackBarReducer,
  carListingProgressStatus: carListingProgressStatusReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
