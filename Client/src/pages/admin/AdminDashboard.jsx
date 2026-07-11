import React from "react";
import {
  FaBook,
  FaUsers,
  FaCartShopping,
  FaDollarSign,
  FaArrowTrendUp,
  FaPlus,
  FaMagnifyingGlass,
  FaBell,
  FaFilter,
  FaChevronRight,
  FaDownload,
} from "react-icons/fa6";

const stats = [
  {
    title: "Total Books",
    value: "1,284",
    icon: FaBook,
    increase: "+12%",
    period: "vs last month",
    target: "Target: 1,500",
  },
  {
    title: "Registered Users",
    value: "8,642",
    icon: FaUsers,
    increase: "+24%",
    period: "vs last month",
    target: "92% active rate",
  },
  {
    title: "Orders Processed",
    value: "436",
    icon: FaCartShopping,
    increase: "+18%",
    period: "vs last month",
    target: "99.2% fulfilled",
  },
  {
    title: "Gross Revenue",
    value: "$18,240",
    icon: FaDollarSign,
    increase: "+31%",
    period: "vs last month",
    target: "$22k monthly goal",
  },
];

const recentOrders = [
  {
    id: "ORD-9082",
    customer: "Elena Rostova",
    book: "Designing Data-Intensive Apps",
    amount: "$48.00",
    status: "Completed",
    date: "2 mins ago",
  },
  {
    id: "ORD-9081",
    customer: "Marcus Vance",
    book: "System Design Interview",
    amount: "$36.50",
    status: "Completed",
    date: "14 mins ago",
  },
  {
    id: "ORD-9080",
    customer: "Sarah Jenkins",
    book: "Clean Architecture in Rust",
    amount: "$52.00",
    status: "Processing",
    date: "1 hour ago",
  },
  {
    id: "ORD-9079",
    customer: "David Chen",
    book: "The Pragmatic Programmer",
    amount: "$29.99",
    status: "Completed",
    date: "3 hours ago",
  },
];

export default function AdminDashboard() {
  return (
    <>
      {/* TOP BAR / HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time telemetry and store management summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search orders, books..."
              className="bg-[#121824] border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-4 py-2 w-48 focus:w-64 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <button className="relative p-2.5 bg-[#121824] border border-slate-800 rounded-lg text-slate-400 hover:text-white transition">
            <FaBell className="text-sm" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-indigo-600/20 transition">
            <FaPlus /> Add Title
          </button>
        </div>
      </header>

      {/* METRICS / STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-[#121824] border border-slate-800/90 rounded-xl p-5 hover:border-slate-700/80 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">
                  {item.title}
                </span>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50 text-indigo-400 group-hover:text-indigo-300 transition">
                  <Icon size={14} />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {item.value}
                </h2>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <FaArrowTrendUp size={10} />
                  {item.increase}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.period}</span>
                <span className="font-mono text-slate-400">{item.target}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* PERFORMANCE & QUICK ACTIONS */}
      <section className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#121824] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white">
                  Revenue Stream Breakdown
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Monthly performance distribution by digital product type
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white border border-slate-800 rounded-lg px-3 py-1.5 bg-slate-900/50">
                <FaFilter size={10} /> Filter
              </button>
            </div>

            <div className="space-y-5">
              {[
                {
                  name: "Direct eBook Sales",
                  amount: "$15,504",
                  percent: "85%",
                  width: "w-[85%]",
                  color: "bg-indigo-500",
                },
                {
                  name: "Subscription Membership",
                  amount: "$2,626",
                  percent: "72%",
                  width: "w-[72%]",
                  color: "bg-purple-500",
                },
                {
                  name: "Digital Rentals & Licenses",
                  amount: "$1,110",
                  percent: "58%",
                  width: "w-[58%]",
                  color: "bg-sky-500",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-300">
                      {item.name}
                    </span>
                    <span className="font-mono text-slate-400">
                      {item.amount} ({item.percent})
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`${item.color} ${item.width} h-full rounded-full transition-all duration-700`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>🚀 Direct eBook Sales are up <strong className="text-indigo-400">14%</strong> week-over-week.</span>
            <button className="text-indigo-400 hover:underline flex items-center gap-1 font-medium">
              View Full Analytics <FaChevronRight size={10} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 via-[#121824] to-[#121824] border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-2xl pointer-events-none" />
            
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              Daily Run Rate
            </span>

            <div className="mt-4">
              <span className="text-xs text-slate-400">Today's Revenue</span>
              <h3 className="text-3xl font-black text-white mt-0.5 tracking-tight">
                $4,530.00
              </h3>
            </div>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              You've cleared <strong className="text-slate-200">82%</strong> of your daily target.
            </p>
          </div>

          <div className="bg-[#121824] border border-slate-800/90 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-200 text-xs font-medium transition text-center gap-2">
                <FaBook className="text-indigo-400 text-sm" /> Catalog
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-200 text-xs font-medium transition text-center gap-2">
                <FaUsers className="text-emerald-400 text-sm" /> Users
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-200 text-xs font-medium transition text-center gap-2">
                <FaCartShopping className="text-sky-400 text-sm" /> Orders
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-200 text-xs font-medium transition text-center gap-2">
                <FaDownload className="text-amber-400 text-sm" /> Export
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DATA TABLE */}
      <section className="bg-[#121824] border border-slate-800/90 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Transactions</h2>
            <p className="text-xs text-slate-400 mt-0.5">Live feed of global orders</p>
          </div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
            View All Transactions →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0e1420] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Item Purchased</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-5 py-3.5 font-mono text-indigo-400 font-medium">
                    {order.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-200">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {order.book}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-semibold text-slate-200">
                    {order.amount}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-500 font-mono">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}