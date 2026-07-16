import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Micro Info Bar */}
      <div className="bg-slate-50 text-gray-500 text-xs px-8 md:px-24 py-2 flex flex-wrap justify-between items-center border-b border-gray-100">
        <div className="flex gap-6">
          <span>📧 eBook@gmail.com</span>
          <span>📞 +977 (9821005569) </span>
        </div>
        <div>
          <span>Sun - Fri : 9am - 8pm</span>
          <span className="ml-6">📍 Butwal, Rupandehi, Nepal</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="px-8 md:px-24 py-4 flex items-center justify-between backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-2">
          <span className="text-rose-500 font-black text-xl tracking-wider">MARLIN</span>
          <span className="text-gray-400 text-xs tracking-widest font-mono">BOOKS</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Home</a>
          <a href="#" className="hover:text-indigo-600 transition">About Us</a>
          <a href="#" className="hover:text-indigo-600 transition">Books</a>
          <a href="#" className="hover:text-indigo-600 transition">For Sale</a>
          <a href="#" className="hover:text-indigo-600 transition">For Rent</a>
          <a href="#" className="hover:text-indigo-600 transition">Testimonials</a>
          <a href="#" className="hover:text-indigo-600 transition">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition">Blog</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition">🔍 Search</button>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm">Explore</button>
        </div>
      </nav>
    </header>
  );
}