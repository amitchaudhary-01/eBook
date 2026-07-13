import { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaCartShopping,
  FaDollarSign,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import API from "../../services/axios";

export default function AdminDashboard() {
  const [clientCount, setClientCount] = useState(0);
  const [recentClients, setRecentClients] = useState([]);
  const [loading, setLoading] = useState(true);

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
                  <td
                    colSpan="4"
                    className="px-5 py-6 text-center text-slate-500"
                  >
                    {loading
                      ? "Fetching accounts..."
                      : "No client accounts registered."}
                  </td>
                </tr>
              ) : (
                recentClients.map((client) => (
                  <tr
                    key={client._id}
                    className="hover:bg-slate-900/40 transition"
                  >
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
