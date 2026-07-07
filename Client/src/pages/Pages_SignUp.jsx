import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form'; 
import { Link, useNavigate } from 'react-router-dom'; // Swapped Navigate for useNavigate

const Pages_SignUp = () => {
  const navigate = useNavigate(); // Initialize programmatic routing hook

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle network request securely with async/await
  const onSubmit = async (data) => {
    try {
      // console.log('Sending Form Data to API:', data);
      
      const response = await axios.post("http://localhost:3000/api/v1/client/create", data);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("User signed up successfully!");
        navigate('/signin'); // Correctly redirecting user via hook
      }
    } catch (error) {
      console.error('Signup error context:', error);
      const backendErrorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(backendErrorMessage);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-white to-indigo-100">

      <ToastContainer/>
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* LEFT SIDE: BRANDING/MARKETING SPLASH */}
        <div className="w-full md:w-1/2 bg-indigo-900 p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-2xl opacity-40"></div>
          
          <div className="relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-rose-400">Join the Community</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6 leading-tight">
              Start Your Journey <br /> 
              With <span className="text-rose-400">eBook.</span>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed mb-8">
              Create an account today to access thousands of curated ebooks for personal growth, engineering, mindset, and tech development.
            </p>
          </div>

          <div className="relative z-10 border-t border-indigo-800 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-2xl font-black text-rose-400">25K+</h4>
                <p className="text-xs text-indigo-200 uppercase tracking-wider">Happy Readers</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-rose-400">4.9★</h4>
                <p className="text-xs text-indigo-200 uppercase tracking-wider">Top Rated Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SIGNUP FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Create Account</h3>
            <p className="text-gray-500 text-sm">Get unlimited access to insights and learning tools.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition ${
                  errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                {...register('fullname', { required: 'Full name is required' })}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="text"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition ${
                  errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                {...register('email', { 
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition ${
                  errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                })}
              />
              {errors.password && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <div className="flex items-start gap-3">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                  {...register('agreeTerms', { required: 'You must accept the terms to continue' })}
                />
                <label htmlFor="agreeTerms" className="text-xs text-gray-500 leading-normal">
                  I agree to the <a href="#terms" className="text-indigo-600 font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>.
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">{errors.agreeTerms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 mt-4"
            >
              Sign Up
            </button>
          </form>

          {/* Log In Redirect */}
          <p className="text-sm text-center text-gray-500 mt-8">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Pages_SignUp;