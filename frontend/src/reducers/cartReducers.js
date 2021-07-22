import {
  ADD_TO_CART,
  ADD_USER_CART,

  EMPTY_CART,
  GET_USER_CART,
  REMOVE_ITEM_CART,
  RESET_CART,
  SAVE_SHIPPING_INFO,

} from "../constants/cartConstants";
import {
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_RESET,
  APPLY_COUPON_SUCCESS,
} from "../constants/couponConstants";

export const cartReducer = (
  state = {
    success: false,
    newCart: [],
    cartItems: [],
    shippingInfo: {},
    product: {},
    cartTotal: 0,
    products: [],
    totalAfterDiscount: 0,
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case RESET_CART:
      return {
        ...state,
        cartItems: [],
        products: [],
      };

    case ADD_USER_CART:
      return {
        ...state,
        newCart: action.payload,
        success: true,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case GET_USER_CART:
      return {
        ...state,
        success: true,
        products: action.payload.products,
        cartTotal: action.payload.cartTotal,
        totalAfterDiscount: action.payload.totalAfterDiscount,
      };
    case EMPTY_CART:
      return {
        ...state,

        cart: action.payload,
      };

    default:
      return state;
  }
};

export const userCouponReducer = (
  state = { totalAfterDiscount: 0 },
  action
) => {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return {
        ...state,
        couponApplied: false,
      };
    // coupon applied true
    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        success: true,
        totalAfterDiscount: action.payload.totalAfterDiscount,
        validCoupon: action.payload.validCoupon,
        couponApplied: true,
      };

    case APPLY_COUPON_FAIL:
      return {
        ...state,
        success: false,
        error: action.payload,
        couponApplied: false,
      };
    case APPLY_COUPON_RESET:
      return {
        ...state,
        success: false,
        couponApplied: false,
      };

    default:
      return state;
  }
};
