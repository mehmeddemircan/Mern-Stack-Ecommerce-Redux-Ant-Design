
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Coupon = require('../models/Coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createPaymentIntent = catchAsyncErrors(async(req,res,next) => {


  const {couponApplied} = req.body
  // return ; 
    // later applying coupon 
    // later calculate price 


// 1. find user 
  const user = await User.findOne({email : req.user.email}).exec()

// 2. get user cartTotal 
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderdBy  : user._id}).exec() 

  console.log('CART TOTAL ',cartTotal, "After discount ",totalAfterDiscount);
 

  let finalAmount =  0 ; 

  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount * 100)
  }else {
    finalAmount = Math.round(cartTotal * 100)
  }

// create payment intent 

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "usd",
      });
    
      res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount ,
        payable : finalAmount
      });
})