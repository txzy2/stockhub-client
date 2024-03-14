import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {reducer as basketReduser} from './basket/basket.slice';
import {userSlice} from './user/user.slice';

const rootReducer = combineReducers({
  basket: basketReduser,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
