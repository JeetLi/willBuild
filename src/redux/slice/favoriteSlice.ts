import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configure-store";
import { Favorite } from "../../models/types";

interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favoriteAdd(state, action: PayloadAction<Favorite>) {
      state.favorites.push(action.payload);
    },
    favoriteUpdate(
      state,
      action: PayloadAction<{ favorite: Favorite; id: number }>
    ) {
      const index = state.favorites.findIndex(
        (favorite) => favorite.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites[index] = action.payload.favorite;
      }
    },
    favoriteRemove(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
    },
    favoriteClear(state) {
      state.favorites = [];
    },
    favoriteCheck(state, action: PayloadAction<number>) {
      state.favorites.filter((favorite) => favorite.id === action.payload);
    },
  },
});

export const {
  favoriteAdd,
  favoriteUpdate,
  favoriteRemove,
  favoriteClear,
  favoriteCheck,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
