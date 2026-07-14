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

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Optional: Emit socket event if you want real-time UI updates
    const io = req.app.get('io');
    if (io) io.emit('book_deleted', id);

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete Book Error:', error);
    return res.status(500).json({ message: 'Server error while deleting book' });
  }
};

export default newbook_controller;