import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../types/nullable';


export type GlobalState = {
    error: Nullable<string>;
}

const initialState: GlobalState = {
  error: null
};

export const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {
    setError: (state, action:PayloadAction<Nullable<string>>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    error : (state: GlobalState) => state.error
  }
});

export const globalSelectors = globalSlice.selectors;

export const { setError } = globalSlice.actions;
