import axios from "axios";
import {
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  GET_SINGLE_CATEGORY_REQUEST,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SUBS_BY_CATEGORY_FAIL,
  GET_SUBS_BY_CATEGORY_REQUEST,
  GET_SUBS_BY_CATEGORY_SUCCESS,
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
            dispatch({type: GET_SINGLE_CATEGORY_REQUEST})

            const {data} = await axios.get(`/api/category/${slug}`)

            dispatch({type: GET_SINGLE_CATEGORY_SUCCESS,payload : {
             category :  data.category,
             products : data.products
            } })
           
    } catch (error) {
        dispatch({type: GET_SINGLE_CATEGORY_FAIL,
            payload : error.response.data.message
        })
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
