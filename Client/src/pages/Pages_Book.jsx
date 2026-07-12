import React, { useState, useEffect } from 'react';
import BookCard from '../components/Ebooks/BookCard';
import { useLocation } from 'react-router-dom';
import API from '../services/axios'; // 1. Added API Import

const Pages_Book = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search'); // Contains typed keyword
  const [allBooks, setAllBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // 2. Updated useEffect block using central API instance and proper null-checking
  useEffect(() => {
    // Avoid appending literal "null"
    const url = searchQuery && searchQuery !== 'null' 
      ? `/book?search=${encodeURIComponent(searchQuery)}` 
      : '/book';

    API.get(url)
      .then(res => setAllBooks(res.data || []))
      .catch(err => console.error("Error loading library catalog:", err));
  }, [searchQuery]);

  const categories = ['All', 'Business & Money', 'Self-Help & Growth', 'Technology & Future', 'Health & Fitness'];

  // Filters the loaded state array cleanly on the frontend
  const filteredBooks = activeCategory === 'All' 
    ? allBooks 
    : allBooks.filter(book => book.category === activeCategory);

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      
      {/* EXTENDED BOOK CATALOG CONTAINER */}
      <section className="py-16 px-8 md:px-24">
        
        {/* CATALOG HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
            Discover Knowledge
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Explore Our Digital Library
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Instant access to premium engineering manuals, business strategy blueprints, and life-changing development deep dives. Filter by your target vertical below.
          </p>
        </div>

        {/* REUSABLE CATEGORY FILTER ROW */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                  : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* THE CORE PRODUCTS DYNAMIC GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book._id} className="hover:scale-[1.03] transition duration-300">
                <BookCard book={book} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium text-sm">
                No active ebooks found under the "{activeCategory}" category.
              </p>
            </div>
          )}
        </div>

      </section>

    </div>
  );
};

export default Pages_Book;