import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Plus, X, Trash2, BookPlus, BookOpen } from 'lucide-react';
import API from '../../services/axios';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
  });
  const [coverImage, setCoverImage] = useState(null);

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/book');
      const bookList = Array.isArray(res.data) ? res.data : res.data?.books || [];
      setBooks(bookList);
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to load books. Check console for details.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    try {
      await API.post('/book/add-book', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        withCredentials: true,
      });

      toast.success('Book added successfully!');
      setFormData({ title: '', author: '', price: '', category: '' });
      setCoverImage(null);
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      console.error('Submit Error:', error);
      const serverMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to add book';
      toast.error(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete Book Handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    setDeletingId(id);
    const token = localStorage.getItem('token');

    try {
      await API.delete(`/book/${id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        withCredentials: true
      });

      toast.success('Book deleted successfully!');
      setBooks((prevBooks) => prevBooks.filter((book) => (book._id || book.id) !== id));
    } catch (error) {
      console.error('Delete Error:', error);
      const serverMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to delete book';
      toast.error(serverMessage);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      {/* Header & Toggle Action */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
            {/* Book Count Badge */}
            <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-purple-200">
              <BookOpen className="w-3.5 h-3.5" /> {books.length} {books.length === 1 ? 'Book' : 'Books'}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Here you can add, edit, or delete books from the database.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition"
        >
          {showForm ? (
            <>
              <X className="w-5 h-5" /> Close Form
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" /> Add New Book
            </>
          )}
        </button>
      </div>

      {/* Add Book Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-purple-600" /> Add New Book
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Jivan ko Cheu Bata"
                  className="w-full border px-3 py-2 rounded-lg text-sm text-black focus:outline-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., F. Suman Pokhrel"
                  className="w-full border px-3 py-2 rounded-lg text-sm text-black focus:outline-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="1"
                  className="w-full border px-3 py-2 rounded-lg text-sm text-black focus:outline-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="Fiction / Business / Life"
                  className="w-full border px-3 py-2 rounded-lg text-sm text-black focus:outline-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Cover Image / File</label>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-bold transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Adding Book...' : 'Save Book'}
            </button>
          </form>
        </div>
      )}

      {/* Books Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">All Catalog Items</h2>
          <span className="text-xs text-gray-500 font-medium">Total: <strong className="text-purple-600">{books.length}</strong></span>
        </div>

        {books.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No books available in the database yet.</p>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const bookId = book._id || book.id;
                return (
                  <tr key={bookId} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">{book.title}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3">{book.category}</td>
                    <td className="p-3">${book.price}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(bookId)}
                        disabled={deletingId === bookId}
                        title="Delete Book"
                        className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;