import { createSlice } from "@reduxjs/toolkit";

export const productDetailsSlice = createSlice({
  name: "Product Details",
  initialState: { product: [] },
  reducers: {
    PRODUCT_DETAILS_REQUEST: (state) => {
      return {
        loading: true,
        ...state,
      };
    },
    PRODUCT_DETAILS_SUCCESS: (state, actions) => {
        console.log('action reducer : ',actions.payload);
      return {
        loading: false,
        product: actions.payload,
      };
    },
    PRODUCT_DETAILS_FAIL: (state, actions) => {
      console.log(' reducer fail error: ',actions.payload);
      return {
        loading: false,
        error: actions.payload?.message  || "Internal Error",
      };
    },
    CLEAR_ERRORS: (state, actions) => {
        return {
          ...state,
          error: null,
        };
      },
    default: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
