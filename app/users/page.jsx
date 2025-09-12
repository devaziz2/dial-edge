"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  UserX,
  ShieldCheck,
  BanIcon,
  UserRoundX,
  UserMinus,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { BebasNeue } from "@/fonts/fonts";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://144.76.65.130:3000/api/admin/users"
        );
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.post(
        `http://144.76.65.130:3000/api/admin/users/approve/${userId}`
      );
      toast.success("User approved successfully!");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, loginStatus: "Approved" } : u
        )
      );
    } catch (err) {
      toast.error("Failed to approve user!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.post(
        `http://144.76.65.130:3000/api/admin/users/reject/${userId}`
      );
      toast.success("User rejected!");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, loginStatus: "Rejected" } : u
        )
      );
    } catch (err) {
      toast.error("Failed to reject user!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspend = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.post(
        `http://144.76.65.130:3000/api/admin/users/suspendAccount/${userId}`
      );
      toast.success("User Suspended!");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, loginStatus: "Suspended" } : u
        )
      );
    } catch (err) {
      toast.error("Failed to reject user!");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100 flex flex-col items-center py-10">
      <Toaster position="top-center" />

      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${BebasNeue.className} text-4xl font-bold text-gray-900 mb-8 relative z-10`}
      >
        All Users
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-11/12 max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4 text-center">Action</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.firstname} {user.secondname}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.companyname}</td>

                    <td className="px-6 py-4">
                      {user.loginStatus === "Approved" ? (
                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>
                      ) : user.loginStatus === "Rejected" ? (
                        <span className="text-red-600 font-semibold">
                          Rejected
                        </span>
                      ) : user.loginStatus === "Suspended" ? (
                        <span className="text-red-600 font-semibold">
                          Suspended
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.loginStatus === "Approved" ? (
                        <Tooltip label="User is approved">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </Tooltip>
                      ) : user.loginStatus === "Rejected" ? (
                        <Tooltip label="User is rejected">
                          <UserX className="w-6 h-6 text-red-500" />
                        </Tooltip>
                      ) : user.loginStatus === "Suspended" ? (
                        <Tooltip label="User is suspended">
                          <UserX className="w-6 h-6 text-red-500" />
                        </Tooltip>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <Tooltip label="Approve user">
                            <button
                              className="cursor-pointer"
                              onClick={() => handleApprove(user.id)}
                              disabled={actionLoading === user.id}
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
                              ) : (
                                <ShieldCheck className="w-6 h-6 text-yellow-500 hover:scale-110 transition" />
                              )}
                            </button>
                          </Tooltip>

                          <Tooltip label="Reject user">
                            <button
                              className="cursor-pointer"
                              onClick={() => handleReject(user.id)}
                              disabled={actionLoading === user.id}
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
                              ) : (
                                <UserX className="w-6 h-6 text-red-500 hover:scale-110 transition" />
                              )}
                            </button>
                          </Tooltip>
                          <Tooltip label="Suspend user">
                            <button
                              className="cursor-pointer"
                              onClick={() => handleSuspend(user.id)}
                              disabled={actionLoading === user.id}
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
                              ) : (
                                <UserMinus className="w-6 h-6 text-red-500 hover:scale-110 transition" />
                              )}
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Tooltip({ children, label }) {
  return (
    <div className="relative group flex justify-center items-center">
      {children}
      <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
