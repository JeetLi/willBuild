import { configureStore } from "@reduxjs/toolkit";
import { api } from "./service/api";
import { combineReducers } from "redux";
import loadingReducer from "./slice/loading-slice";
import comparisonsReducer from "./slice/comparisonSlice";
import favoritesReducer from "./slice/favoriteSlice";
import categoriesReducer from "./slice/categoriesSlice";
import lastReceiptReducer from "./slice/lastReceiptSlie";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
export const store = configureStore({
  reducer: combineReducers({
    comparisons: comparisonsReducer,
    favorites: favoritesReducer,
    category: categoriesReducer,
    lastReceipt: lastReceiptReducer,
    product: productReducer,
    cartSlice: cartReducer,
    [api.reducerPath]: api.reducer,
    loading: loadingReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
