import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { Offers } from '../types/offer';
import { AppData } from '../constants';
import { fetchFavoritesAction } from '../store/api-actions';

export type FavoritesType = {
    favorites: Offers;
    isFavoritesDataLoading: boolean;
}

const initialState: FavoritesType = {
  favorites: [],
  isFavoritesDataLoading: true,
};

export const favoritesSlice = createSlice({
  initialState, name: AppData.Favorites,
  reducers: {
    setIsFavoritesDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesDataLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesDataLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.isFavoritesDataLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesDataLoading = false;
      });
  },
  selectors: {
    favoritesAmount: (state: FavoritesType) => state.favorites.length,
    favoritesByCity: (state: FavoritesType) => Object.groupBy(state.favorites, (favorite) => favorite.city.name),
    isFavoritesDataLoading: (state: FavoritesType) => state.isFavoritesDataLoading,
  },
});

export const favoritesSelectors = favoritesSlice.selectors;
