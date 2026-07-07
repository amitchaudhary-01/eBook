import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


const Pages_SignIn = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  });

  // Submission handler receiving validated data
 const onSubmit = async (data) => {
  setSubmitError("");
  setIsSubmitting(true);

  try {
    const res = await axios.post("http://localhost:3000/api/v1/auth/signin",data,{withCredentials: true,} );

    if (res.status === 201) {
      toast.success("Client Logged In Successfully")

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  } catch (error) {
    const message = error.response?.data?.message || "Invalid email or password";

    setSubmitError(message);
    toast.error(message);
  } finally {
    setIsSubmitting(false);
  }
};

  //   try {
  //     const response = await fetch('http://localhost:3000/api/v1/auth/signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         email: data.email,
  //         password: data.password,
  //       }),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Sign in failed');
  //     }
  //     navigate('/');
  //   } catch (error) {
  //     setSubmitError(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            Welcome Back to <span className="text-indigo-600">eBook.</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your details below to access your digital library shelf.
          </p>
        </div>

        {/* SIGN IN FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
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
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition ${
                errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password && (
              <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password Grid */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-xs text-gray-500 font-medium select-none cursor-pointer">
                Remember me
              </label>
            </div>
            
            <a href="#forgot" className="text-xs font-bold text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {submitError && (
            <p className="text-sm text-rose-500 font-semibold">{submitError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Pages_SignIn;