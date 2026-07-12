import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaCartShopping,
  FaDollarSign,
  FaPlus,
  FaMagnifyingGlass,
  FaBell,
  FaXmark,
  FaCheck,
} from "react-icons/fa6";
import { io } from "socket.io-client";
import API from "../../services/axios";

// Connect to backend WebSocket server URL
const SOCKET_URL = "http://localhost:5000"; // Update this to match your Express backend port

export default function AdminDashboard() {
  const [clientCount, setClientCount] = useState(0);
  const [recentClients, setRecentClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // REAL-TIME NOTIFICATIONS STATE
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // 1. Fetch initial telemetry
  useEffect(() => {
    const fetchDashboardTelemetry = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/client/getclients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const clients = res.data.data || [];
        setClientCount(clients.length);
        setRecentClients(clients.slice(-5).reverse());
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardTelemetry();
  }, []);

  // 2. Setup WebSocket connection for live alerts
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token: localStorage.getItem("token") },
    });

    socket.on("connect", () => {
      console.log("Connected to Real-time Notification Stream");
    });

    // Listen for new user registration event from backend
    socket.on("new_client_registered", (newClient) => {
      // Update counts and tables instantly
      setClientCount((prev) => prev + 1);
      setRecentClients((prev) => [newClient, ...prev.slice(0, 4)]);

      // Push to notification drawer
      const newNotif = {
        id: Date.now(),
        title: "New Client Registered",
        message: `${newClient.fullname || newClient.email} created an account.`,
        time: "Just now",
        read: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time backend telemetry and live client management summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search platform..."
              className="bg-[#121824] border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-4 py-2 w-48 focus:w-64 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* NOTIFICATION BELL & DROPDOWN */}
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

            {/* LIVE NOTIFICATION PANEL DROPDOWN */}
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
                          !notif.read ? "bg-indigo-600/5" : "hover:bg-slate-900/30"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <p className="font-semibold text-slate-200">
                            {notif.title}
                          </p>
                          <span className="text-[10px] font-mono text-slate-500">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-1 text-[11px]">
                          {notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-indigo-600/20 transition">
            <FaPlus /> Add Title
          </button>
        </div>
      </header>

      {/* METRICS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#121824] border border-slate-800/90 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              Registered Clients
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FaUsers size={14} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {loading ? "..." : clientCount}
            </h2>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Live Stream Active
            </span>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            Active verified client accounts
          </p>
        </div>

        <div className="bg-[#121824] border border-slate-800/90 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              Catalog Items
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FaBook size={14} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              --
            </h2>
            <span className="text-[11px] text-slate-500">Inventory Status</span>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            Syncing catalog collection
          </p>
        </div>

        <div className="bg-[#121824] border border-slate-800/90 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              Orders Processed
            </span>
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <FaCartShopping size={14} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              --
            </h2>
            <span className="text-[11px] text-slate-500">Fulfillment</span>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            Awaiting sales API endpoint
          </p>
        </div>

        <div className="bg-[#121824] border border-slate-800/90 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              Total Revenue
            </span>
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FaDollarSign size={14} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              --
            </h2>
            <span className="text-[11px] text-slate-500">Gross Sales</span>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            Awaiting payment integration
          </p>
        </div>
      </section>

      {/* RECENT REGISTRATIONS TABLE */}
      <section className="bg-[#121824] border border-slate-800/90 rounded-xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Recently Registered Clients
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live user database sign-up feed
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0e1420] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">MongoDB ID</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentClients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-6 text-center text-slate-500">
                    {loading ? "Fetching accounts..." : "No client accounts registered."}
                  </td>
                </tr>
              ) : (
                recentClients.map((client) => (
                  <tr key={client._id} className="hover:bg-slate-900/40 transition">
                    <td className="px-5 py-3.5 font-medium text-slate-200">
                      {client.fullname || "N/A"}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-indigo-400">
                      {client.email}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                      {client._id}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Registered
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}