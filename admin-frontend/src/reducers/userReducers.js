import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL
  } from "../constants/authConstants";
  
  const initialState = {
    token: null,
    user: {
      name: "",
      email: "",
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: "",
  };
  
  export const authReducer = (state = initialState, action) => {
    console.log(action);
  
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          authenticating: true,
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          authenticate: true,
          authenticating: false,
        };
  
      case LOGIN_FAIL:
        return {
          ...state,
          authenticating: false,
          error: action.payload.error,
        };
  
      case LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGOUT_SUCCESS: {
        return {
          ...initialState,
        };
      }
      case LOGOUT_FAIL: {
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      }
  
      case REGISTER_REQUEST:
        return {
          ...state,
          authenticating: true,
        };
      // case REGISTER_SUCCESS:
      //   return {
      //     ...state,
      //     user: action.payload.user,
      //     token: action.payload.token,
      //     authenticate: true,
      //     authenticating: false,
      //   };
      case REGISTER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
      case NEW_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case NEW_PASSWORD_SUCCESS:
        return {
          ...state,
          success: action.payload,
        };
  
      case FORGOT_PASSWORD_FAIL:
      case NEW_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // case CLEAR_ERRORS:
      //     return {
      //         ...state,
      //         error: null
      //     }
  
      default:
        return state;
    }
  };
  
  export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case USER_DETAILS_SUCCESS:
        return { ...state, loading: false, user: action.payload.user };
  
      case USER_DETAILS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload.user,
        };
  
      case USER_UPDATE_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  