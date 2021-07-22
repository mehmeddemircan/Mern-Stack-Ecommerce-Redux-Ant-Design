// modelName should be replaced here with your choice
const Category = require("../models/Category");
const Sub = require("../models/Sub");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const slugify = require("slugify");
const Product = require("../models/Product");
// if we encounter any error in frontend , these res.status will be got rid of objects , we will just do that to solve this problem
exports.create = catchAsyncErrors(async (req, res, next) => {

  try {
    
    const { name } = req.body;


    const _category = await Category.findOne({ name });
  
    if (_category) {
      res.status(400).json({
        success: false,
        error: "This category already created",
      });
    }
  
    const category = await Category.create({
        name,
        slug: slugify(name)
    })
    
    res.status(200).json({
  
      category,
    });
  } catch (error) {
    res.status(400).json({
     
      error: error
    })
  }

});
exports.list = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    categories,
  });
});
exports.read = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  const products = await  Product.find({category})
  .populate('category')

  .exec()
  res.status(200).json({
    category,
    products,
  });
});
exports.update = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const updated = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name, slug: slugify(name) },
    { new : true }
  );

  res.status(200).json({
      success: true ,
      updated
  })

});
exports.remove = catchAsyncErrors(async (req, res, next) => {
  const deleted = await Category.findOneAndDelete({ slug: req.params.slug });

  res.status(200).json({
    deleted
  });
});

exports.getSubs = catchAsyncErrors(async(req,res,next) => {
  const subs =  await  Sub.find({parent: req.params._id})

  res.status(200).json({
    subs
  })
})