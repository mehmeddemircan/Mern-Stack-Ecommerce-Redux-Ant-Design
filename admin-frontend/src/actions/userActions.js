import axios from "axios";
import { useTranslation } from "react-i18next";
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
  USER_UPDATE_PROFILE_FAIL
} from "../constants/authConstants";
import { toast } from "react-toastify";

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
      // toast.success('Successfully logged in to website')
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
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT_SUCCESS });
};


// forgot password
export const forgotPassword = (user) => async (dispatch) => {
  try {
 
      dispatch({ type: FORGOT_PASSWORD_REQUEST })
    
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      // const res = await axios.post(`/api/password/forgot`, email,config);
      const { data } = await axios.post('/api/password/forgot', user, config)
   

        
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: toast.success(data.message)
    })

    
  } catch (error) {
      dispatch({
          type: FORGOT_PASSWORD_FAIL,
          payload: toast.error(error.response.data.error)
      })
  }
}


// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {

      dispatch({ type: NEW_PASSWORD_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      console.log('hersadas');
      const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config)
      console.log('hersdadasdsasadas');
      dispatch({
          type: NEW_PASSWORD_SUCCESS,
          payload: toast.success(data.message)
      })

  } catch (error) {
      dispatch({
          type: NEW_PASSWORD_FAIL,
          payload: toast.error(error.response.data.error)
      })
  }
}

// get user profile action
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { auth: {token} } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };

    const { data } = await axios.get("/api/profile/me",config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch ({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message
    })

  }
};

// update user profile action
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { auth: {token} } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      },
    };
    const { data } = await axios.put("/api/profile/update",user,config);

    localStorage.setItem("user", JSON.stringify(user));
 
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });


  } catch (error) {
    dispatch ({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.error
    })

  }
};