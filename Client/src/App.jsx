import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer';

import Pages_Home from './pages/Pages_Home'
import Pages_AboutUs from './pages/Pages_AboutUs';
import Pages_Book from './pages/Pages_Book';
import Pages_ForSale from './pages/Pages_ForSale';
import Pages_ForRent from './pages/Pages_ForRent';
import Pages_Testimonials from './pages/Pages_Testimonials';
import Pages_Pricing from './pages/Pages_Pricing';
import Pages_Blog from './pages/Pages_Blog';
import ScreenLoading from './components/Common/ScreenLoading';
import Pages_SignUp from './pages/Pages_SignUp';
import Pages_SignIn from './pages/Pages_SignIn';
import Newsletter from './sections/Newsletter';

// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

export default function App() {

const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // fake initial loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ScreenLoading/>
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pages_Home />} />
        <Route path="/aboutus" element={<Pages_AboutUs/>}/>
        <Route path="/book" element={<Pages_Book/>}/>
        <Route path='/sale' element={<Pages_ForSale/>}/>
        <Route path='/rent' element={<Pages_ForRent/>}/>
        <Route path='/Testimonial' element={<Pages_Testimonials/>}/>
        <Route path='/price' element={<Pages_Pricing/>}/>
        <Route path='/blog' element={<Pages_Blog/>}/>
        <Route path='/signup' element={<Pages_SignUp/>}/>
        <Route path='/signin' element={<Pages_SignIn/>}/>

      </Routes>
     {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      /> */}
      <Footer />
    </Router>
  );
}