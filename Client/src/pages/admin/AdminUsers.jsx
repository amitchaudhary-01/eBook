import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaEye,
  FaXmark,
  FaEnvelope,
  FaFingerprint,
  FaUserCheck,
  FaTrash,
} from "react-icons/fa6";
import API from "../../services/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // 1. Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/client/getclients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch clients"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 2. FIXED: Delete Handler Function
  const handleDeleteUser = async (e, id) => {
    // Prevent the table row click event from opening the details modal
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state to instantly remove the user from table
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-slate-400 text-xs font-mono animate-pulse">
          Retrieving database records...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-mono">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Users
            </h1>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/20 font-mono">
              {users.length} Registered
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Database records for client accounts.
          </p>
        </div>
      </div>

      {/* USER LIST DATA TABLE */}
      {users.length === 0 ? (
        <div className="p-8 text-center bg-[#121824] border border-slate-800/90 rounded-xl text-slate-400 text-xs">
          No client records found in database.
        </div>
      ) : (
        <div className="bg-[#121824] border border-slate-800/90 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0e1420] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Email Address</th>
                  <th className="px-5 py-3.5">User ID</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((client) => (
                  <tr
                    key={client._id}
                    onClick={() => setSelectedUser(client)}
                    className="hover:bg-slate-900/60 transition cursor-pointer group"
                  >
                    <td className="px-5 py-3.5 font-medium text-white flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-[11px]">
                        {(client.fullname || client.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <span>{client.fullname || "N/A"}</span>
                    </td>

                    <td className="px-5 py-3.5 text-slate-300 font-mono">
                      {client.email}
                    </td>

                    <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                      {client._id}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(client);
                          }}
                          className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition"
                          title="View Full Profile"
                        >
                          <FaEye size={13} />
                        </button>
                        {/* FIXED: Passed (e) event and client._id */}
                        <button
                          onClick={(e) => handleDeleteUser(e, client._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded transition"
                          title="Delete User"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAILED USER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#121824] border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FaUserCheck className="text-indigo-400" /> Account Record
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified MongoDB document details
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-500 hover:text-white p-1 rounded-lg transition"
              >
                <FaXmark size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-[#0e1420] border border-slate-800/80 rounded-lg p-3 space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <FaUsers size={9} /> Client Name
                </div>
                <div className="text-xs font-semibold text-white">
                  {selectedUser.fullname || "Not Provided"}
                </div>
              </div>

              <div className="bg-[#0e1420] border border-slate-800/80 rounded-lg p-3 space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <FaEnvelope size={9} /> Email
                </div>
                <div className="text-xs font-mono text-indigo-300">
                  {selectedUser.email}
                </div>
              </div>

              <div className="bg-[#0e1420] border border-slate-800/80 rounded-lg p-3 space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <FaFingerprint size={9} /> Document ID
                </div>
                <div className="text-[11px] font-mono text-slate-300 select-all break-all">
                  {selectedUser._id}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;