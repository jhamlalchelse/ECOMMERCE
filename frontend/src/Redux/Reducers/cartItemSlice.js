import { createSlice } from '@reduxjs/toolkit'


export const cartItemSlice = createSlice({
  name: 'CartItems',
  initialState : { 
        cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
  },
  reducers: {
    addtocart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cartItems.find(i=> i.product ===item.product) || false
    if(isItemExist){
        return{
            ...state,
            cartItems: state.cartItems.map(i=>i.product === item.product ? item: i)
        }
    }
     else{
        return{
            ...state,
            cartItems : [...state.cartItems, item]
        }
     }
    },
    removetocart: (state, action) => {
      const prodId = action.payload;
      const isItemExist = state.cartItems.find(i=> i.product ===prodId) 
      if(isItemExist){
          return{
              ...state,
              cartItems: state.cartItems.filter(i=>i.product !== prodId)
          }
      }
       else{
          return{
              ...state
          }
       }
      },
     saveshippinginfo:(state,action)=>{
      return{
        ...state,
        shippingInfo: action.payload
      }
     } 
  }
})

// Action creators are generated for each case reducer function
export const {addtocart ,removetocart ,saveshippinginfo} = cartItemSlice.actions

export default cartItemSlice.reducer