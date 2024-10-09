import { combineReducers } from 'redux';

import carListingProgressStatusReducer from '../slices/carListingProgressStatus';
import deviceReducer from '../slices/devices';
import snackBarReducer from '../slices/snackbar';
import subscriptionReducer from '../slices/subscriptions';

const rootReducer = combineReducers({
  devices: deviceReducer,
  snackbar: snackBarReducer,
  subscription: subscriptionReducer,
  carListingProgressStatus: carListingProgressStatusReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
