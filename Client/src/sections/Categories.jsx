import React from 'react';

export default function Categories() {
  const categories = [
    { name: 'Business & Money', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { name: 'Self-Help & Growth', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Technology & Future', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { name: 'Health & Fitness', color: 'bg-pink-50 text-pink-600 border-pink-100' },
    { name: 'Fiction & Stories', color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { name: 'More Categories', color: 'bg-gray-50 text-gray-600 border-gray-200' },
  ];

  return (
    <section className="py-16 px-8 md:px-24 text-center">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Handpicked Categories</h2>
      <p className="text-gray-400 text-sm mb-10">To Explore</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className={`${cat.color} p-6 rounded-2xl border flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 font-bold text-sm text-center shadow-sm`}>
            <div className="w-10 h-10 mb-3 bg-white rounded-xl shadow-inner flex items-center justify-center opacity-90">📖</div>
            {cat.name}
          </div>
        ))}
      </div>
      <button className="mt-8 bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-sm">View All Categories</button>
    </section>
  );
}