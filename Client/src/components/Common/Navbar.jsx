import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Logout Handler Function
  const handleLogout = async () => {
    try {
      // 1. Send request to backend logout route to clear HTTP-only cookies
      await axios.post(
        'http://localhost:3000/api/v1/client/logout',
        {},
        { withCredentials: true }
      );

      // 2. Clear any cached user state or token stored locally
      localStorage.removeItem('user');

      // 3. Show success toast notification
      toast.success('Logged out successfully');

      // 4. Close mobile menu if open
      setIsOpen(false);

      // 5. Redirect user to Sign In page after brief delay
      setTimeout(() => {
        navigate('/signin');
      }, 1000);

    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || 'Failed to log out');
    }
  };

  return (
    <header className="w-full bg-purple-200 border-b border-gray-100 sticky top-0 z-50">
      {/* Micro Info Bar */}
      <div className="bg-slate-200 text-gray-500 text-xs px-4 md:px-24 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-gray-100 text-center sm:text-left">
        <div className="flex gap-4 md:gap-6">
          <Link to="mailto:eBook@gmail.com" className="hover:text-indigo-600 transition flex items-center gap-1">
            📧 eBook@gmail.com
          </Link>
          <Link to="tel:+9779821005569" className="hover:text-indigo-600 transition flex items-center gap-1">
            📞 +977 9821005569
          </Link>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <span>Sun - Fri : 9am - 8pm</span>
          <Link to="https://maps.google.com/?q=Butwal,Rupandehi,Nepal" target="_blank" className="hover:text-indigo-600 transition flex items-center gap-1">
            📍Butwal, Rupandehi, Nepal
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="px-6 md:px-24 py-4 flex items-center justify-between backdrop-blur-md bg-purple-300 relative">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="text-rose-500 font-black text-xl tracking-wider">E</span>
          <span className="text-gray-700 text-xs tracking-widest font-mono">BOOKS</span>
        </div>

        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Home</Link>
          <Link to="/aboutus" className="hover:text-indigo-600 transition">About Us</Link>
          <Link to="/book" className="hover:text-indigo-600 transition">Books</Link>
          <Link to="/sale" className="hover:text-indigo-600 transition">For Sale</Link>
          <Link to="/rent" className="hover:text-indigo-600 transition">For Rent</Link>
          <Link to="/testimonial" className="hover:text-indigo-600 transition">Testimonials</Link>
          <Link to="/price" className="hover:text-indigo-600 transition">Pricing</Link>
          <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
          <Link to="/signup" className="hover:text-indigo-600 transition">SignUp</Link>
          <Link to="/signin" className="hover:text-indigo-600 transition">SignIn</Link>
        </div>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* SVG Search Button */}
          <button className="text-gray-600 hover:text-indigo-600 flex items-center gap-1.5 transition px-2 py-1 focus:outline-none">
            <svg 
              className="h-4 w-4 stroke-current" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium hidden sm:inline">Search</span>
          </button>

          {/* Desktop Logout Button */}
          <button 
            onClick={handleLogout}
            className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-700 transition shadow-sm hidden sm:inline-block"
          >
            Logout
          </button>

          {/* Hamburger Menu Icon */}
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
          <div className="absolute top-full left-0 w-full bg-purple-300 border-b border-purple-200 px-6 py-6 flex flex-col gap-4 text-base font-medium text-gray-700 shadow-xl md:hidden z-40 transition-all duration-200">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-indigo-600 font-semibold py-1">Home</Link>
            <Link to="/aboutus" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">About Us</Link>
            <Link to="/book" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">Books</Link>
            <Link to="/sale" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">For Sale</Link>
            <Link to="/rent" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">For Rent</Link>
            <Link to="/testimonial" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">Testimonials</Link>
            <Link to="/price" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">Pricing</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">Blog</Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">SignUp</Link>
            <Link to="/signin" onClick={() => setIsOpen(false)} className="hover:text-indigo-600 py-1 transition">SignIn</Link>
            
            {/* Mobile Logout Button */}
            <button 
              onClick={handleLogout} 
              className="w-full bg-rose-600 text-white mt-2 py-3 rounded-xl font-medium hover:bg-rose-700 transition sm:hidden"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}