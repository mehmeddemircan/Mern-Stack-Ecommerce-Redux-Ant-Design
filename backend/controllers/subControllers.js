// modelName should be replaced here with your choice
const Category = require("../models/Category");
const Product = require('../models/Product')
const Sub = require('../models/Sub')
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const slugify = require("slugify");
// if we encounter any error in frontend , these res.status will be got rid of objects , we will just do that to solve this problem
exports.create = catchAsyncErrors(async (req, res, next) => {

  try {
    
    const { name , parent} = req.body;


    const _sub = await Sub.findOne({ name });
  
    if (_sub) {
      res.status(400).json({
        success: false,
        error: "This sub category already created",
      });
    }
  
    const sub = await Sub.create({
        name,
        parent,
        slug: slugify(name)
    })
    
    res.status(200).json({
  
      sub,
    });
  } catch (error) {
    res.status(400).json({
     
      error: error
    })
  }

});
exports.list = catchAsyncErrors(async (req, res, next) => {
  const subs = await Sub.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    subs,
  });
});
exports.read = catchAsyncErrors(async (req, res, next) => {
  const sub = await Sub.findOne({ slug: req.params.slug });

  const products = await Product.find({ subs : sub })
  .populate('category')
  .exec()


  res.status(200).json({
    sub,
    products
  });
});
exports.update = catchAsyncErrors(async (req, res, next) => {
  const { name ,parent} = req.body;

  const _updated = await Sub.findOne({name})

  if (_updated) {
    res.status(400).json({
      success:false,
      error : 'This subcategory name already using '
    })
  }

  const updated = await Sub.findOneAndUpdate(
    { slug: req.params.slug },
    { name,parent, slug: slugify(name) },
    { new : true }
  );

  res.status(200).json({
      success: true ,
      updated
  })

});
exports.remove = catchAsyncErrors(async (req, res, next) => {
  const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });

  res.status(200).json({
    deleted
  });
});
