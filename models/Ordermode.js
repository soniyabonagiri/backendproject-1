import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array},
    // price:{type:Number},
    // address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}




})


const OrderModel = mongoose.models.order || mongoose.model("order",orderSchema);


export default OrderModel
