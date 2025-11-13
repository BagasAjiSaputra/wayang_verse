"use client";

import React, { useState, useEffect } from "react";
import { Upload, File, X, Loader2, RotateCw, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [showAlert, setShowAlert] = useState(true); // 🟡 Tambahkan state modal pemberitahuan

  // 🟢 alert muncul hanya sekali saat halaman dibuka
  useEffect(() => {
    setShowAlert(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

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
      {/* 🟡 MODAL PEMBERITAHUAN */}
      <AnimatePresence>
        {showAlert && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[400px] z-50 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <div className="flex flex-col items-center">
                <Info className="text-[#A46B00] w-10 h-10 mb-3" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Selamat Datang 👋
                </h2>
                <p className="text-gray-600 text-sm mb-5">

                  Disini Anda dapat mengunggah foto wayang untuk diproses dan
                  melihat kode QR unik dari file yang diunggah. <b>Pastikan file Foto yang diupload adalah foto  wayang </b>
                  dengan
                  berformat <b>.jpg</b> atau <b>.png</b>.
                </p>
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-5 py-2 bg-[#A46B00] text-white rounded-lg hover:bg-[#8C5E00] transition"
                >
                  Mengerti
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

      {/* MODAL PREVIEW GAMBAR + QR CODE */}
      <AnimatePresence>
        {showPreview && preview && (
          <>
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

              <div className="relative w-full h-[320px] perspective">
                <motion.div
                  className="absolute inset-0 preserve-3d transition-transform duration-700"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                >
                  <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-xl shadow-lg max-h-[300px] object-contain"
                    />
                  </div>

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
