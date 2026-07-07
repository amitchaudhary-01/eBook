import React from 'react';

export default function StatsPanel() {
  return (
    <section className="bg-indigo-950 text-white py-16 px-8 md:px-24 mx-8 md:mx-24 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 my-16 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900/40 rounded-full blur-3xl z-0" />
      
      <div className="max-w-md z-10">
        <h3 className="text-3xl font-extrabold mb-4 leading-tight">Why Readers Choose eBooks</h3>
        <p className="text-indigo-200 text-sm leading-relaxed mb-8">
          We provide more than just books. We deliver knowledge, inspiration, and transformation right to your digital screen.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-3xl font-black text-rose-400">10K+</h4>
            <p className="text-[11px] text-indigo-200 uppercase tracking-widest font-semibold mt-1">Ebooks Available</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-rose-400">50K+</h4>
            <p className="text-[11px] text-indigo-200 uppercase tracking-widest font-semibold mt-1">Active Readers</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-rose-400">4.9★</h4>
            <p className="text-[11px] text-indigo-200 uppercase tracking-widest font-semibold mt-1">Average Rating</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-rose-400">99%</h4>
            <p className="text-[11px] text-indigo-200 uppercase tracking-widest font-semibold mt-1">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Embedded Feature Preview Media Cover */}
      <div className="w-full md:w-auto flex justify-center z-10">
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-950 text-white p-8 rounded-2xl shadow-2xl w-64 text-center relative border border-emerald-600">
          <p className="text-[10px] tracking-widest text-emerald-300 font-bold mb-6">FEATURED ARTICLE</p>
          <h4 className="text-2xl font-serif font-bold leading-tight mb-1">The Power</h4>
          <p className="text-2xl font-serif font-bold mb-8 text-emerald-300">of Now</p>
          <div className="w-14 h-14 bg-white text-emerald-900 rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer hover:scale-110 transition duration-300 mb-8 pl-1 text-lg">
            ▶
          </div>
          <p className="text-xs text-emerald-200/80 font-medium">Amit Chaudhary</p>
        </div>
      </div>
    </section>
  );
}