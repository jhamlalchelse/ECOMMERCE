import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    ALL_PRODUCT_REQUEST: (state) => {
      return {
        loading: true,
        product: [],
      };
    },
    ALL_PRODUCT_SUCCESS: (state, actions) => {
      return {
        loading: false,
        products: actions.payload.data.products,
        totalProducts: actions.payload.data.totalProducts,
        resultPerPage: actions.payload.data.resultPerPage
      };
    },
    ALL_PRODUCT_FAIL: (state, actions) => {
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
export const {CLEAR_ERRORS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL } = productsSlice.actions;

export default productsSlice.reducer;
