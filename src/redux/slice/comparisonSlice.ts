import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configure-store";
import { ProductType, Comparison } from "../../models/types";

interface ComparisonsState {
  comparisons: Comparison[];
}

const initialState: ComparisonsState = {
  comparisons: [],
};

const comparisonsSlice = createSlice({
  name: "comparisons",
  initialState,
  reducers: {
    addComparison: (state, action: PayloadAction<ProductType | Comparison>) => {
      if ("product" in action.payload) {
        state.comparisons.push(action.payload);
      } else {
        state.comparisons.push({ product: action.payload });
      }
    },
    removeComparison: (state, action: PayloadAction<number>) => {
      state.comparisons = state.comparisons.filter(
        (item) => item.product.id !== action.payload
      );
    },
    checkComparison: (state, action: PayloadAction<number>) => {
      state.comparisons = state.comparisons.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },
});

export const { addComparison, removeComparison, checkComparison } =
  comparisonsSlice.actions;

export const selectComparisons = (state: RootState) =>
  state.comparisons.comparisons;

export default comparisonsSlice.reducer;
