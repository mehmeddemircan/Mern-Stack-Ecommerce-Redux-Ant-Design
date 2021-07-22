//replace modelSchema,ModelName with whatever you want
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Review schema
const reviewSchema = new mongoose.Schema(
  {
    name : {
      type:String,
      required :true 
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    // picture ,
    pictures : {
      type : Array
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    userProfile : String,
   
      

  
 
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 128,
      text: true,
    },
    slug: {
      type: String,
      unique: true,

      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      unique: true,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    // countInStock: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    },
    reviews: [
      reviewSchema
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
