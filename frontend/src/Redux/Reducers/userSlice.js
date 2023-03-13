import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user : [] },
  reducers: {
    LOGIN_REQUEST : (state) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    },
    LOGIN_SUCCESS: (state, actions) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: actions.payload
      };
    },
    LOGIN_FAIL: (state, actions) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: actions.payload.message,
      };
    },

    REGISTER_REQUEST : (state) => {
        return {
          loading: true,
          isAuthenticated: false,
        };
      },
      REGISTER_SUCCESS: (state, actions) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: actions.payload
        };
      },
      REGISTER_FAIL: (state, actions) => {
        return {
           ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: actions.payload.message,
        };
      },

      LOAD_USER_REQUEST : (state) => {
        return {
          loading: true,
          isAuthenticated: false,
        };
      },
      LOAD_USER_SUCCESS: (state, actions) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: actions.payload
        };
      },
      LOAD_USER_FAIL: (state, actions) => {
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: actions.payload?.message || "Internal Error",
        };
      },
      LOGOUT_SUCCESS: (state, actions) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user : null
        };
      },
      LOGOUT_FAIL: (state, actions) => {
        return {
          ...state, 
          loading: false,
          error: actions.payload?.message || "Logout Error",
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
export const {CLEAR_ERRORS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } = userSlice.actions;

export default userSlice.reducer;
