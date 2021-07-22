const express = require("express");
const {
  forgotPassword,
  resetPassword,
  login,
  register,
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  userCart,
  getUserCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  emptyCart,
  getOrders
//   emptyCart
} = require("../controllers/userControllers");
// modelName should be replaced here with your choice
const {
  validateRegisterRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../validators/user");
const {
  isAuthenticatedUser,
  adminCheck,
  authorizeRoles,
} = require("../middlewares/auth");
const {
  getUserDetails,
  allUsers,
  updateUser,
  deleteUser,
} = require("../controllers/adminControllers");

const router = express.Router();

router
  .route("/register")
  .post(validateRegisterRequest, isRequestValidated, register);
router.route("/login").post(validateLoginRequest, isRequestValidated, login);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:resetToken").put(resetPassword);

router.route("/profile/me").get(isAuthenticatedUser, getUserProfile);
router.route("/profile/update").put(isAuthenticatedUser, updateUserProfile);

// Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// wishlist routes // protected , users must be logged in
router.route("/user/wishlist").post(isAuthenticatedUser, addToWishlist);
router.route("/user/wishlist").get(isAuthenticatedUser, wishlist);
router
  .route("/user/wishlist/:productId")
  .put(isAuthenticatedUser, removeFromWishlist);

// card routes
router.route("/user/cart").post(isAuthenticatedUser, userCart);
router.route("/user/cart").get(isAuthenticatedUser, getUserCart);
router.route("/user/cart").delete(isAuthenticatedUser, emptyCart);


// Adress
router.route('/user/address').post(isAuthenticatedUser,saveAddress)


// coupon 
router.route('/user/cart/coupon').post(isAuthenticatedUser,applyCouponToUserCart)

// order
router.route('/user/order').post(isAuthenticatedUser, createOrder)
router.route('/user/orders').get(isAuthenticatedUser,getOrders)
module.exports = router;
