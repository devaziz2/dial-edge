"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  Eye,
  EyeOff,
  UploadCloud,
  FileCheck2,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { BebasNeue } from "@/fonts/fonts";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UploadCsvPage() {
  const [showExample, setShowExample] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isCleaning, setisCleaning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/userVerificationOnPageRefresh`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status !== 200) {
          router.push("/login");
        }
      } catch (err) {
        if (err.response?.data?.message === "Token has expired.") {
          router.push("/login");
        }
      }
    };

    verifyUser();
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleToggleExample = () => setShowExample((s) => !s);

  const handlePick = () => fileInputRef.current?.click();

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isCsv =
      selectedFile.name.toLowerCase().endsWith(".csv") ||
      selectedFile.type === "text/csv";
    if (!isCsv) {
      toast.error("Only .csv files are allowed.");
      e.target.value = "";
      return;
    }
    setFileName(selectedFile.name);
    setFile(selectedFile);
    toast.success("File selected");
  };

  const handleCleanData = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setisCleaning(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/csvUpload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("filename", res.data.filename);

      setModalData(res.data);
      setIsModalOpen(true);

      toast.success("File uploaded & cleaned successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setisCleaning(false);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const filename = localStorage.getItem("filename");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/downloadFile?filename=${filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cleaned_file.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.location.reload();
    } catch (err) {
      toast.error("Error downloading file");
    }
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
                        phone
                      </th>
                      <th className="px-6 py-3 border border-gray-300"></th>
                      <th className="px-6 py-3 border border-gray-300"></th>
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
                <span className="font-semibold text-green-700">phone</span> with
                one number per row.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Uploader */}
        <div className="px-4 sm:px-6 pb-8 space-y-4">
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

          {file && (
            <div className="flex justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCleanData}
                className="px-5 py-3 rounded-xl bg-green-600 text-white shadow-md hover:shadow-lg"
              >
                {isCleaning ? "Cleaning..." : "Clean Data"}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                File Processed
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Processed Numbers:</span>{" "}
                  {modalData.totalNumbers}
                </p>
                <p>
                  <span className="font-semibold">Matched Numbers:</span>{" "}
                  {modalData.matches}
                </p>
                <p>
                  <span className="font-semibold">Clean Numbers:</span>{" "}
                  {modalData.mismatches}
                </p>

                <p>
                  <span className="font-semibold">Uploaded Numbers:</span>{" "}
                  {modalData.totalNumbersWithDuplicates}
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white shadow-md hover:shadow-lg"
                >
                  Download File
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
