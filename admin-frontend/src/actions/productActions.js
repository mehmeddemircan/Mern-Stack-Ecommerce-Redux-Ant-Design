import axios from 'axios'
import {
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPLOAD_PRODUCT_IMAGE_REQUEST,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
  UPLOAD_PRODUCT_IMAGE_FAIL
} from "../constants/productConstants";
import {toast} from 'react-toastify'

export const AllProducts = (count) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
  
      const { data } = await axios.get(`/api/products/${count}`);
  
      dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload: error.response
      });
    }
  };
  
  export const getSingleProduct = (slug) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
  
      const { data } = await axios.get(`/api/product/${slug}`);
  
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCT_FAIL,
        payload: error.response
      });
    }
  };
  
  export const newProduct = (product) => async (dispatch) => {
  
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
  
    // Authorization
      const config = {
        headers: {
            'Content-Type': 'application/json',
          
        } 
    }
     
  
    
      const { data } = await axios.post("/api/product",product,config);
  
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data.product,
      });
      toast.success("Successfully created product")
      
  
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: toast.error(error.response.data.error)
      });
    }
  };
  
  export const updateProduct = (category,slug,token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}` 
        },
      };
      const { data } = await axios.put(`/api/category/${slug}`,category, config);
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.updated,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: toast.error(error.response.data.error),
      });
    }
  };
  
  export const deleteProduct = (slug) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`/api/product/${slug}`, config);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.deleted
      });
  
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: toast.error(error.response.data.error)
      });
    }
  };

  
  