import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  GET_SINGLE_CATEGORY_REQUEST,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SUBS_BY_CATEGORY_FAIL,
  GET_SUBS_BY_CATEGORY_REQUEST,
  GET_SUBS_BY_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";


export const AllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/categories");

    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/category/${slug}`);

    dispatch({ type: GET_SINGLE_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CATEGORY_FAIL,
      payload: error.response
    });
  }
};

export const newCategory = (category,token) => async (dispatch) => {

  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

  
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}` 
      } 
  }
   

  
    const { data } = await axios.post("/api/category",category,config);

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data.category,
    });
    toast.success("Successfully created category")
    

  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: toast.error(error.response.data.error)
    });
  }
};

export const updateCategory = (category,slug,token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}` 
      },
    };
    const { data } = await axios.put(`/api/category/${slug}`,category, config);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.updated,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: toast.error(error.response.data.error),
    });
  }
};

export const deleteCategory = (slug,token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/category/${slug}`, config);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.deleted
    });

  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: toast.error(error.response.data.error)
    });
  }
};


export const getCategorySubs = (_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBS_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/category/subs/${_id}`);

    dispatch({ type: GET_SUBS_BY_CATEGORY_SUCCESS, payload: data.subs });
  } catch (error) {
    dispatch({
      type: GET_SUBS_BY_CATEGORY_FAIL,
      payload: error.response
    });
  }
};
