import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBook,
  FaCartShopping,
  FaUsers,
  FaChartLine,
  FaGear,
  FaArrowLeft
} from 'react-icons/fa6';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FaHouse },
    { path: "/admin/books", label: "Catalog & Books", icon: FaBook },
    { path: "/admin/orders", label: "Orders & Sales", icon: FaCartShopping },
    { path: "/admin/users", label: "User Management", icon: FaUsers },
    { path: "/admin/analytics", label: "Analytics", icon: FaChartLine },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans antialiased flex flex-col lg:flex-row">
      
      {/* GLOBAL DARK SIDEBAR */}
      <aside className="w-full lg:w-64 bg-[#0e1420] border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
              eB
            </div>
            <div>
              <h2 className="font-bold text-white text-base leading-tight tracking-tight">eBook Studio</h2>
              <span className="text-[11px] font-mono font-medium text-indigo-400">ADMIN CONSOLE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={isActive ? "text-indigo-400" : "text-slate-500"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Settings & Exit Link */}
        <div className="pt-6 border-t border-slate-800/80 mt-6 lg:mt-0 space-y-2">
          <button className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 text-xs font-medium p-2 rounded-lg hover:bg-slate-800/40">
            <span className="flex items-center gap-2">
              <FaGear className="text-slate-500" /> System Settings
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          <Link 
            to="/" 
            className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-xs font-medium p-2 rounded-lg hover:bg-slate-800/40 transition"
          >
            <FaArrowLeft size={10} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* DYNAMIC CHILD ROUTES (Dashboard, Books, Users, etc.) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;