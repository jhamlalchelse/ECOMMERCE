import axios from "axios"
import { addtocart, removetocart, saveshippinginfo } from "../Reducers/cartItemSlice"


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios(`http://localhost:8000/api/v1/product/${id}`)
    dispatch(addtocart({
        product: data.product._id,
        name:data.product.name,
        price:data.product.price,
        // image:data.product.image[0].url,
        image:"https://picsum.photos/200/300",
        // stock:data.product.Stock,
        quantity,
    }))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeItemToCart = (id) => async (dispatch, getState) => {
    dispatch(removetocart(id))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch(saveshippinginfo(data))
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}