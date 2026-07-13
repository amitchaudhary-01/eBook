import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaBook,
  FaCartShopping,
  FaUsers,
  FaChartLine,
  FaGear,
  FaArrowLeft,
  FaBell,
  FaXmark,
  FaCheck,
} from 'react-icons/fa6';
import { NotificationProvider, useNotifications } from '../../context/NotificationContext';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FaHouse },
    { path: "/admin/books", label: "Catalog & Books", icon: FaBook },
    { path: "/admin/orders", label: "Orders & Sales", icon: FaCartShopping },
    { path: "/admin/users", label: "User Management", icon: FaUsers },
    { path: "/admin/analytics", label: "Analytics", icon: FaChartLine },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#0e1420] border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
            eB
          </div>
          <div>
            <h2 className="font-bold text-white text-base leading-tight tracking-tight">eBook Studio</h2>
            <span className="text-[11px] font-mono font-medium text-indigo-400">ADMIN CONSOLE</span>
          </div>
        </div>

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
  );
};

const AdminHeader = () => {
  const {
    notifications,
    unreadCount,
    showNotifications,
    setShowNotifications,
    markAllAsRead,
  } = useNotifications();

  return (
    <div className="flex items-center justify-end gap-3 mb-4">
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2.5 bg-[#121824] border border-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          title="Notifications"
        >
          <FaBell className="text-sm" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121824] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <FaCheck size={10} /> Mark read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <FaXmark size={14} />
                </button>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No new real-time alerts.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 text-xs transition ${
                      !notif.read
                        ? "bg-indigo-600/10 border-l-2 border-indigo-500"
                        : "hover:bg-slate-900/30"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-semibold text-slate-200">{notif.title}</p>
                      <span className="text-[10px] font-mono text-slate-500">{notif.time}</span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[11px]">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans antialiased flex flex-col lg:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          <AdminHeader />
          <Outlet />
        </main>
      </div>
    </NotificationProvider>
  );
};

export default AdminLayout;
