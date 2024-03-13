import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {reducer as basketReduser} from './basket/basket.slice';

const reducers = combineReducers({
  basket: basketReduser,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
