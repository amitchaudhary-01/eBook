import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../../services/axios';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const res = await API.get('/book/addbook');
      setBooks(res.data || []);
    } catch (err) {
      console.error("Error fetching books:", err);
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

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    try {
      await axios.post('http://localhost:3000/api/v1/admin/add-book', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success('Book added successfully!');
      setFormData({ title: '', author: '', price: '', category: '' });
      setCoverImage(null);
      setShowForm(false);
      fetchBooks(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header & Toggle Action */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
          <p className="text-gray-500 text-sm">Here you can add, edit, or delete books from the database.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition"
        >
          {showForm ? 'Close Form' : '+ Add New Book'}
        </button>
      </div>

      {/* Add Book Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Book</h2>
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
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-bold transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Adding Book...' : 'Save Book'}
            </button>
          </form>
        </div>
      )}

      {/* Books Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
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
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b">
                  <td className="p-3 font-medium text-gray-800">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.category}</td>
                  <td className="p-3">${book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;