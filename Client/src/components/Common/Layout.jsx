// src/components/Common/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust path if needed
import Footer from './Footer'; // Adjust path if needed

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet renders the child route's component (Home, Ebooks, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;