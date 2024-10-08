import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import rootReducer from './slices';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
