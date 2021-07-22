import {
  CREATE_SUBCATEGORY_FAIL,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_RESET,
  CREATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_RESET,
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

// single category
export const getSubCategoryReducer = (state = {sub : {}}, action) => {
  switch (action.type) {
    case GET_SINGLE_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        sub: action.payload,
      };

    case GET_SINGLE_SUBCATEGORY_FAIL:
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

export const getAllSubCategoriesReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_SUBCATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subs: action.payload,
      };
    case GET_ALL_SUBCATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const newSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBCATEGORY_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        sub: action.payload,
      };
    case CREATE_SUBCATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_SUBCATEGORY_RESET:
      return {
        ...state,

        success: false,
      };

    default:
      return state;
  }
};

export const subCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBCATEGORY_REQUEST:
    case UPDATE_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };

    case DELETE_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, deleted: action.payload };

    case UPDATE_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false,  updated: action.payload };

    case DELETE_SUBCATEGORY_FAIL:
    case UPDATE_SUBCATEGORY_FAIL:
      return { ...state, error: action.payload };

    case DELETE_SUBCATEGORY_RESET:
      return {
        ...state,
        deleted: false,
      };
    case UPDATE_SUBCATEGORY_RESET:
      return {
        ...state,
        updated: false,
      };
    default:
      return state;
  }
};
