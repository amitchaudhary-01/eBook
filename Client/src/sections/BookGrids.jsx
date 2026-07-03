import React from 'react';

function BookCard({ title, author, price, discountPrice, rating, badge, badgeColor }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition relative flex flex-col justify-between">
      {badge && (
        <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold rounded-md text-white ${badgeColor}`}>
          {badge}
        </span>
      )}
      <div className="bg-slate-50 rounded-xl p-4 flex justify-center items-center h-44 mb-4">
        <div className="w-24 h-36 bg-indigo-900 text-white p-2 rounded shadow-lg flex flex-col justify-between text-left font-serif transform hover:rotate-3 transition duration-300">
          <span className="text-[10px] font-sans opacity-70 tracking-widest block">BOOK</span>
          <span className="font-bold leading-tight text-xs block line-clamp-3">{title}</span>
          <span className="text-[9px] opacity-60 block mt-auto truncate">{author}</span>
        </div>
      </div>
      <div>
        <div className="flex text-amber-400 text-[10px] mb-1">{"★".repeat(rating)}</div>
        <h4 className="font-bold text-gray-900 text-xs truncate mb-0.5">{title}</h4>
        <p className="text-gray-400 text-[10px] mb-2">{author}</p>
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-indigo-600 font-bold text-sm">${discountPrice}</span>
              <span className="text-gray-400 line-through text-xs">${price}</span>
            </>
          ) : (
            <span className="text-gray-900 font-bold text-sm">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookGrids() {
  const trending = [
    { title: 'Atomic Habits', author: 'James Clear', price: 12.99, discountPrice: 8.99, rating: 5, badge: 'TRENDING', badgeColor: 'bg-amber-500' },
    { title: 'Mindset Psychology', author: 'Carol S. Dweck', price: 15.00, discountPrice: 7.99, rating: 5 },
    { title: 'Deep Work Rules', author: 'Cal Newport', price: 10.99, discountPrice: 8.49, rating: 4 },
    { title: 'The 5 AM Club', author: 'Robin Sharma', price: 10.99, discountPrice: 6.99, rating: 5 }
  ];

  const bestSellers = [
    { title: 'The Alchemist', author: 'Paulo Coelho', price: 10.99, discountPrice: 7.99, rating: 5, badge: 'HOT', badgeColor: 'bg-rose-500' },
    { title: 'Think Again', author: 'Adam Grant', price: 12.99, discountPrice: 9.49, rating: 5 },
    { title: 'Make Your Bed', author: 'William H. McRaven', price: 9.99, discountPrice: 6.49, rating: 4 },
    { title: 'The Power of Habit', author: 'Charles Duhigg', price: 11.99, discountPrice: 8.49, rating: 5 }
  ];

  return (
    <section className="py-12 px-8 md:px-24 grid lg:grid-cols-2 gap-12">
      {/* Column A: Trending This Week */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Trending This Week</h3>
          <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {trending.map((book, idx) => <BookCard key={idx} {...book} />)}
        </div>
      </div>

      {/* Column B: Best Selling Books */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Best Selling Books</h3>
          <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {bestSellers.map((book, idx) => <BookCard key={idx} {...book} />)}
        </div>
      </div>
    </section>
  );
}