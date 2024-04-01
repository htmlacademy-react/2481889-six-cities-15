import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { Offers } from '../types/offer';
import { fetchNearPlacesAction } from '../store/api-actions';
import { AppData } from '../constants';

export type NearPlacesState = {
    nearPlaces: Offers;
    isNearPlacesDataLoading: boolean;
}

export const initialState: NearPlacesState = {
  nearPlaces: [],
  isNearPlacesDataLoading: true,
};

export const nearPlacesSlice = createSlice({
  initialState, name: AppData.NearPlaces,
  reducers: {
    setIsNearPlacesDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isNearPlacesDataLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.
      addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.isNearPlacesDataLoading = false;
        state.nearPlaces = action.payload;
      }).
      addCase(fetchNearPlacesAction.pending, (state) => {
        state.isNearPlacesDataLoading = true;
      });
  },
  selectors: {
    getNearPlaces: (state:NearPlacesState) => state.nearPlaces,
    getIsNearPlacesDataLoading: (state:NearPlacesState) => state.isNearPlacesDataLoading,
  },

},
);

export const nearPlacesSelectors = nearPlacesSlice.selectors;

