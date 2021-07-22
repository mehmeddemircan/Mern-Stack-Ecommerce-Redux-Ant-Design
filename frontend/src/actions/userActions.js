import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  ADD_TO_WISHLIST,
  GET_ALL_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SAVE_USER_ADDRESS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
} from "../constants/authConstants";
import { toast } from "react-toastify";
import { RESET_CART } from "../constants/cartConstants";
import {

  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
} from "../constants/couponConstants";

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post(`/api/login`, {
      ...user,
    });

    // Success
    if (res.status >= 200 && res.status <= 205) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    
    } else {
      dispatch({ type: LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,

      payload: toast.error(error.response.data.error),
    });
  }
};

export const register = (user) => async (dispatch) => {
  let res;
  try {
    dispatch({ type: REGISTER_REQUEST });

    res = await axios.post("/api/register", user);

    // Success
    if (res.status >= 200 && res.status <= 205) {
      dispatch({ type: REGISTER_SUCCESS });
      //   message

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
      toast.success("Successfully created account.Have nice shopping ! ");
      //   fail
    } else {
      dispatch({ type: REGISTER_FAIL });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: toast.error(error.response.data.error),
    });
  }
};

// it provides when you refres the page , it kept you logged in to website
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// Logout
export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch({ type: RESET_CART });
};

// forgot password
export const forgotPassword = (user) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const res = await axios.post(`/api/password/forgot`, email,config);
    const { data } = await axios.post("/api/password/forgot", user, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: toast.success(data.message),
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: toast.error(error.response.data.error),
    });
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("hersadas");
    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      passwords,
      config
    );
    console.log("hersdadasdsasadas");
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: toast.success(data.message),
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: toast.error(error.response.data.error),
    });
  }
};

// get user profile action
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      auth: { token },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/profile/me", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user profile action
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      auth: { token },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put("/api/profile/update", user, config);

    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// add to wishlist  // protected routes
export const addToWishlist = (productId, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    "/api/user/wishlist",
    { productId },
    config
  );

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: data.wishlisted,
  });
};

export const removeFromWishlist = (productId, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `/api/user/wishlist/${productId}`,
    { productId },
    config
  );

  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: data,
  });
};

export const getAllWishlist = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get("/api/user/wishlist", config);

  dispatch({
    type: GET_ALL_WISHLIST,
    payload: data.list,
  });
};

export const saveUserAdress = (address, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post("/api/user/address", { address }, config);

  dispatch({
    type: SAVE_USER_ADDRESS,
    payload: data.userAddress,
  });
};

export const applyCoupon = (coupon, token) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post("/api/user/cart/coupon", { coupon }, config);

    const { totalAfterDiscount, validCoupon } = res.data;

    dispatch({
      type: APPLY_COUPON_SUCCESS,
      payload: {
        validCoupon,
        totalAfterDiscount,
      },
    });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
      payload: toast.error(error.response.data.error),
    });
  }
};



export const createOrder = (stripeResponse, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/user/order",
      { stripeResponse },
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
      // payload : data.newOrder
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getUserOrders = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/user/orders", config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.userOrders,
      // payload : data.newOrder
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};
