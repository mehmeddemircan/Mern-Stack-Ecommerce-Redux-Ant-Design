const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const router= express.Router();
// Controllers
const {create, listAll , list, remove, read, productsCount, listSlider, listBestSlider, createProductReview, productReview, 
    getProductReviews, listReviews, listRelated
 ,deleteReview, searchFilters }  = require('../controllers/productControllers')

// Routes
router.route('/product').post(create)
router.route('/products/total').get(productsCount)
router.route('/products/:count').get(listAll)  
 
router.route('/product/:slug').get(read)  

router.route('/product/:slug').delete(remove)

router.route('/products').post(list) 
router.route('/products/slider').post(listSlider) 

// router.route('/product/review/:productId').put(isAuthenticatedUser,productReview)

// comment
router.route('/product/:productId/create/review').put(isAuthenticatedUser,createProductReview)

router.route('/product/:productId/reviews').get(getProductReviews)
// router.route('/reviews').delete(isAuthenticatedUser,deleteReview); 
// router.route('/product/:productId/reviews').post(listReviews) 
//  router.route('/product/:productId/reviews').get(listReviews)

// related
router.route('/product/related/:productId').get(listRelated)

// search 
router.route('/search/filters').post(searchFilters)

module.exports = router;