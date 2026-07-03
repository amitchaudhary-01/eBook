import React, { useState } from 'react';
import { Star, Quote, X, MessageSquare } from 'lucide-react';
// import {toast} from 'react-toastify'

const Pages_Testimonials = () => {
  // 1. Move reviews into state so we can dynamically add new ones
  const [reviews, setReviews] = useState([
    {
      name: 'Sarah Jenkins',
      role: 'Tech Lead / Avid Reader',
      quote: 'Marlin Books fundamentally changed how I structure my morning learning routine. The curation in the Technology & Future category is top-notch.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Rohan Sharma',
      role: 'Computer Engineering Student',
      quote: 'As an engineering student, finding structured ebooks that bridge design and full-stack development is tough. Amit’s curated selection nailed it.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Elena Rostova',
      role: 'Digital Entrepreneur',
      quote: 'The 50% limited discount let me stock up on ten life-changing business manuals. The platform layout is lightning fast and beautiful.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ]);

  // 2. State management for opening/closing the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. State management for the form inputs
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Interactive Star Selection inside Form
  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if fields are blank
    if (!formData.name.trim() || !formData.role.trim() || !formData.quote.trim()) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    // Assign a placeholder profile picture for demo purposes
    const newReview = {
      ...formData,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    // Prepend or append the new review to the current state list
    setReviews((prev) => [...prev, newReview]);

    // Reset Form Fields and Close Modal
    setFormData({ name: '', role: '', quote: '', rating: 5 });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white font-sans text-gray-800 antialiased relative">
      
      {/* TESTIMONIALS CONTAINER */}
      <section className="py-16 px-8 md:px-24">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
            Community Voices
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Loved by 25K+ Happy Readers
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Don't just take our word for it. Here is what engineering professionals, students, and self-help enthusiasts say about Marlin Books.
          </p>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition duration-300 relative group animate-fade-in"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={16}
                      className={starIdx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <Quote size={32} className="text-indigo-50/80 mb-2" />
                <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden shadow-inner flex-shrink-0">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-400 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HIGHLIGHTED STAT CALLOUT BOX */}
        <div className="bg-indigo-900 text-white p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mt-16 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-1">Ready to leave your own review?</h3>
            <p className="text-indigo-200 text-xs">
              Join thousands of readers accelerating their technical and mindset growth today.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-emerald-700 transition whitespace-nowrap text-sm shadow-md flex items-center gap-2 group"
          >
            <MessageSquare size={16} className="group-hover:rotate-12 transition duration-200" />
            Write a Review
          </button>
        </div>
      </section>

      {/* DYNAMIC REVIEW MODAL HOUSING */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative animate-scale-up border border-gray-100">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-50"
            >
              <X size={20} />
            </button>

            {/* Modal Titles */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Share Your Experience</h3>
              <p className="text-gray-400 text-xs">Your review helps our community discover top tier content.</p>
            </div>

            {/* Modal Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-sm border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Professional Title / Role</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full text-sm border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-800 font-medium"
                />
              </div>

              {/* Interactive Star Form Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <button
                      type="button"
                      key={starNum}
                      onClick={() => handleRatingChange(starNum)}
                      className="transition transform active:scale-95 focus:outline-none"
                    >
                      <Star 
                        size={24} 
                        className={starNum <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Review Summary</label>
                <textarea 
                  name="quote"
                  rows="3"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="What makes Marlin Books stand out for you?"
                  className="w-full text-sm border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-800 font-medium resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 mt-2"
              >
                Publish Live Review
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Pages_Testimonials;