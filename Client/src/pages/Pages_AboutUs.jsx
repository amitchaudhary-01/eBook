import React from 'react';
// 1. Import the icons from lucide-react
import { Lightbulb, Globe, Sparkles } from 'lucide-react';

const Pages_AboutUs = () => {
  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      
      {/* HEADER SECTION */}
      <section className="text-center py-16 px-8 md:px-24 bg-gradient-to-b from-purple-50 via-white to-white">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">Our Story</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">About eBook</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          We are on a mission to democratize knowledge. Founded by engineers and designers, eBook bridges the gap between eager readers and transformative digital literature.
        </p>
      </section>

      {/* CORE VALUES GRID */}
      <section className="py-12 px-8 md:px-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Empowerment',
            desc: 'Providing tools and materials that inspire mindset shifts, leadership qualities, and massive professional tech growth.',
            icon: Lightbulb, // 2. Pass the component reference here
            color: 'bg-orange-50 text-orange-600'
          },
          {
            title: 'Accessibility',
            desc: 'Making high-quality engineering, business, and self-help ebooks instantly available to anyone, anywhere, at any time.',
            icon: Globe, // 2. Pass the component reference here
            color: 'bg-indigo-50 text-indigo-600'
          },
          {
            title: 'Curated Excellence',
            desc: 'Handpicking every title and category to ensure our 25K+ happy readers spend time only on high-impact insights.',
            icon: Sparkles, // 2. Pass the component reference here
            color: 'bg-emerald-50 text-emerald-600'
          }
        ].map((value, idx) => (
          <div key={idx} className="border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition bg-white">
            <div className={`w-12 h-12 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
              {/* 3. Render the component dynamically */}
              <value.icon size={22} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
          </div>
        ))}
      </section>

      {/* FOUNDER FOCUS / VISION SECTION */}
      <section className="py-16 px-8 md:px-24 bg-rose-50/40 flex flex-col md:flex-row-reverse items-center gap-12 my-12">
        <div className="w-full md:w-1/2 max-w-md">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">The Vision</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Driven by Innovation</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            eBook was built with a clear architectural roadmap under full-stack patterns. We mix robust backend APIs with fluid UI layouts to give readers an uncompromised experience.
          </p>
          <div className="flex gap-6 border-t border-gray-200/60 pt-6">
            <div>
              <h4 className="text-2xl font-black text-indigo-600">100%</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Digital Optimization</p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-indigo-600">24/7</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Cloud Access</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-80 bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80" 
              alt="Team collaboration work" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Pages_AboutUs;