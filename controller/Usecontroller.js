// import userModel from "../models/Usermodel";
import userModel from '../models/Usermodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser=async(req,res)=>{

    const {email,password}=req.body;
    try{
        //checking if user already exists with this email.
        const user=await userModel.find({email});
        console.log(user)
        if(user.length==0){
            res.json({success:false,message:"User Doesnt Exists"});
        }

        const isMatch= await bcrypt.compare(password,user[0].password);
        if(!isMatch){
           return  res.json({success:false,message:"Invalid Credentials"})
        }

        const token=createtoken(user[0]._id);
        res.json({success:true,message:"Login sucessfull",token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }



}



//Register user
const registerUser=async(req,res)=>{

    const {name,password,email}=req.body;

    
    try{
        //checking if user already exists
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})


        }
        //validating email format and strong password
         if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter Valid Email"})
        }
          if(password.length<8){
            return res.json({success:false,message:"Please Enter Strong Password"})


        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt);




        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user=await newuser.save();
        let token=createtoken(user._id)


        res.json({success:true,message:"sucessfully registered",token})


    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error})


    }



}


export {loginUser,registerUser}


