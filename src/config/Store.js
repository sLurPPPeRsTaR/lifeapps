import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import bootstrapReducer from 'ca-bootstrap/bootstrapReducer';
import Persist from './Persist';

let finalReducers = bootstrapReducer;
if (Persist.active) {
  finalReducers = bootstrapReducer;
}

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: finalReducers,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    sagaMiddleware,
  ],
});
export const persistor = persistStore(store);
