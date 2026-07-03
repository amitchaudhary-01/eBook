import React from 'react';

export default function BlogInsights() {
  const articles = [
    { title: '5 Books That Changed My Life Forever', date: 'May 28, 2026', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
    { title: 'How to Build a Reading Habit That Sticks', date: 'May 22, 2026', img: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=400&q=80' },
    { title: 'The Power of Learning Everyday', date: 'May 15, 2026', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <section className="py-16 px-8 md:px-24 bg-slate-50/50">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Latest Blog & Insights</h2>
        <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((blog, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition group duration-300">
            <div className="h-44 bg-gray-200 overflow-hidden">
              <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-6">
              <span className="text-[11px] font-semibold text-gray-400 block mb-2">{blog.date}</span>
              <h4 className="font-bold text-gray-900 text-sm mb-4 leading-snug min-h-[40px] line-clamp-2">{blog.title}</h4>
              <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:text-indigo-700">
                Read More <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}