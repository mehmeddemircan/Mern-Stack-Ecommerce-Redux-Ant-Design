const express = require('express');


const router = express.Router();

const {createPaymentIntent} = require('../controllers/stripeControllers'); 
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/create-payment-intent').post(isAuthenticatedUser,createPaymentIntent)

module.exports = router;