import React from 'react';

export default function Newsletter() {
  return (
    <section className="my-16">
      {/* Dark Purple Newsletter Block Banner */}
      <div className="bg-indigo-600 text-white py-12 px-8 md:px-24 mx-8 md:mx-24 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="text-2xl font-extrabold mb-1 tracking-tight">Stay Updated With Our Newsletter</h3>
          <p className="text-indigo-100 text-xs max-w-sm opacity-90">
            Get the latest updates, limited offers, and curated book recommendations straight to your inbox.
          </p>
        </div>
        <div className="flex w-full lg:w-auto max-w-md gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10">
          <input type="email" placeholder="Enter your email" className="bg-transparent text-white placeholder-indigo-200 px-4 py-2 focus:outline-none w-full text-xs" />
          <button className="bg-white text-indigo-600 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-indigo-50 transition whitespace-nowrap shadow-sm">Subscribe</button>
        </div>
      </div>

      {/* Gray Scale Brand Logo Bar Line */}
      <div className="mt-16 border-y border-gray-100 py-10 px-8 md:px-24 flex flex-wrap justify-between items-center gap-6 opacity-30 grayscale font-sans font-bold text-lg select-none">
        <span>Google</span>
        <span>Microsoft</span>
        <span>amazon</span>
        <span>airbnb</span>
        <span>Spotify</span>
      </div>
    </section>
  );
}