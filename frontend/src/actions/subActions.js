import axios from "axios";
import {

    GET_ALL_SUBCATEGORIES_FAIL,
    GET_ALL_SUBCATEGORIES_REQUEST,
    GET_ALL_SUBCATEGORIES_SUCCESS,
    GET_SINGLE_SUBCATEGORY_FAIL,
    GET_SINGLE_SUBCATEGORY_REQUEST,
    GET_SINGLE_SUBCATEGORY_SUCCESS,
 
  } from "../constants/subConstants";

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
            payload: {
                sub : data.sub,
                products : data.products
            }
        })


    } catch (error) {
        dispatch({
            type: GET_SINGLE_SUBCATEGORY_FAIL,
            payload: error.response.data.error
        })
    }


};
