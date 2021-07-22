import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  GET_SINGLE_CATEGORY_REQUEST,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SUBS_BY_CATEGORY_REQUEST,
  GET_SUBS_BY_CATEGORY_FAIL,
  GET_SUBS_BY_CATEGORY_SUCCESS,
  GET_SUBS_BY_CATEGORY_RESET,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_RESET,
} from "../constants/categoryConstants";

// single category
export const getCategoryReducer = (state = { category : {}}, action) => {
  switch (action.type) {
    case GET_SINGLE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };

    case GET_SINGLE_CATEGORY_FAIL:
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

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const newCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_CATEGORY_RESET:
      return {
        ...state,

        success: false,
      };

    default:
      return state;
  }
};

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case DELETE_CATEGORY_SUCCESS:
      return { ...state, loading: false,  deleted: action.payload };

    case UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, updated: action.payload };

    case DELETE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
      return { ...state, error: action.payload };

    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        deleted: false,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        updated: false,
      };
    default:
      return state;
  }
};

export const getSubsByCategoryReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case GET_SUBS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBS_BY_CATEGORY_SUCCESS : 
      return {
        ...state,
        loading: false,
        success: true ,
        subs: action.payload,
      };
    case GET_SUBS_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
    default:
      return state;
  }
};