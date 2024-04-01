import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publicAxios from "../../config/publicAxios";

export const getCart = createAsyncThunk("cart/getCart", async (id) => {
  // console.log("id gui di", id);
  const result = await publicAxios.get(`/api/v1/carts/user/${id}`);
  if (result.data.statusCode === 200) 
  return result.data.data;
});

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export default cartSlice.reducer;
