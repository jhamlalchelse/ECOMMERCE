import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Reducers/userSlice"


export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch(LOGIN_REQUEST());
        const options = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(`http://localhost:8000/api/v1/login`,{ email, password },options)
        localStorage.setItem('x-access-token', data.token)
        dispatch(LOGIN_SUCCESS(data.user));
    } catch (error) {
        dispatch(LOGIN_FAIL(error?.response?.data))
    }
}

export const register = (name, email,password) => async(dispatch)=>{
    try {
        dispatch(REGISTER_REQUEST());
        const options = {
            headers: {
              "Content-Type": "Application/json",
            },
        };
        const {data} = await axios.post(`http://localhost:8000/api/v1/register`, { name, email, password },options)
        console.log('action register data is: ', data);
        dispatch(REGISTER_SUCCESS(data.user));
    } catch (error) {
        dispatch(REGISTER_FAIL(error?.response?.data))
    }
}


// Load User
export const loadUser = () => async(dispatch)=>{
    try {
        dispatch(LOAD_USER_REQUEST());
        const token = localStorage.getItem('x-access-token')
        const {data} = await axios.get(`http://localhost:8000/api/v1/me`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-access-token': token
            }
        })
        dispatch(LOAD_USER_SUCCESS(data.user));
    } catch (error) {
        dispatch(LOAD_USER_FAIL(error?.response?.data))
    }
}


export const logout = () => async(dispatch)=>{
    try {
        await axios.get(`http://localhost:8000/api/v1/logout`)
        dispatch(LOGOUT_SUCCESS());
    } catch (error) {
        dispatch(LOGOUT_FAIL(error?.response?.data))
    }
}

// clearing error
export const clearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
}