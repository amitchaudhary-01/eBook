import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Books</h2>
          <p className="text-2xl font-bold">XX</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold">XX</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Active Orders</h2>
          <p className="text-2xl font-bold">XX</p>
        </div>
      </div>
    </div>
  );
}