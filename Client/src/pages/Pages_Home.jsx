import React, { useState, useEffect } from 'react';
import BookCard from '../components/Ebooks/BookCard';

const Pages_Home = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch('http://localhost:5173/api/books?trending=true')
      .then(res => res.json())
      .then(data => {
        if (isMounted) setTrendingBooks(data);
      })
      .catch(err => console.error("Error loading trending elements:", err));

    fetch('http://localhost:5173/api/books?bestseller=true')
      .then(res => res.json())
      .then(data => {
        if (isMounted) setBestSellers(data);
      })
      .catch(err => console.error("Error loading bestseller elements:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 antialiased">
      
      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative bg-gradient-to-br from-purple-300 via-white to-indigo-200 py-20 px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            Empower Your <br /> Mind. Elevate <br /> <span className="text-indigo-600">Your Future.</span>
          </h1>
          <p className="text-gray-600 mb-8 text-base">
            Access thousands of ebooks for personal growth, education, business, and more. Learn anytime, anywhere with eBook.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition">Explore Books</button>
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-indigo-600 transition">
              <span className="p-2 bg-white rounded-full shadow-sm border">▶</span> Watch Video
            </button>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full md:w-1/2">
          <div className="w-80 h-80 md:w-96 md:h-96 bg-indigo-600 rounded-full overflow-hidden relative shadow-2xl">
            <img src="pp.jpg" alt="Hero Portrait" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-6 right-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 font-bold">✓</div>
            <div><p className="font-bold text-sm text-gray-900">25K+</p><p className="text-xs text-gray-500">Happy Readers</p></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HANDPICKED CATEGORIES */}
      <section className="py-16 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Handpicked Categories</h2>
        <p className="text-gray-500 mb-10">To Explore</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Business & Money', color: 'bg-orange-100 text-orange-600' },
            { name: 'Self-Help & Growth', color: 'bg-emerald-100 text-emerald-600' },
            { name: 'Technology & Future', color: 'bg-indigo-100 text-indigo-600' },
            { name: 'Health & Fitness', color: 'bg-pink-100 text-pink-600' },
            { name: 'Fiction & Stories', color: 'bg-purple-100 text-purple-600' },
            { name: 'More Categories', color: 'bg-gray-100 text-gray-600' },
          ].map((cat, idx) => (
            <div key={idx} className={`${cat.color} p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition font-semibold text-sm`}>
              <div className="w-8 h-8 mb-3 bg-white rounded-lg opacity-80" />
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SPLIT DATA GRIDS */}
      <section className="py-12 px-8 md:px-24 grid md:grid-cols-2 gap-12">
        {/* Trending Column */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Trending This Week</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {trendingBooks.length > 0 ? (
              trendingBooks.slice(0, 4).map(book => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="text-gray-400 text-sm">No trending books active.</p>
            )}
          </div>
        </div>

        {/* Bestsellers Column */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Best Selling Books</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bestSellers.length > 0 ? (
              bestSellers.slice(0, 4).map(book => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="text-gray-400 text-sm">No best selling books found.</p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY READERS CHOOSE STATS */}
      <section className="bg-indigo-900 text-white py-16 px-8 md:px-24 mx-8 md:mx-24 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 my-16">
        <div className="max-w-md">
          <h3 className="text-3xl font-extrabold mb-4 leading-tight">Why Readers Choose eBooks</h3>
          <p className="text-indigo-200 text-sm leading-relaxed">We provide more than just books. We deliver knowledge, inspiration, and transformation right to your digital screen.</p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div><h4 className="text-3xl font-black text-rose-400">10K+</h4><p className="text-xs text-indigo-200 uppercase tracking-wider">Ebooks Available</p></div>
            <div><h4 className="text-3xl font-black text-rose-400">50K+</h4><p className="text-xs text-indigo-200 uppercase tracking-wider">Active Readers</p></div>
            <div><h4 className="text-3xl font-black text-rose-400">4.9★</h4><p className="text-xs text-indigo-200 uppercase tracking-wider">Average Rating</p></div>
            <div><h4 className="text-3xl font-black text-rose-400">99%</h4><p className="text-xs text-indigo-200 uppercase tracking-wider">Satisfaction</p></div>
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-xl w-64 text-center border border-emerald-700">
            <p className="text-xs tracking-widest text-emerald-300 font-bold mb-6">FEATURED READ</p>
            <h4 className="text-xl font-bold mb-1">The Power</h4>
            <p className="text-xl font-bold mb-6">of Now</p>
            <div className="w-12 h-12 bg-white text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md cursor-pointer hover:scale-105 transition mb-6">▶</div>
            <p className="text-xs text-emerald-200 italic">Eckhart Tolle</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: MEET OUR AUTHOR */}
      <section className="py-16 px-8 md:px-24 bg-rose-100 flex flex-col md:flex-row items-center gap-12 my-12">
        <div className="w-full md:w-1/2 max-w-md">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">Meet Our Founder</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Amit Chaudhary</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Amit Chaudhary is a full stack developer , Computer Engineer, and Designer passionate about mindset, leadership, and accelerating tech growth.</p>
          <ul className="space-y-3 mb-8">
            {['FullStack Developer', 'Engineer'].map((role, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">✓</span> {role}
              </li>
            ))}
          </ul>
          <p className="font-serif italic text-2xl text-gray-400">Amit Chaudhary</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-72 h-96 bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
            <img src="amit.jpg" alt="Amit Chaudhary Portrait" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 6: LIMITED TIME OFFER CONTAINER */}
      <section className="my-16 mx-8 md:mx-24 bg-rose-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <span className="bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Limited Offer</span>
          <h3 className="text-4xl font-black text-slate-900 mt-4 mb-2">50% OFF</h3>
          <p className="text-xl font-bold text-gray-800 mb-4">On All Ebooks</p>
          <div className="flex gap-3 mb-6">
            {['02', '14', '32', '45'].map((time, idx) => (
              <div key={idx} className="bg-white px-3 py-2 rounded-xl text-center shadow-sm min-w-[50px]"><p className="font-bold text-gray-900">{time}</p></div>
            ))}
          </div>
          <button className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition">Shop Now</button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="p-4 bg-white shadow-lg rounded-2xl w-64 text-center border font-bold">Stacked Books Artwork</div>
        </div>
      </section>

      {/* SECTION 7: BLOG INSIGHTS */}
      <section className="py-16 px-8 md:px-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Latest Blog & Insights</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '5 Books That Changed My Life Forever', date: 'May 28, 2026' },
            { title: 'How to Build a Reading Habit That Sticks', date: 'May 22, 2026' },
            { title: 'The Power of Learning Everyday', date: 'May 15, 2026' }
          ].map((blog, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <span className="text-xs text-gray-400 block mb-2">{blog.date}</span>
                <h4 className="font-bold text-gray-900 text-base mb-4 line-clamp-2">{blog.title}</h4>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: NEWSLETTER BANNER */}
      <section className="bg-indigo-600 text-white py-16 px-8 md:px-24 mx-8 md:mx-24 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 my-16">
        <div>
          <h3 className="text-3xl font-extrabold mb-2">Stay Updated With Our Newsletter</h3>
          <p className="text-indigo-100 text-sm">Get the latest updates, special offers, and book recommendations direct to your inbox.</p>
        </div>
        <div className="flex w-full md:w-auto max-w-md gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md">
          <input type="email" placeholder="Enter your email" className="bg-transparent text-white placeholder-indigo-200 px-4 py-2 focus:outline-none w-full text-sm" />
          <button className="bg-white text-indigo-600 font-bold px-5 py-2 rounded-xl text-sm hover:bg-indigo-50 transition">Subscribe</button>
        </div>
      </section>

      {/* SECTION 9: BRAND LOGOS */}
      <div className="py-10 border-y border-gray-100 px-8 md:px-24 flex flex-wrap justify-between items-center gap-6  font-bold text-xl">
        <span className="flex items-center gap-1">
          <img src='download.webp' alt='Google logo' className="h-15 inline"/>
          </span>
        <span className="flex items-center gap-1"><img src="microsoft.webp" alt="microsoft logo" className="h-25 inline"/></span>
       <span className="flex items-center gap-1"><img src="amazon.jfif" alt="amazon logo" className="h-25 inline"/></span>
        <span className="flex items-center gap-1"><img src="airbnb.jfif" alt="airbnb logo" className="h-15 inline"/></span>
       <span className="flex items-center gap-1"><img src="spotify.webp" alt="spotify logo" className="h-25 inline"/></span>
      </div>

    </div>
  );
};

export default Pages_Home;