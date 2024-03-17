import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../types/nullable';

type ErrorMessage = Nullable<string>;

export type GlobalState = {
    error: Nullable<ErrorMessage>;
}

const initialState: GlobalState = {
  error: null
};

export const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {
    setError: (state, action:PayloadAction<ErrorMessage>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    error : (state: GlobalState) => state.error
  }
});

export const globalSelectors = globalSlice.selectors;

export const { setError } = globalSlice.actions;
