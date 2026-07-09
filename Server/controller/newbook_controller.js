import express from 'express';
import book_schema from '../schema/book_schema.js';
import { upload } from '../middleware/multer.js'; // Adjust path as needed

const newbook_controller = async(req,res)=>{

  try {
    const { title, author, price, category } = req.body;
    const coverImage = req.file ? req.file.filename : '';

    if(!title || !author || !price || !category){
        message:"New Book Data Missing"
    }

    const newBook = new Book({
      title,
      author,
      price,
      category,
      coverImage
    });

    await newBook.save();

    res.status(201).json({
      message: 'Book added successfully!',
      book: newBook
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};

export default newbook_controller;