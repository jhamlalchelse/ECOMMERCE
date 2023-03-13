import axios from "axios";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../Reducers/productDetailsSlice";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../Reducers/productsSlice";



export const getProduct = (keyword=" ", price=[0,200000], category=" ") => async (dispatch) =>{
try {
    dispatch(ALL_PRODUCT_REQUEST());
    // const  url = `http://localhost:8000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category }`
        let url = `http://localhost:8000/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}`
        if(category !==" "){
            url = `http://localhost:8000/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category }`
        }
    const {data} = await axios.get(url)
    dispatch(ALL_PRODUCT_SUCCESS({
        data
    }));
} catch (error) {
    dispatch(ALL_PRODUCT_FAIL(error?.response?.data))
}
}

export const productDetails = (prodId) => async (dispatch) =>{
    try {
        dispatch(PRODUCT_DETAILS_REQUEST());
        const {data} = await axios.get(`http://localhost:8000/api/v1/product/${prodId}`)
        dispatch(PRODUCT_DETAILS_SUCCESS(data.product));
    } catch (error) {
        dispatch(PRODUCT_DETAILS_FAIL(error?.response?.data))
    }
    }

// clearing error
export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
}