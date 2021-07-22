import {
  GET_ALL_SUBCATEGORIES_FAIL,
  GET_ALL_SUBCATEGORIES_REQUEST,
  GET_ALL_SUBCATEGORIES_SUCCESS,
  GET_SINGLE_SUBCATEGORY_FAIL,
  GET_SINGLE_SUBCATEGORY_REQUEST,
  GET_SINGLE_SUBCATEGORY_SUCCESS,
} from "../constants/subConstants";

// single category
export const getSubCategoryReducer = (
  state = { sub: {}, products: [] },
  action
) => {
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
        sub: action.payload.sub,
        products: action.payload.products,
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
