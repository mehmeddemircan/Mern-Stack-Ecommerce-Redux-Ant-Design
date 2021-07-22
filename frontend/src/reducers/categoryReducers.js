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

// single category
export const getCategoryReducer = (
  state = { category: {}, products: [] },
  action
) => {
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
        category: action.payload.category,
        products: action.payload.products,
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

export const getSubsByCategoryReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case GET_SUBS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
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
