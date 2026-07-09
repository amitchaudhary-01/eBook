// src/components/Common/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-purple-400 text-white p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-rose-500">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="p-2 hover:bg-purple-300 rounded">Dashboard</Link>
          <Link to="/admin/books" className="p-2 hover:bg-purple-300 rounded">Manage Books</Link>
          <Link to="/admin/users" className="p-2 hover:bg-purple-300 rounded">Manage Users</Link>
          <Link to="/" className="p-2 hover:bg-slate-400 rounded text-black mt-75">← Back to Site</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;