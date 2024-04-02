import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { Offer, Offers } from '../../types/offer';
import { AppData } from '../../constants';
import { fetchFavoritesAction } from '../../store/api-actions';


export type FavoritesType = {
    favorites: Offers;
    isFavoritesDataLoading: boolean;
}

export const initialState: FavoritesType = {
  favorites: [],
  isFavoritesDataLoading: true,
};

export const favoritesSlice = createSlice({
  initialState, name: AppData.Favorites,
  reducers: {
    setIsFavoritesDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesDataLoading = action.payload;
    },
    setFavorites: (state, action: PayloadAction<{offer: Offer; newBool: boolean}>) => {
      if(action.payload.newBool){
        state.favorites.push(action.payload.offer);
      } else{
        state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.offer.id);
      }
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
    getFavoritesAmount: (state: FavoritesType) => state.favorites.length,
    getFavoritesByCity: (state: FavoritesType) => Object.groupBy(state.favorites, (favorite) => favorite.city.name),
    getIsFavoritesDataLoading: (state: FavoritesType) => state.isFavoritesDataLoading,
  },
});
export const {setFavorites, setIsFavoritesDataLoading} = favoritesSlice.actions;
export const favoritesSelectors = favoritesSlice.selectors;
