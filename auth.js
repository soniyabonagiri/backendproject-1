import jwt from "jsonwebtoken"



const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    // console.log(req.body)
    if(!token){
        res.json({success:false,message:"Not Authorized user, Login Again"})
    }
    try{
        //decoding token
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode.id);
        req.body.userId=token_decode.id;

        next();


    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})


    }




}


export default authMiddleware