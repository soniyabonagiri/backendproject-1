import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // genre: {
  //   type: String,
  //   required: true,
  // },
  // duration: {
  //   type: Number, // Duration in minutes
  //   required: true,
  // },
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
  // ,
  // releaseDate: {
  //   type: Date,
  //   required: true,
  // },
  // language: {
  //   type: String,
  //   required: true,
  // },
  // certificate: {
  //   type: String, // e.g. "U", "U/A", "A"
  // }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Moviemodel = mongoose.model('Movie', movieSchema);

export default Moviemodel;