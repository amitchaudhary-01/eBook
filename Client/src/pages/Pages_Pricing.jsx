import React from 'react';

const Pages_Pricing = () => {
  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      
      {/* PRICING SECTION CONTAINER */}
      <section className="py-16 px-8 md:px-24">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
            Flexible Plans
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Transparent Pricing Options
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Invest in your technical engineering growth and digital mindset safely. All plans include immediate access to your ebooks.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          
          {/* PLAN 1: SINGLE READ */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:scale-105 transition duration-300 flex flex-col justify-between min-h-[460px]">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Single Read</h3>
              <p className="text-xs text-gray-400 mb-6">Perfect for testing the waters</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">$9</span>
                <span className="text-xs text-gray-400 font-medium">/ per ebook</span>
              </div>
              <ul className="space-y-3 border-t border-gray-50 pt-6">
                {['Access to 1 Selected Ebook', 'Lifetime Cloud Access', 'PDF & EPUB Formats', 'Basic Support'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                    <span className="text-indigo-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 bg-blue-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-blue-400 transition text-sm">
              Buy Single Tier
            </button>
          </div>

          {/* PLAN 2: GROWER ACCELERATOR (MOST POPULAR) */}
          <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-2xl scale-105 md:scale-110 border border-indigo-950 flex flex-col justify-between min-h-[500px] relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md">
              Most Popular
            </span>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Grower Bundle</h3>
              <p className="text-xs text-indigo-200 mb-6">Empower your entire career roadmap</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-rose-400">$29</span>
                <span className="text-xs text-indigo-200 line-through font-medium">$58</span>
                <span className="text-xs text-emerald-400 font-bold">(50% OFF)</span>
              </div>
              <ul className="space-y-3 border-t border-indigo-850 pt-6">
                {['Access to 10 Custom Ebooks', 'Founder Handpicked Categories', 'Offline Reading Activated', 'Priority Developer Chat'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-indigo-100 font-medium">
                    <span className="text-emerald-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition text-sm shadow-lg">
              Get Started Now
            </button>
          </div>

          {/* PLAN 3: UNLIMITED ACCESS */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:scale-105 transition duration-300 flex flex-col justify-between min-h-[460px]">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Unlimited Pass</h3>
              <p className="text-xs text-gray-400 mb-6">For aggressive everyday learners</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">$79</span>
                <span className="text-xs text-gray-400 font-medium">/ full lifetime</span>
              </div>
              <ul className="space-y-3 border-t border-gray-50 pt-6">
                {['10K+ Ebooks Entire Database', 'All Future Updates Free', 'Premium Audio Versions', 'Direct Engineering Q&A'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                    <span className="text-indigo-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 bg-blue-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-blue-400 transition text-sm">
              Purchase Lifetime
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Pages_Pricing;
