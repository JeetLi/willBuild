import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoryTypes } from "../../models/types";
import { CategoryState } from "../../models/types";

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryTypes[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
