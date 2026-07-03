import React, { useState } from 'react';

const Pages_ForRent = () => {
  const [rentPeriod, setRentPeriod] = useState(7); // 7-day default rental duration

  const rentalItems = [
    {
      title: 'Enterprise Architecture Manual',
      basePrice: 4.99,
      category: 'Technology & Future',
      color: 'bg-indigo-50 text-indigo-600',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Advanced Venture Blueprints',
      basePrice: 3.50,
      category: 'Business & Money',
      color: 'bg-orange-50 text-orange-600',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Deep Learning & Neural Docs',
      basePrice: 5.25,
      category: 'Data Science & AI',
      color: 'bg-emerald-50 text-emerald-600',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Design Systems & UI Pattern Kits',
      basePrice: 2.99,
      category: 'UI/UX & Creative',
      color: 'bg-pink-50 text-pink-600',
      img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Penetration Testing Frameworks',
      basePrice: 6.00,
      category: 'Cyber Security',
      color: 'bg-rose-50 text-rose-600',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Cloud Scalability & DevOps Manual',
      basePrice: 4.50,
      category: 'Cloud Infrastructure',
      color: 'bg-sky-50 text-sky-600',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Calculates a dynamic rental price factor based on duration selector
  const calculateRentalPrice = (basePrice) => {
    const factor = rentPeriod === 7 ? 1 : rentPeriod === 14 ? 1.6 : 2.5;
    return (basePrice * factor).toFixed(2);
  };

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      
      {/* DIGITAL RENTAL PASSPORT BOX */}
      <section className="py-16 px-8 md:px-24 bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/20">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
            Flexible Knowledge Access
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Rent Digital Passports
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Need an entry for an upcoming technical project or crunch review? Rent full high-tier library documentation for a quick timeline window at a fraction of standard cost.
          </p>
        </div>

        {/* DYNAMIC TIME FRAME CONTROLLER DOCK */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1 border border-gray-200/50">
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setRentPeriod(days)}
                className={`text-xs font-bold px-5 py-2 rounded-xl transition ${
                  rentPeriod === days
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {days} Days Pass
              </button>
            ))}
          </div>
        </div>

        {/* RENTAL CONTENT GRID (Expanded maximum width to match additional layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {rentalItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Cover Art Wrapper */}
              <div className="w-full sm:w-32 h-36 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Core Pass Information Content */}
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-2 ${item.color}`}>
                    {item.category}
                  </span>
                  <h4 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    ⏱ Automatic cloud return setup after {rentPeriod} days
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">RENT PRICE</p>
                    <p className="text-xl font-black text-slate-900">${calculateRentalPrice(item.basePrice)}</p>
                  </div>
                  <button className="bg-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm shadow-indigo-100">
                    Rent Pass
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Pages_ForRent;