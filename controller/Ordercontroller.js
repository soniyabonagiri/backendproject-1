import OrderModel from "../models/Ordermode.js";
import userModel from '../models/Usermodel.js';
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51RJAJuQDdecNMU9pdLpd9n1cxlwJ6zTPpH5pIxN5XX0Zjdx45FI2JMxd7nI68914f2EgEHUwTbmGG2n5d1WHaQK500AxRUpetG')

//placing user order from frontend
const placeOrder = async (req, res) => {
    const url='http://localhost:5173'
    console.log('placeorder function is working')
    console.log(req.body);

    const newOrder = new OrderModel({
        userId: req.body.userId,
        items: req.body.items,
        price: req.body.price,
        //  address: req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartdata: {} });


        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:'inr',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity

        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })


        //creating a session
        const session=await stripe.checkout.sessions.create({
            line_items: line_items,
            mode:'payment',
            success_url: 'http://localhost:4000/success',
            cancel_url: 'http://localhost:4000/cancel',
            customer_email:'demo@gmail.com'

        })
    
    res.json(session)


}

const useorders=async (req,res)=>{

    try{
        const orders=await OrderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})

    }
    catch(error){
        console.log(error);
        res.json({sucess:true,message:error})

        
    }


}


export { placeOrder,useorders }


