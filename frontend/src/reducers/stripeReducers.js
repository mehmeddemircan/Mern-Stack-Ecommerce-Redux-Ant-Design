import {
  STRIPE_APPLY_FAIL,
  STRIPE_APPLY_REQUEST,
  STRIPE_APPLY_SUCCESS,
  STRIPE_APPLY_RESET,
} from "../constants/stripeConstants";

export const userStripeReducer = (state = {}, action) => {
  switch (action.type) {
    case STRIPE_APPLY_REQUEST:
      return {
        ...state,
        processing: true,
      };

    case STRIPE_APPLY_SUCCESS:
      return {
        ...state,
        processing: false,
        success: true,
        clientSecret: action.payload.clientSecret,
        cartTotal: action.payload.cartTotal,

        totalAfterDiscount: action.payload.totalAfterDiscount,
      };

    case STRIPE_APPLY_FAIL:
      return { ...state, success: false, error: action.payload.error };

    case STRIPE_APPLY_RESET:
      return { ...state, totalAfterDiscount: 0 };
    default:
      return state;
  }
};
