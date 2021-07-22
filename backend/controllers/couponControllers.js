// modelName should be replaced here with your choice
const Category = require("../models/Category");
const Coupon = require('../models/Coupon')
const Product = require('../models/Product')
const Sub = require('../models/Sub')

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// if we encounter any error in frontend , these res.status will be got rid of objects , we will just do that to solve this problem
exports.create = catchAsyncErrors(async (req, res, next) => {

  try {
    
    const { name, expiry,discount } = req.body;


    const _coupon = await Coupon.findOne({ name });
  
    if (_coupon) {
      res.status(400).json({
        success: false,
        error: "This coupon already created",
      });
    }
  
    const coupon = await Coupon.create({
        name,
        expiry,
        discount
    })
    
    res.status(200).json({
      coupon,
    });

  } catch (error) {
    res.status(400).json({
     
      error: error
    })
  }

});
exports.list = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    coupons,
  });
});


exports.remove = catchAsyncErrors(async (req, res, next) => {
  const deleted = await Coupon.findByIdAndDelete(req.params.couponId)

  res.status(200).json({
    deleted
  });
});
