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
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,

} from "../constants/productConstants";

// single PRODUCT
export const getProductReducer = (state = {product : {}}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };

    case GET_SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {
        ...state,

        success: false,
      };

    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
  
      return { ...state, loading: true };

    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false,  deleted: action.payload };

    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, updated: action.payload };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
 
      return { ...state, error: action.payload };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        deleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        updated: false,
      };

 

    default:
      return state;
  }
};
