import {

  CREATE_COUPON_FAIL,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_RESET,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON,
  DELETE_COUPON_RESET,
  GET_ALL_COUPONS,
} from "../constants/couponConstants";

export const userCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
   
    case CREATE_COUPON_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        coupon: action.payload,
      };

    case CREATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_COUPON_RESET:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

export const getAllCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case GET_ALL_COUPONS:
      return { ...state, coupons: action.payload };

    default:
      return state;
  }
};

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COUPON:
      return { ...state, deleted: action.payload };


      case DELETE_COUPON_RESET:
        return { ...state, deleted: false };
    default:
      return state;
  }
};
