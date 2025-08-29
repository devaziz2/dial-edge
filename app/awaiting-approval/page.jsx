"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, RefreshCcw, Loader2 } from "lucide-react";
import { BebasNeue } from "@/fonts/fonts";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PendingApprovalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");
  // ⬆️ you can manually change this state to test both conditions

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      if (status === "pending") {
        toast.error("Your request is still pending.");
        setLoading(false);
      } else if (status === "approved") {
        setLoading(false);
        toast.success("Your request has been approved!");
        setTimeout(() => {
          router.push("/aprve");
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed z-50 max-w-md w-full bg-white rounded-2xl shadow-xl  p-3 sm:p-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <Clock className="w-12 h-12 text-yellow-500 animate-pulse" />
        </div>

        <h2
          className={`${BebasNeue.className} text-2xl font-bold text-gray-900 mb-2`}
        >
          Waiting for Approval
        </h2>

        <p className="text-gray-600 mb-6">
          Your request has been sent to the admin. Please wait until your
          account is approved. Try refreshing after some time to check your
          status.
        </p>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:bg-primary/90 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCcw className="w-5 h-5" />
              Refresh
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
