import React from "react";
import {
  FaBook,
  FaUsers,
  FaCartShopping,
  FaDollarSign,
  FaArrowTrendUp,
} from "react-icons/fa6";

const stats = [
  {
    title: "Total Books",
    value: "1,284",
    icon: <FaBook />,
    color: "from-indigo-500 to-purple-600",
    increase: "+12%",
  },
  {
    title: "Registered Users",
    value: "8,642",
    icon: <FaUsers />,
    color: "from-cyan-500 to-blue-600",
    increase: "+24%",
  },
  {
    title: "Orders",
    value: "436",
    icon: <FaCartShopping />,
    color: "from-pink-500 to-rose-500",
    increase: "+18%",
  },
  {
    title: "Revenue",
    value: "$18,240",
    icon: <FaDollarSign />,
    color: "from-emerald-500 to-green-600",
    increase: "+31%",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 p-4 md:p-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back 👋 Manage your eBook platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg px-6 py-4">
          <p className="text-gray-500 text-sm">
            Today's Revenue
          </p>

          <h2 className="text-3xl font-black text-indigo-600">
            $4,530
          </h2>
        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <div
            key={index}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black mt-2 text-slate-800">
                  {item.value}
                </h2>

                <div className="flex items-center mt-3 text-green-600 text-sm font-semibold gap-2">
                  <FaArrowTrendUp />
                  {item.increase} this month
                </div>

              </div>

              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-2xl group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        {/* Sales */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-xl font-bold text-slate-700 mb-8">
            Monthly Performance
          </h2>

          {[
            {
              name: "Books Sold",
              percent: "85%",
              width: "w-[85%]",
              color: "bg-indigo-600",
            },
            {
              name: "Subscriptions",
              percent: "72%",
              width: "w-[72%]",
              color: "bg-purple-600",
            },
            {
              name: "Rentals",
              percent: "58%",
              width: "w-[58%]",
              color: "bg-pink-500",
            },
          ].map((item, index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span className="font-medium text-gray-600">
                  {item.name}
                </span>

                <span className="font-bold">
                  {item.percent}
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`${item.color} ${item.width} h-full rounded-full transition-all duration-1000`}
                ></div>

              </div>

            </div>

          ))}

        </div>

        {/* Quick Actions */}

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-lg">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-2 text-indigo-100">
            Manage your platform easily.
          </p>

          <div className="space-y-4 mt-8">

            <button className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition">
              Add New Book
            </button>

            <button className="w-full bg-indigo-500 py-3 rounded-xl hover:bg-indigo-400 transition">
              View Orders
            </button>

            <button className="w-full bg-pink-500 py-3 rounded-xl hover:bg-pink-400 transition">
              Manage Users
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}