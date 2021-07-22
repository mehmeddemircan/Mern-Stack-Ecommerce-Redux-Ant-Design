//replace modelSchema,ModelName with whatever you want
const mongoose = require('mongoose');

const {ObjectId } = mongoose.Schema
const cartSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : ObjectId,
                ref : 'Product'
            },
            count : Number,
            price : Number,
            title : String,
            image: String,
            // slug : String , 
        },
    ],
    cartTotal : Number,
    totalAfterDiscount: Number,
    orderdBy: {
        type: ObjectId,
        ref : 'User'
    },
  
},{timestamps: true });

module.exports =  mongoose.model('Cart', cartSchema);;