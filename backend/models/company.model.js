import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  website:{
    type: String,
    required :true,
  },
  location:{
    type: String,

  },
    logo: {
        type: String,
        
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  
},{timestamps: true});