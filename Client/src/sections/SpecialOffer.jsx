import React from 'react';

export default function SpecialOffer() {
  const stack = [
    { title: 'The Psychology of Money', color: 'bg-slate-100 border-slate-300 text-slate-800' },
    { title: 'Thinking, Fast and Slow', color: 'bg-emerald-900 border-emerald-950 text-emerald-100' },
    { title: 'The Subtle Art of Not Giving a F*', color: 'bg-orange-600 border-orange-700 text-white' },
    { title: 'Rich Dad Poor Dad', color: 'bg-purple-900 border-purple-950 text-purple-200' },
    { title: 'The 7 Habits of Highly Effective People', color: 'bg-slate-900 border-slate-950 text-slate-200' }
  ];

  return (
    <section className="my-16 mx-8 md:mx-24 bg-rose-50/70 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 border border-rose-100 shadow-sm">
      <div className="max-w-md">
        <span className="bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Limited Offer</span>
        <h3 className="text-4xl font-black text-slate-900 mt-4 mb-2">50% OFF</h3>
        <p className="text-lg font-bold text-gray-700 mb-4">On All Ebooks</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">Grab your favorite design books at half the price before the clock runs out.</p>
        
        {/* Countdown Layout Blocks */}
        <div className="flex gap-3 mb-8">
          {[
            { val: '02', label: 'Days' },
            { val: '14', label: 'Hours' },
            { val: '32', label: 'Mins' },
            { val: '45', label: 'Secs' }
          ].map((time, idx) => (
            <div key={idx} className="bg-white p-3 rounded-xl text-center shadow-sm min-w-[65px] border border-rose-100/50">
              <p className="font-bold text-xl text-gray-900">{time.val}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{time.label}</p>
            </div>
          ))}
        </div>
        <button className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200">Shop Now</button>
      </div>

      {/* Styled Hardcover Isometric Books Visual Deck */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-1.5 w-full max-w-sm">
          {stack.map((book, i) => (
            <div key={i} className={`${book.color} border px-4 py-3 rounded-lg font-mono text-xs font-bold shadow-md flex justify-between items-center transform hover:translate-x-2 transition duration-300 cursor-pointer`}>
              <span>{book.title}</span>
              <span className="opacity-40 text-[9px]">▋</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}