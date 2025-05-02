import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Moviemodel = mongoose.model('Movie', movieSchema);

export default Moviemodel;