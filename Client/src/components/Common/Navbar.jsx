import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from "../../services/axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Access auth state updater from AuthContext
  const { logout, setUser } = useAuth() || {};

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/book?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = async () => {
    try {
      // 1. Call Backend Logout Route
      await API.post('/client/logout', {}, { withCredentials: true });

      // 2. Clear local storage
      localStorage.removeItem('user');

      // 3. Reset Context State
      if (logout) {
        logout();
      } else if (setUser) {
        setUser(null);
      }

      toast.success('Logged out successfully');
      setIsOpen(false);

      // 4. Navigate back to Sign In
      setTimeout(() => navigate('/signin'), 1000);
    } catch (error) {
      console.error('Logout failed:', error);

      // Fallback local cleanup if backend call fails
      localStorage.removeItem('user');
      if (setUser) setUser(null);

      toast.error(error.response?.data?.message || 'Logged out locally');
      navigate('/signin');
    }
  };

  return (
    <header className="w-full bg-purple-200 border-b border-gray-100 sticky top-0 z-50">
      {/* Micro Info Bar */}
      <div className="bg-slate-200 text-gray-500 text-xs px-4 md:px-24 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-gray-100 text-center sm:text-left">
        <div className="flex gap-4 md:gap-6">
          <a href="mailto:eBook@gmail.com" className="hover:text-indigo-600 transition flex items-center gap-1">
            📧 eBook@gmail.com
          </a>
          <a href="tel:+9779821005569" className="hover:text-indigo-600 transition flex items-center gap-1">
            📞 +977 9821005569
          </a>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <span>Sun - Fri : 9am - 8pm</span>
          <Link
            to="https://maps.google.com/?q=Butwal,Rupandehi,Nepal"
            target="_blank"
            className="hover:text-indigo-600 transition flex items-center gap-1"
          >
            📍Butwal, Rupandehi, Nepal
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="px-6 md:px-24 py-4 flex items-center justify-between backdrop-blur-md bg-purple-300 relative gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="text-rose-500 font-black text-xl tracking-wider">E</span>
          <span className="text-gray-700 text-xs tracking-widest font-mono">BOOKS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">
            Home
          </Link>
          <Link to="/aboutus" className="hover:text-indigo-600 transition">
            About Us
          </Link>
          <Link to="/book" className="hover:text-indigo-600 transition">
            Books
          </Link>
          <Link to="/sale" className="hover:text-indigo-600 transition">
            For Sale
          </Link>
          <Link to="/rent" className="hover:text-indigo-600 transition">
            For Rent
          </Link>
          <Link to="/testimonial" className="hover:text-indigo-600 transition">
            Testimonials
          </Link>
          <Link to="/price" className="hover:text-indigo-600 transition">
            Pricing
          </Link>
          <Link to="/blog" className="hover:text-indigo-600 transition">
            Blog
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative hidden sm:block max-w-xs w-full">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/80 text-sm px-4 py-1.5 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
            <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleLogout}
            className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-700 transition shadow-sm hidden sm:inline-block cursor-pointer"
          >
            Logout
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-purple-300 border-b border-purple-200 px-6 py-6 flex flex-col gap-4 text-base font-medium text-gray-700 shadow-xl md:hidden z-40">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-indigo-600 font-semibold py-1">
              Home
            </Link>
            <Link to="/aboutus" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              About Us
            </Link>
            <Link to="/book" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              Books
            </Link>
            <Link to="/sale" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              For Sale
            </Link>
            <Link to="/rent" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              For Rent
            </Link>
            <Link to="/testimonial" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              Testimonials
            </Link>
            <Link to="/price" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              Pricing
            </Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">
              Blog
            </Link>

            <button
              onClick={handleLogout}
              className="w-full bg-rose-600 text-white mt-2 py-3 rounded-xl font-medium hover:bg-rose-700 transition sm:hidden cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;