import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserReciveDto} from '../../types/types';

interface UserState {
  user: UserReciveDto | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserReciveDto>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export const userReducer = userSlice.reducer;
