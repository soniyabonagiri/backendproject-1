import Moviemodel from "../models/moviemodel.js"
import movierouter from "../routes/movieroute.js";
import fs from 'fs'
// adding movie


export const addmovie=async(req,res)=>{
    
    let image_filename=`${req.file.filename}`;
    console.log(req.file.filename);

    // let image__filename=`${req.file.filename}`;


    const movie=new Moviemodel({
        name:req.body.name,
        // genre:req.body.genre,
        // duration:req.body.duration,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
        // image:image__filename
        
    })
    try{
        await movie.save();
        res.json({success:true,message:'movie added'})

    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"})

    }

}

//list movie 

export const listmovie=async(req,res)=>{
    try{
        const movies=await Moviemodel.find({});
        res.json({success:true,data:movies})

    }
    catch(e){
        console.log(e);
        res.json({success:false,message:e})

    }
}




//delete movie
    
export const delmovie=async(req,res)=>{
    // const {id}=req.body;
    // console.log({id})
    try{
        const movie=await Moviemodel.findById(req.body.id);
        console.log(movie);
        // fs.unlink(`uploads/${movie.image}`,()=>{});

        await Moviemodel.findByIdAndDelete(movie);
        res.json({success:true,message:"movie removed"})


    }
    catch(e){
        console.log(e);
        res.json({success:false,message:`${e}`})
       


    }
}