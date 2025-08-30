"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  Eye,
  EyeOff,
  UploadCloud,
  FileCheck2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { BebasNeue } from "@/fonts/fonts";

export default function UploadCsvPage() {
  const [showExample, setShowExample] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleToggleExample = () => setShowExample((s) => !s);

  const handlePick = () => fileInputRef.current?.click();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isCsv =
      file.name.toLowerCase().endsWith(".csv") || file.type === "text/csv";
    if (!isCsv) {
      toast.error("Only .csv files are allowed.");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
    toast.success("File selected");
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100 flex flex-col items-center py-12 px-4">
      <Toaster position="top-center" />

      {/* soft background overlay */}
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] pointer-events-none" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`${BebasNeue.className} relative z-10 text-4xl md:text-5xl font-bold text-gray-900 tracking-wide`}
      >
        Upload File
      </motion.h1>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 mt-8 w-full max-w-4xl bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-center p-4 sm:p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggleExample}
            className="group inline-flex items-center gap-2 cursor-pointer rounded-xl bg-primary px-5 py-3 text-white shadow-md hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {showExample ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <FileSpreadsheet className="h-5 w-5" />
            )}
            <span className="font-medium">
              {showExample ? "Hide Example" : "Show Example"}
            </span>
          </motion.button>
        </div>

        {/* Collapsible Example Table */}
        <AnimatePresence initial={false}>
          {showExample && (
            <motion.div
              key="example"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="px-4 sm:px-6 pb-6"
            >
              <div className="overflow-x-auto rounded-xl border border-green-600/40">
                <table className="w-full text-sm text-left border border-gray-300">
                  <thead>
                    <tr className="bg-green-600/95 border border-gray-300">
                      <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-white border border-gray-300">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-white border border-gray-300"></th>
                      <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-white border border-gray-300"></th>
                    </tr>
                  </thead>
                  <tbody className="text-green-700">
                    {[
                      ["3615293079", "", ""],
                      ["2238777892", "", ""],
                      ["4092225125", "", ""],
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          idx % 2 === 0
                            ? "bg-green-50/40 border-t border-gray-300"
                            : "bg-white border-t border-gray-300"
                        }
                      >
                        {row.map((cell, cidx) => (
                          <td
                            key={cidx}
                            className="px-6 py-3 font-medium min-w-[120px] border border-gray-300"
                          >
                            {cell || (
                              <span className="opacity-50 select-none">
                                &nbsp;
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Tip: The CSV should contain a single column titled{" "}
                <span className="font-semibold text-green-700">
                  Phone Number
                </span>{" "}
                with one number per row.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Uploader */}
        <div className="px-4 sm:px-6 pb-8">
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="mx-auto max-w-xl"
          >
            <button type="button" onClick={handlePick} className="w-full">
              <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/60 p-8 text-center transition-all hover:border-primary hover:bg-primary/5 focus:outline-none">
                <UploadCloud className="h-8 w-8" />
                <div className="space-y-1">
                  <p className="text-base font-medium text-gray-900">
                    {fileName ? (
                      <span className="inline-flex items-center gap-2">
                        <FileCheck2 className="h-5 w-5" /> {fileName}
                      </span>
                    ) : (
                      "Upload file"
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    Only .csv files are allowed
                  </p>
                </div>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFile}
              className="hidden"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
