import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  authReducer,
  forgotPasswordReducer,
  updateUserProfileReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  categoryReducer,
  getAllCategoriesReducer,
  getCategoryReducer,
  getSubsByCategoryReducer,
  newCategoryReducer,
} from "./reducers/categoryReducers";
import {
  getAllSubCategoriesReducer,
  getSubCategoryReducer,
  newSubCategoryReducer,
  subCategoryReducer,
} from "./reducers/subReducers";
import { getAllProductsReducer, getProductReducer, newProductReducer, productReducer } from "./reducers/productReducers";
import { couponReducer, getAllCouponsReducer, userCouponReducer } from "./reducers/couponReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
  category: categoryReducer,
  getCategory: getCategoryReducer,
  getAllCategories: getAllCategoriesReducer,
  newCategory: newCategoryReducer,
  newSubCategory: newSubCategoryReducer,
  getAllSubCategories: getAllSubCategoriesReducer,
  getSubCategory: getSubCategoryReducer,
  subCategory: subCategoryReducer,
  product : productReducer,
  getAllProducts : getAllProductsReducer,
  getProduct : getProductReducer,
  newProduct  : newProductReducer, 
   getSubsByCategory  : getSubsByCategoryReducer,
    userCoupon:userCouponReducer,
    coupon :   couponReducer,
   getAllCoupons: getAllCouponsReducer
});

const INITIAL_STATE = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
