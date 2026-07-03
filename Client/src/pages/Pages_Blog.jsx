import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, BookOpen } from 'lucide-react';

const Pages_Blog = () => {
  // 1. Expanded, highly realistic technical blog dataset
  const blogs = [
    {
      id: 1,
      title: '5 Books That Changed My Life Forever',
      date: 'May 28, 2026',
      category: 'Mindset',
      readTime: '5 min read',
      imgUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
      desc: 'Discover the ultimate literary stack that reshapes how you look at productivity, focus, and daily technical routines.',
      content: 'A deep dive into deep work architectures. The books detailed here do not just focus on generic self-help theories, but break down exactly how micro-habits alter baseline cognitive capabilities. We study how targeted reading patterns unlock creative synthesis pipelines across engineering branches.'
    },
    {
      id: 2,
      title: 'How to Build a Reading Habit That Sticks',
      date: 'May 22, 2026',
      category: 'Growth',
      readTime: '4 min read',
      imgUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80',
      desc: 'Atomic habits for readers. Learn exactly how Amit setup his schedule to process over 50+ backend and systems architecture manuals yearly.',
      content: 'The blueprint relies on contextual anchors. By associating raw study time with pre-existing daily operations (like morning coffee processing or container deployment build waits), long-form technical documentation ingest transforms into an involuntary system automation loop instead of a standard chores checklist.'
    },
    {
      id: 3,
      title: 'The Power of Learning Everyday',
      date: 'May 15, 2026',
      category: 'Technology',
      readTime: '6 min read',
      imgUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
      desc: 'Compounding knowledge is a developers secret superpower. How continuous micro-learning shapes elite computer engineers.',
      content: 'If you optimize domain understanding by a mere 1% daily, compounding returns generate dramatic multi-fold leaps within structural lifecycles. This guide analyzes distributed computing systems tracking curves, helping engineers maintain cutting edge relevance across modern tech clusters.'
    },
    {
      id: 4,
      title: 'Demystifying Distributed Systems Architecture',
      date: 'June 02, 2026',
      category: 'Technology',
      readTime: '8 min read',
      imgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
      desc: 'An approachable deep-dive into event sourcing, CQRS microservices architectures, and handling high-concurrency availability.',
      content: 'Distributed system parameters present distinct synchronization challenges. This document breaks down consensus algorithms (Raft, Paxos) and maps architectural blueprints for horizontally scalable clusters that maintain high transactional integrity under peak user traffic anomalies.'
    },
    {
      id: 5,
      title: 'The Psychology of High-Performance Engineering Teams',
      date: 'June 10, 2026',
      category: 'Mindset',
      readTime: '5 min read',
      imgUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80',
      desc: 'Building blameless post-mortem cultures and psychological safety frameworks that support aggressive production iteration loops.',
      content: 'High metrics output correlates with organizational alignment stability. We analyze case reviews highlighting why shifting from individual-error blame logic blocks directly toward deep ecosystem tracing lowers long-term operational friction and optimizes release frequencies.'
    },
    {
      id: 6,
      title: 'Mastering the Full-Stack Career Transition Blueprint',
      date: 'June 14, 2026',
      category: 'Growth',
      readTime: '7 min read',
      imgUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
      desc: 'A complete tactical roadmap shifting from junior specialized execution paths straight into higher strategic product technical leadership roles.',
      content: 'Advancing beyond functional engineering tasks requires cross-functional comprehension. True senior technical leads merge data-tier engineering protocols seamlessly with clean product interface workflows and commercial viability mechanics to construct comprehensive user experiences.'
    }
  ];

  // 2. React UI State controllers
  const [activeTab, setActiveTab] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // 3. Dynamic Filter Logic
  const filteredBlogs = activeTab === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="bg-slate-50/50 font-sans text-gray-800 antialiased min-h-screen">
      
      {/* MAIN CONTAINER */}
      <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        
        {/* SECTION HEADER BLOCK */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6 pb-6 border-b border-gray-200/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
              Deep Dives
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Latest Blog & Insights
            </h2>
          </div>
          
          {/* INTERACTIVE TAB NAVIGATOR */}
          <div className="flex flex-wrap gap-2 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/40 self-start xl:self-auto">
            {['All', 'Mindset', 'Growth', 'Technology'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* WORKABLE ARTICLES GRID */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog.id} 
                onClick={() => setSelectedArticle(blog)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                {/* Image Frame Accent */}
                <div>
                  <div className="h-52 bg-gray-100 relative overflow-hidden">
                    <img 
                      src={blog.imgUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-indigo-600 text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-lg shadow-sm border border-indigo-50/50">
                      {blog.category}
                    </span>
                  </div>
                  
                  {/* Meta Text Stack */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {blog.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {blog.readTime}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition duration-200 leading-snug">
                      {blog.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Interactive Footer */}
                <div className="px-6 pb-6 pt-2">
                  <span className="text-xs font-black text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1.5 transition">
                    Read Full Article 
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition duration-200" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No publications found under this layout block.</p>
          </div>
        )}
      </section>

      {/* FULL READER MODAL CONTAINER */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative border border-gray-100 animate-scale-up">
            
            {/* Top Anchor Hero Image inside Reader */}
            <div className="h-64 sm:h-72 bg-gray-100 w-full relative">
              <img src={selectedArticle.imgUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 bg-slate-900/70 backdrop-blur-sm text-white hover:bg-slate-900 transition p-2 rounded-full shadow-lg"
              >
                <X size={18} />
              </button>
              <span className="absolute bottom-5 left-6 bg-indigo-600 text-white text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-lg">
                {selectedArticle.category}
              </span>
            </div>

            {/* Document Core Meta Details */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedArticle.readTime}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                {selectedArticle.title}
              </h3>

              <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                {selectedArticle.desc}
              </p>

              <div className="text-gray-600 text-sm leading-relaxed space-y-4 font-normal">
                <p>{selectedArticle.content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>

              {/* Close Button Anchor Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-slate-900 text-white font-semibold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-sm"
                >
                  Close Article Window
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Pages_Blog;