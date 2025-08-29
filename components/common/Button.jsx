"use client";

export default function Button({ text, type = "submit" }) {
  return (
    <button
      type={type}
      className="w-full py-2 bg-primary text-white font-medium rounded-lg shadow-md cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform duration-200"
    >
      {text}
    </button>
  );
}
