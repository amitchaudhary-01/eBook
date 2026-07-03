import React from 'react';

export default function Testimonials() {
  const feedback = [
    { name: 'Amit K.', sub: 'Football Fan', msg: 'This catalog changed how I consume actionable information. The UI formatting makes checking summaries clean.' },
    { name: 'AAMIT .', sub: 'Student', msg: 'Affordable ebook packages that render beautifully on mobile layout screens. Highly recommend the tech section.' },
    { name: 'Emily K.', sub: 'Marketing Mgr', msg: 'The newsletter book notifications consistently hit right on target. Truly amazing customer service.' }
  ];

  return (
    <section className="py-16 px-8 md:px-24 text-center bg-white">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What Our Readers Say</h2>
      <p className="text-gray-400 text-xs mb-12">Honest reviews from community subscribers</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedback.map((f, idx) => (
          <div key={idx} className="bg-slate-50/50 p-6 rounded-2xl border border-gray-100 text-left hover:bg-white hover:shadow-md transition duration-300">
            <div className="text-amber-400 text-xs mb-4">★★★★★</div>
            <p className="text-gray-600 text-xs leading-relaxed mb-6 italic">"{f.msg}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                {f.name[0]}
              </div>
              <div>
                <h5 className="font-bold text-gray-800 text-xs">{f.name}</h5>
                <p className="text-[10px] text-gray-400 font-medium">{f.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}