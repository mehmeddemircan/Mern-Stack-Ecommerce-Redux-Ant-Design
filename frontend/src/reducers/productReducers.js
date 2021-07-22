import {
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BEST_POST_SUCCESS,
  GET_PRODUCTS_POST_FAIL,
  GET_PRODUCTS_POST_REQUEST,

  GET_PRODUCTS_POST_SUCCESS,
  GET_RELATED_PRODUCT_FAIL,
  GET_RELATED_PRODUCT_REQUEST,
  GET_RELATED_PRODUCT_RESET,
  GET_RELATED_PRODUCT_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_TOTAL_PRODUCT_FAIL,
  GET_TOTAL_PRODUCT_REQUEST,
  GET_TOTAL_PRODUCT_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_POST_FILTER_FAIL,
  PRODUCT_POST_FILTER_REQUEST,
  PRODUCT_POST_FILTER_RESET,
  PRODUCT_POST_FILTER_SUCCESS,
} from "../constants/productConstants";

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

// single PRODUCT
export const getProductReducer = (state = { product: {} }, action) => {
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

export const getProductPostReducer = (
  state = { products: [], bestsellers: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: action.payload,
      };

    case GET_PRODUCTS_BEST_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bestsellers: action.payload,
      };

    case GET_PRODUCTS_POST_FAIL:
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

export const getTotalProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOTAL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        total: action.payload,
      };
    case GET_TOTAL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};

export const getRelatedReducer = (state = { related: [] }, action) => {
  switch (action.type) {
    case GET_RELATED_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_RELATED_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        related: action.payload,
      };

    case GET_RELATED_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case GET_RELATED_PRODUCT_RESET:
      return {
        ...state,
        related: [],
      };

    default:
      return state;
  }
};

export const productPostFilterReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_POST_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_POST_FILTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        products: action.payload,
      };

    case PRODUCT_POST_FILTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case PRODUCT_POST_FILTER_RESET:
      return {
        ...state,

        success: false,
      };

    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { ...state };
    case GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload.reviews };
    case GET_REVIEWS_FAIL:
      return { ...state };
    default:
      return state;
  }
};
