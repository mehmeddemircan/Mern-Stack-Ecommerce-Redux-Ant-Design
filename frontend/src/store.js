import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllCategoriesReducer,
  getCategoryReducer,
  getSubsByCategoryReducer,
} from "./reducers/categoryReducers";
import {
  getAllProductsReducer,
  getProductPostReducer,
  getProductReducer,
  getRelatedReducer,
  getTotalProductReducer,
  productCreateReviewReducer,
  productPostFilterReducer,

  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  forgotPasswordReducer,
  newOrderReducer,
  updateUserProfileReducer,
  userDetailsReducer,
  userOrderReducer,
} from "./reducers/userReducers";
import {
  getAllSubCategoriesReducer,
  getSubCategoryReducer,
} from "./reducers/subReducers";
import searchReducers from "./reducers/searchReducers";
import { cartReducer, userCouponReducer } from "./reducers/cartReducers";
import { userStripeReducer } from "./reducers/stripeReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
  getProduct: getProductReducer,
  getAllProducts: getAllProductsReducer,
  getProductPost: getProductPostReducer,
  getTotalProduct: getTotalProductReducer,
  productCreateReview: productCreateReviewReducer,

  review: reviewReducer,
  getRelated: getRelatedReducer,
  getAllCategories: getAllCategoriesReducer,
  getCategory: getCategoryReducer,
  getAllSubCategories: getAllSubCategoriesReducer,
  getSubCategory: getSubCategoryReducer,
  search: searchReducers,
  productPostFilter : productPostFilterReducer,
  cart : cartReducer ,
  getSubsByCategory :getSubsByCategoryReducer,
   userCoupon:userCouponReducer,
   userStripe : userStripeReducer,
   newOrder : newOrderReducer,
   userOrder : userOrderReducer,
   productReviews:productReviewsReducer
});

const INITIAL_STATE = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    // shippingInfo: localStorage.getItem('shippingInfo')
    //     ? JSON.parse(localStorage.getItem('shippingInfo'))
    //     : {}
  }
};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
