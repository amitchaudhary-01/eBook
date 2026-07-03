import React, { useState, useEffect } from 'react';

const Pages_ForSale = () => {
  // Real-time countdown state setup for the flash sale
  const [timeLeft, setTimeLeft] = useState({ hrs: 12, mins: 34, secs: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formats time numbers to consistently display two digits
  const formatTime = (num) => String(num).padStart(2, '0');

  // Premium handpicked individual items currently marked for clearance
  const flashSaleItems = [
    {
      title: 'FullStack System Architect',
      originalPrice: 48,
      salePrice: 24,
      tag: 'Bestseller',
      color: 'bg-indigo-50 text-indigo-600',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Mindset & Micro Habits',
      originalPrice: 32,
      salePrice: 16,
      tag: 'Top Growth',
      color: 'bg-emerald-50 text-emerald-600',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'UI/UX Design Masterclass',
      originalPrice: 50,
      salePrice: 25,
      tag: 'Trending',
      color: 'bg-pink-50 text-pink-600',
      img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'AI Prompt Engineering Pro',
      originalPrice: 40,
      salePrice: 20,
      tag: 'Hot Deal',
      color: 'bg-amber-50 text-amber-600',
      img: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Data Science & Analytics',
      originalPrice: 64,
      salePrice: 32,
      tag: 'Most Popular',
      color: 'bg-sky-50 text-sky-600',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'SaaS Marketing Playbook',
      originalPrice: 36,
      salePrice: 18,
      tag: 'New Release',
      color: 'bg-purple-50 text-purple-600',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 antialiased">
      
      {/* FLASH PROMO MERCHANDISE BLOCK */}
      <section className="my-16 mx-8 md:mx-24 bg-gradient-to-br from-rose-50 via-rose-50/20 to-white rounded-3xl p-8 md:p-12 border border-rose-100/60 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMN 1: INTERACTIVE PROMOTION DETAILS (Sticky on large viewports for optimal layout) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 max-w-md">
            <span className="bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              Limited Clearance Deal
            </span>
            <h3 className="text-4xl font-black text-slate-900 mt-4 mb-2">50% OFF</h3>
            <p className="text-lg font-bold text-gray-700 mb-6">On Premium Selected Bundles</p>
            
            {/* TICKING COUNTDOWN CLOCK HOUSING */}
            <div className="flex gap-3 mb-8">
              {[
                { label: 'HRS', value: formatTime(timeLeft.hrs) },
                { label: 'MINS', value: formatTime(timeLeft.mins) },
                { label: 'SECS', value: formatTime(timeLeft.secs) }
              ].map((time, idx) => (
                <div key={idx} className="bg-white border border-gray-100 px-4 py-3 rounded-xl text-center shadow-sm min-w-[65px]">
                  <p className="font-black text-xl text-gray-900 tracking-tight">{time.value}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{time.label}</p>
                </div>
              ))}
            </div>

            <button className="bg-indigo-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 mb-4 w-full sm:w-auto">
              Claim Discount Now
            </button>
            <p className="text-xs text-gray-400 font-medium">✓ Instant download access via Cloud Sync</p>
          </div>

          {/* COLUMN 2: CLEARANCE PROD GRID LINKED TO MERN STATE */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6 w-full">
            {flashSaleItems.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition duration-200">
                <div>
                  <div className="h-40 bg-gray-50 rounded-xl overflow-hidden mb-4 relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm ${item.color} bg-white/95`}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">{item.title}</h4>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-rose-500">${item.salePrice}</span>
                    <span className="text-xs text-gray-300 line-through font-medium">${item.originalPrice}</span>
                  </div>
                  <button className="bg-gray-900 text-white font-bold text-[11px] px-3 py-2 rounded-lg hover:bg-indigo-600 transition uppercase tracking-wider">
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Pages_ForSale;