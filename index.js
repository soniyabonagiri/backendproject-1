import express, { urlencoded } from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import './models/moviemodel.js'
import movierouter from './routes/movieroute.js';
import userRouter from './routes/Userroute.js';

import dotenv from 'dotenv';
import cartRouter from './routes/Cartroute.js';
import orderRouter from './routes/Orderroute.js';
dotenv.config();


const app=express();
const port=4000;

app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(cors());
app.use(cors({origin:'*'}));

connectDB();

app.use('/api',movierouter);

app.use('/api',userRouter);

app.use('/images',express.static('uploads'))

app.use('/api/cart',cartRouter);

app.use('/api/order',orderRouter)

// app.use('/images',express.static('uploads'))
app.get('/success',(req,res)=>{
    res.send('Sucessfull payment')
})

app.get('/cancel',(req,res)=>{
    res.send('Unsucessful payment')
})


app.get('/', (req,res)=>{
    res.send('hello app')
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})