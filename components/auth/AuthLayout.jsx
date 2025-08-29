"use client";

import { motion } from "framer-motion";
import LogoPlaceholder from "../ui/LogoPlaceholder";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="hidden lg:flex w-1/2 items-center justify-center"
      >
        <img
          src="/illustration.svg"
          alt="Illustration"
          className="w-3/4 h-auto"
        />
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 py-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
