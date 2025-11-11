"use client";

import React, { useState } from "react";
import { Upload, File, X } from "lucide-react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = () => {
    if (file) {
      alert(`File "${file.name}" berhasil diupload!`);
      setFile(null);
    } else {
      alert("Silakan pilih file terlebih dahulu.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-500 hover:scale-[1.02]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Disini anda dapat mengunggah file foto wayang 📁
        </h1>

        <div
          className={`relative border-3 border-dashed rounded-xl p-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-indigo-500 mb-2" />
          <p className="text-gray-500 text-sm">
            {file ? "File siap diunggah" : "Seret file ke sini atau klik untuk pilih"}
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

        <button
          onClick={handleUpload}
          className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Upload Sekarang
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
