import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  coverImage: { 
    type: String 
  } // Stores image filename
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);