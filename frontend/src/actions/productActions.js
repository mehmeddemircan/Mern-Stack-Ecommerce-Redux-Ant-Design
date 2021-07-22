import axios from 'axios'
import {

  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  
  GET_PRODUCTS_POST_REQUEST,
  GET_PRODUCTS_POST_SUCCESS,
  GET_PRODUCTS_POST_FAIL,
  GET_TOTAL_PRODUCT_REQUEST,
  GET_TOTAL_PRODUCT_SUCCESS,
  GET_TOTAL_PRODUCT_FAIL,
  GET_PRODUCTS_BEST_POST_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_REQUEST,
  GET_RELATED_PRODUCT_REQUEST,
  GET_RELATED_PRODUCT_SUCCESS,
  GET_RELATED_PRODUCT_FAIL,
  PRODUCT_POST_FILTER_REQUEST,
  PRODUCT_POST_FILTER_SUCCESS,
  PRODUCT_POST_FILTER_FAIL
} from "../constants/productConstants";
import {toast} from 'react-toastify'

export const getProductsByCount = (count) => async (dispatch) => {
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

    
  export const getProducts = (sort,order,page) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_POST_REQUEST });
  
      const { data } = await axios.post(`/api/products`, {sort,order,page});
  
      dispatch({ type: GET_PRODUCTS_POST_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_POST_FAIL,
        payload: error.response
      });
    }
  };
  
  export const getProductsSlider = (sort,order,limit) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_POST_REQUEST });
  
      const { data } = await axios.post(`/api/products/slider`, {sort,order,limit});
  
      dispatch({ type: GET_PRODUCTS_POST_SUCCESS, payload:   data.products 
      
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_POST_FAIL,
        payload: error.response
      });
    }
  };

  export const getProductsBestSlider = (sort,order,limit) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_POST_REQUEST });
  
      const { data } = await axios.post(`/api/products/slider`, {sort,order,limit});
  
      dispatch({ type: GET_PRODUCTS_BEST_POST_SUCCESS, payload:   data.bestsellers 
      
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_POST_FAIL,
        payload: error.response
      });
    }
  };


 

  

  export const getProductsCount = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TOTAL_PRODUCT_REQUEST });
  
      const { data } = await axios.get(`/api/products/total`);
  
      dispatch({ type: GET_TOTAL_PRODUCT_SUCCESS, payload: data.total });
    } catch (error) {
      dispatch({
        type: GET_TOTAL_PRODUCT_FAIL,
        payload: error.response
      });
    }
  };
  
 
 
  export const createProductReview = (productId, review,token) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
 
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
  
     const {data} =  await axios.put(`/api/product/${productId}/create/review`, review,config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload : data
      })
    } catch (error) {
    
    
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: toast.error(error.response.data.error)
      })
     
    }
  }


  // Get product reviews
export const getProductReviews = (productId) => async (dispatch) => {
  try {

      dispatch({ type: GET_REVIEWS_REQUEST })

      const { data } = await axios.get(`/api/product/${productId}/reviews`)

      dispatch({
          type: GET_REVIEWS_SUCCESS,
          payload: data.reviews
      })

  } catch (error) {

      dispatch({
          type: GET_REVIEWS_FAIL,
          payload: error.response.data.error
      })
  }
}

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {

      dispatch({ type: DELETE_REVIEW_REQUEST })

      const { data } = await axios.delete(`/api/reviews?id=${id}&productId=${productId}`)

      dispatch({
          type: DELETE_REVIEW_SUCCESS,
          payload: data.deleted
      })

  } catch (error) {

      console.log(error.response);

      dispatch({
          type: DELETE_REVIEW_FAIL,
          payload: error.response.data.message
      })
  }
}

// related products
export const getRelatedProducts = (productId) => async (dispatch) => {
  try {

      dispatch({ type: GET_RELATED_PRODUCT_REQUEST })

      const { data } = await axios.get(`/api/product/related/${productId}`)

      dispatch({
          type: GET_RELATED_PRODUCT_SUCCESS,
          payload: data.related
      })

  } catch (error) {

      console.log(error.response);

      dispatch({
          type: GET_RELATED_PRODUCT_FAIL,
          payload: error.response.data.error
      })
  }
}

export const fetchProductsByFilter = (arg) => async (dispatch) => {
  try {

      dispatch({ type: PRODUCT_POST_FILTER_REQUEST})

      const { data } = await axios.post(`/api/search/filters`,arg)

      dispatch({
          type: PRODUCT_POST_FILTER_SUCCESS,
          payload: data
      })

  } catch (error) {

      console.log(error.response);

      dispatch({
          type: PRODUCT_POST_FILTER_FAIL,
          payload: error.response.data.error
      })
  }
}