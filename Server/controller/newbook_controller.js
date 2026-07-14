import Book from '../schema/book_schema.js';

// POST: Add new book
const newbook_controller = async (req, res) => {
  try {
    const { title, author, price, category } = req.body;

    if (!title || !author || !price || !category) {
      return res.status(400).json({ message: "New Book Data Missing" });
    }

    const coverImage = req.file ? req.file.filename : '';
    const fileType = req.file ? req.file.mimetype : '';

    const newBook = new Book({ title, author, price, category, coverImage, fileType });
    await newBook.save();

    return res.status(201).json({ message: 'Book added successfully!', book: newBook });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};

// GET: Fetch all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

export default newbook_controller;