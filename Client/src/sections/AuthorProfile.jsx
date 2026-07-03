import React from 'react';

export default function AuthorProfile() {
  return (
    <section className="py-16 px-8 md:px-24 flex flex-col lg:flex-row items-center gap-16 bg-white">
      <div className="w-full lg:w-1/2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">Meet Our Author</span>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Greg Yates</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Greg Yates is a renowned entrepreneur, speaker, and author passionate about mindset, leadership, and accelerating personal growth globally.
        </p>
        
        <ul className="space-y-4 mb-8">
          {['Business Consultant', 'Motivational Speaker', 'Bestselling Author'].map((role, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
              <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">✓</span>
              {role}
            </li>
          ))}
        </ul>

        <p className="font-serif italic text-3xl text-slate-400 border-t pt-4 border-gray-100">Greg Yates</p>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative">
          {/* Decorative design dots/blobs */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-100 rounded-full blur-xl z-0" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-rose-100 rounded-full blur-xl z-0" />
          
          <div className="w-72 h-96 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80" alt="Author Headshot" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}