import { combineReducers } from 'redux';
import snackBarReducer  from '../slices/snackbar';

const rootReducer = combineReducers({
  snackbar: snackBarReducer,
});
export type RootState = ReturnType<typeof rootReducer>; 
export default rootReducer;
