const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const router= express.Router();
// Controllers
const {create,remove,list}  = require('../controllers/couponControllers')

// Routes
router.route('/coupon').post( isAuthenticatedUser,authorizeRoles('admin'),create)
router.route('/coupons').get(isAuthenticatedUser,authorizeRoles('admin'),list)

router.route('/coupon/:couponId').delete(isAuthenticatedUser,authorizeRoles('admin'),remove)




module.exports = router;