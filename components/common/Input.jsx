"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Input({ label, type, register, error, icon }) {
  const [showPassword, setShowPassword] = useState(false);

  let IconComponent = null;
  if (icon === "Mail") IconComponent = Mail;
  if (icon === "Lock") IconComponent = Lock;
  if (icon === "User") IconComponent = User;

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}

        <input
          type={inputType}
          {...register}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 shadow-sm transition-all duration-200 ${
            IconComponent ? "pl-10" : ""
          } ${
            error
              ? "border-primary focus:ring-primary"
              : "border-gray-300 focus:ring-red-400"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="cursor-pointer" size={20} />
            ) : (
              <Eye className="cursor-pointer" size={20} />
            )}
          </button>
        )}
      </div>

      {/* Animated Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-primary text-sm mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
