const Category = require("../models/Category");
const Sub = require('../models/Sub')
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const slugify = require("slugify");
const cloudinary = require('cloudinary')

// config 
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

exports.upload = catchAsyncErrors(async(req,res,next)=> {

    let result = await cloudinary.uploader.upload(req.body.image,{
        public_id: `${Date.now()}`,
        resource_type :  "auto"
    })

    res.status(200).json({
        public_id : result.public_id,
        url : result.secure_url
    })
})

exports.remove =(req,res,next)=> {
        let image_id = req.body.public_id

       cloudinary.uploader.destroy(image_id,(err,result) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }
        res.send("ok")
       })

}



exports.uploadreviewpicture = catchAsyncErrors(async(req,res,next)=> {
    console.log('hello');
    let result = await cloudinary.uploader.upload(req.body.picture,{
        public_id: `${Date.now()}`,
        resource_type :  "auto"
    })
    console.log('hello');
    res.status(200).json({
        public_id : result.public_id,
        url : result.secure_url
    })

    console.log('hello');
})


exports.removeReviewPicture =(req,res,next)=> {
    let image_id = req.body.public_id

   cloudinary.uploader.destroy(image_id,(err,result) => {
    if (err) {
        return res.json({
            success: false,
            err
        })
    }
    res.send("ok")
   })

}

exports.uploadavatar = catchAsyncErrors(async(req,res,next)=> {

    console.log('hello');
    let result = await cloudinary.uploader.upload(req.body.picture,{
        public_id: `${Date.now()}`,
        resource_type :  "auto"
    })
    console.log('hello');
    res.status(200).json({
        public_id : result.public_id,
        url : result.secure_url
    })

    console.log('hello');
})


exports.removeavatar =(req,res,next)=> {
    let image_id = req.body.public_id

   cloudinary.uploader.destroy(image_id,(err,result) => {
    if (err) {
        return res.json({
            success: false,
            err
        })
    }
    res.send("ok")
   })

}