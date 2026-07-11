import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Pages_Home from './pages/Pages_Home';
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
import Layout from './components/Common/Layout';
import ProtectedAdminRoute from './components/Common/ProtectedAdminRoute';
import AdminLayout from './components/Common/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminUsers from './pages/admin/AdminUsers';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages_Home />} />
            <Route path="aboutus" element={<ProtectedRoute><Pages_AboutUs /></ProtectedRoute>} />
            <Route path="book" element={<ProtectedRoute><Pages_Book /></ProtectedRoute>} />
            <Route path="sale" element={<ProtectedRoute><Pages_ForSale /></ProtectedRoute>} />
            <Route path="rent" element={<ProtectedRoute><Pages_ForRent /></ProtectedRoute>} />
            <Route path="Testimonial" element={<ProtectedRoute><Pages_Testimonials /></ProtectedRoute>} />
            <Route path="price" element={<ProtectedRoute><Pages_Pricing /></ProtectedRoute>} />
            <Route path="blog" element={<ProtectedRoute><Pages_Blog /></ProtectedRoute>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/signup" element={<Pages_SignUp />} />
          <Route path="/signin" element={<Pages_SignIn />} />
          <Route path="/login" element={<Pages_SignIn />} />

          {/* Protected Admin Section */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="books" element={<AdminBooks />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}