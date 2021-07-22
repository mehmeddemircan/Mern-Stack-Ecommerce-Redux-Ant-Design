import axios from "axios";
import {
  CREATE_SUBCATEGORY_FAIL,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_RESET,
  CREATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  GET_ALL_SUBCATEGORIES_FAIL,
  GET_ALL_SUBCATEGORIES_REQUEST,
  GET_ALL_SUBCATEGORIES_SUCCESS,
  GET_SINGLE_SUBCATEGORY_FAIL,
  GET_SINGLE_SUBCATEGORY_REQUEST,
  GET_SINGLE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_SUCCESS,
} from "../constants/subConstants";
import {toast} from 'react-toastify'
import { message } from "antd";


export const AllSubCategories = () => async (dispatch) => {

    try {
        dispatch({type:GET_ALL_SUBCATEGORIES_REQUEST})

        const {data} = await axios.get('/api/subs')

        dispatch({type: GET_ALL_SUBCATEGORIES_SUCCESS,
            payload: data.subs
        })


    } catch (error) {
        dispatch({
            type: GET_ALL_SUBCATEGORIES_FAIL,
            payload: error.response.data.error
        })
    }


};
export const getSingleSubCategory = (slug) => async (dispatch) => {

    try {
        dispatch({type:GET_SINGLE_SUBCATEGORY_REQUEST})

        const {data} = await axios.get(`/api/sub/${slug}`)

        dispatch({type: GET_SINGLE_SUBCATEGORY_SUCCESS,
            payload: data.sub
        })


    } catch (error) {
        dispatch({
            type: GET_SINGLE_SUBCATEGORY_FAIL,
            payload: error.response.data.error
        })
    }


};
// sub categories
export const newSubCategory = (sub,token) => async (dispatch) => {

    try {
      dispatch({ type: CREATE_SUBCATEGORY_REQUEST });
  
    
      const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}` 
        } 
    }
     
  
    
      const { data } = await axios.post("/api/sub",sub,config);
  
      dispatch({
        type: CREATE_SUBCATEGORY_SUCCESS,
        payload: data.sub,
      });
     
      
  
    } catch (error) {
      dispatch({
        type: CREATE_SUBCATEGORY_FAIL,
        payload: toast.error(error.response.data.error)
      });
    }
  };
  
  export const updateSubCategory = (sub,slug,token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}` 
        },
      };
      const { data } = await axios.put(`/api/sub/${slug}`,sub, config);
  
      dispatch({
        type: UPDATE_SUBCATEGORY_SUCCESS,
        payload: data.updated,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBCATEGORY_FAIL,
        payload: toast.error(error.response.data.error),
      });
    }
  };
  
  export const deleteSubCategory = (slug,token) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`/api/sub/${slug}`, config);
  
      dispatch({
        type: DELETE_SUBCATEGORY_SUCCESS,
        payload: data.deleted
      });
  
    } catch (error) {
      dispatch({
        type: DELETE_SUBCATEGORY_FAIL,
        payload: toast.error(error.response.data.error)
      });
    }
  };
  