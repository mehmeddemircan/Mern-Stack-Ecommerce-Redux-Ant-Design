const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const _user = await User.findOne({ email });

  if (_user) {
    res.status(400).json({
      success: false,
      error: "This email already taken Try again please ! ",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Please provide an email and password",
    });
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400).json({
      success: false,
      error: "Invalid email or password",
    });
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(400).json({
      success: false,
      error: "Invalid password",
    });
  }

  sendToken(user, 201, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "Email could not found . Try again please",
      });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({
        success: true,
        message: `Succesfully Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(500).json({
        error: "Email could not be send",
      });
    }
  } catch (error) {
    next(error);
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: "Invalid reset token",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).json({
        success: false,
        //  error : 'Password does not match'
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      // message:"Password Reset Success"
    });
  } catch (error) {
    next(error);
  }
});

// Get currently logged in user details   =>   /api/profile/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile private route   => /api/profile/update
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pictures = req.body.pictures || user.pictures ; 
    if (req.body.password) {
      user.password = req.body.password;
    }
    // if (req.body.pictures) {
    //   user.pictures = req.body.pictures || user.pictures ; 
    // }

    const updatedUser = await user.save();

    sendToken(updatedUser, 200, res);
  } else {
    // return next(new ErrorHandler('User not found , not updated '))
    res.status(404).json({
      success: false,
      error: "User not found ,not updated",
    });
  }
});

// wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({
    wishlisted: true,
    ok: true,
  });
});

exports.wishlist = catchAsyncErrors(async (req, res, next) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json({
    list,
  });
});

exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  );

  res.json({ 
    wishlisted: false ,
    ok: true 
  });
});

// cart
exports.userCart = catchAsyncErrors(async (req, res, next) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id });

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i].product;
    object.title = cart[i].title;
    object.image = cart[i].image;
    object.count = cart[i].quantity;
    object.price = cart[i].price;
    // object.slug = cart[i].slug ;

    products.push(object);
  }

  console.log("products", products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  console.log("cart-total", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  res.json({
    newCart,
    ok: true,
  });
});

exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({
    products,
    cartTotal,
    totalAfterDiscount,
  });
});

exports.emptyCart = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findOne({email : req.user.email}).exec()

    const cart = await Cart.findOneAndRemove({orderdBy : user._id}).exec()

    res.json({
      cart ,
      ok : true
    })

})

exports.saveAddress = catchAsyncErrors(async (req, res, next) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({
    userAddress,
    ok: true,
  });
});

exports.applyCouponToUserCart = catchAsyncErrors(async (req, res, next) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {

    console.log('ı am  null');
    return res.status(400).json({
      error: "Invalid coupon",
    });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price image count")
    .exec();

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.status(200).json({
    totalAfterDiscount, 
    validCoupon, 
    ok : true 
  });
  // res.json(totalAfterDiscount)

});



// orderController 
exports.createOrder = catchAsyncErrors(async(req,res,next) => {

  const {paymentIntent} = req.body.stripeResponse

  const user = await User.findOne({email : req.user.email}).exec()

  let {products}   =  await Cart.findOne({orderdBy : user._id})

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy : user._id,


  }).save()

  // decrement quantity , increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne : {
        filter : {_id : item.product._id}, // import item.product
        update : {$inc : {quantity :  -item.count, sold: +item.count  }},

      },

    }
  })

 let updated = await   Product.bulkWrite(bulkOption,{})
  console.log('PRODUCT QUANTIYY ---- AND SOLDDDD ',updated);
  console.log("new order save",newOrder);
  res.json({
    // newOrder , 
    ok : true 
  })


})


exports.getOrders = catchAsyncErrors(async(req,res,next) => {

  const  user = await User.findOne({email : req.user.email}).exec()

  const  userOrders = await Order.find({orderdBy : user._id}).populate('products.product').exec()

  res.json({
  userOrders
  })


})