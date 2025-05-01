import express from 'express';
const app=express();

import multer from 'multer';
app.use(express.urlencoded({extended:false}));

import {addmovie, delmovie,listmovie} from '../controller/moviecontroller.js'

const movierouter=express.Router(); 
movierouter.use(express.json());

// app.post('/add',addmovie);


const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})



const upload=multer({storage:storage})


movierouter.post('/add',upload.single('image'),addmovie);

movierouter.get('/list',listmovie);

movierouter.post('/del',delmovie);


export default movierouter