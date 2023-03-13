import { configureStore } from '@reduxjs/toolkit'
import cartItemSlice from './Reducers/cartItemSlice'
import productDetailsSlice from './Reducers/productDetailsSlice'
import productsSlice from './Reducers/productsSlice'
import userSlice from './Reducers/userSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    cart: cartItemSlice
  },
})