"use client";

import React, { useState } from "react";
import { Upload, File, X, Loader2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// import QRCode tanpa SSR (supaya aman di Next.js)
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [flipped, setFlipped] = useState(false); // 🔄 flip state

  // 🟢 saat user memilih file manual
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  // 🟢 saat user drag-drop file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      if (dropped.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(dropped));
      } else {
        setPreview(null);
      }
    }
  };

  // 🟢 saat user drag area upload
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setShowPreview(false);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Silakan pilih file terlebih dahulu.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br bg-[#FFF8ED] p-4 relative overflow-hidden pt-6">
      {/* KOTAK UPLOAD */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-500 hover:scale-[1.02] z-10 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Disini anda dapat mengunggah file foto wayang 📁
        </h1>

        <div
          className={`relative border-3 border-dashed rounded-xl p-15 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-indigo-500 bg-[#A46B00]"
              : "border-gray-300 hover:border-[#A46B00] hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-10 text-[#A46B00] mb-2" />
          <p className="text-gray-500 text-sm">
            {file
              ? "File siap diunggah"
              : "Seret file ke sini atau klik untuk pilih"}
          </p>

          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {file && (
          <div className="mt-6 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="text-indigo-500" />
              <span className="text-sm text-gray-700 truncate max-w-[150px]">
                {file.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 transition"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Tombol Upload */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full flex justify-center items-center border-2 gap-2 bg-transparent text-black font-semibold py-2 rounded-lg shadow-md hover:bg-[#A46B00] hover:text-white transition duration-300 ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Mengunggah...
            </>
          ) : (
            "Upload Sekarang"
          )}
        </button>
      </div>

      {/* MODAL PREVIEW GAMBAR + QR CODE (FLIP) */}
      <AnimatePresence>
        {showPreview && preview && (
          <>
            {/* Background blur */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPreview(false);
                setFlipped(false);
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-50%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="fixed top-1/2 left-1/2 transform -translate-y-1/2 w-full sm:w-[400px] bg-white shadow-2xl z-30 p-6 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Preview Gambar
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Flip container */}
              <div className="relative w-full h-[320px] perspective">
                <motion.div
                  className="absolute inset-0 preserve-3d transition-transform duration-700"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                >
                  {/* Sisi depan */}
                  <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-xl shadow-lg max-h-[300px] object-contain"
                    />
                  </div>

                  {/* Sisi belakang (QR Code) */}
                  <div className="absolute inset-0 backface-hidden rotateY-180 flex flex-col items-center justify-center">
                    <h3 className="mb-3 text-gray-700 font-semibold">
                      QR Code File
                    </h3>
                    <QRCode
                      value={file?.name || "No File"}
                      size={150}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Tombol balik */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setFlipped((f) => !f)}
                  className="flex items-center gap-2 border-2 border-[#A46B00] text-[#A46B00] px-4 py-2 rounded-lg hover:bg-[#A46B00] hover:text-white transition"
                >
                  <RotateCw size={18} />
                  {flipped ? "Lihat Gambar" : "Lihat QR Code"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STYLE TAMBAHAN UNTUK 3D FLIP */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default UploadPage;
