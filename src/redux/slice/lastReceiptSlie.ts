import { createSlice } from "@reduxjs/toolkit";

const lastReceiptSlice = createSlice({
  name: "menuMobile",
  initialState: false,
  reducers: {
    lastReceiptSetTrue: () => true,
    lastReceiptSetFalse: () => false,
  },
});

export const { lastReceiptSetTrue, lastReceiptSetFalse } =
  lastReceiptSlice.actions;

export default lastReceiptSlice.reducer;
