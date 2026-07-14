import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Plus, X, Trash2, BookPlus, BookOpen, Loader2 } from 'lucide-react';
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
        headers: { 'Content-Type': 'multipart/form-data' },
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

  // Smooth Delete Handler matching AdminUsers
  const handleDelete = async (e, id) => {
  // Prevent any parent row clicks
  e?.stopPropagation();

  if (!id) {
    toast.error("Invalid book ID");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this book?")) return;

  setDeletingId(id);

  try {
    // Retrieve auth token just like in AdminUsers
    const token = localStorage.getItem("token");

    // Pass Authorization headers explicitly
    await API.delete(`/book/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    toast.success("Book deleted successfully!");

    // Instantly remove book from local UI state
    setBooks((prevBooks) =>
      prevBooks.filter((book) => String(book._id || book.id) !== String(id))
    );
  } catch (error) {
    console.error("Delete Book Error:", error);

    const serverMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Delete failed with status ${error.response?.status || "Unknown"}`;

    toast.error(serverMessage);
  } finally {
    setDeletingId(null);
  }
};

  return (
    <div className="space-y-6">
      {/* Header & Toggle Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Books
            </h1>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/20 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> {books.length} {books.length === 1 ? 'Book' : 'Books'}
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Here you can add, edit, or delete books from the database.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg transition text-xs"
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" /> Close Form
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add New Book
            </>
          )}
        </button>
      </div>

      {/* Add Book Form Section */}
      {showForm && (
        <div className="bg-[#121824] p-6 rounded-xl border border-slate-800/90 shadow-xl max-w-2xl">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-indigo-400" /> Add New Book
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Jivan ko Cheu Bata"
                  className="w-full bg-[#0e1420] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Suman Pokhrel"
                  className="w-full bg-[#0e1420] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="1"
                  className="w-full bg-[#0e1420] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="Fiction / Business / Life"
                  className="w-full bg-[#0e1420] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Cover Image / File</label>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 file:transition cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-semibold transition text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Adding Book...' : 'Save Book'}
            </button>
          </form>
        </div>
      )}

      {/* Books Data Table */}
      <div className="bg-[#121824] border border-slate-800/90 rounded-xl overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-slate-800/80">
          <h2 className="text-xs font-mono uppercase text-slate-400 tracking-wider">All Catalog Items</h2>
          <span className="text-xs font-mono text-slate-400">
            Total: <strong className="text-indigo-400">{books.length}</strong>
          </span>
        </div>

        {books.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No books available in the database yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0e1420] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Author</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Price</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {books.map((book) => {
                  const bookId = book._id || book.id;
                  const isDeleting = deletingId === bookId;
                  return (
                    <tr key={bookId} className="hover:bg-slate-900/60 transition">
                      <td className="px-5 py-3.5 font-medium text-white">{book.title}</td>
                      <td className="px-5 py-3.5 text-slate-300">{book.author}</td>
                      <td className="px-5 py-3.5 text-slate-400">{book.category}</td>
                      <td className="px-5 py-3.5 text-slate-200 font-mono">${book.price}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => handleDelete(e, bookId)}
                            disabled={isDeleting}
                            title="Delete Book"
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded transition disabled:opacity-40 w-7 h-7 flex items-center justify-center"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;