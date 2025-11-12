"use client";

import React, { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: any) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    setFile(droppedFile || null);
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(droppedFile));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Upload Rekonstruksi Wayang
      </h1>

      <div
        className={`relative border-4 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-indigo-500 bg-yellow-200"
            : "border-gray-400 hover:border-indigo-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-72 rounded-lg shadow-md"
          />
        ) : (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V21h18v-4.5M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5"
              />
            </svg>
            <p className="text-gray-600 font-medium">
              Seret dan lepaskan gambar di sini
            </p>
            <p className="text-sm text-gray-500">atau klik untuk memilih</p>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-80 text-center">
          <p className="text-sm text-gray-600">File dipilih:</p>
          <p className="font-semibold text-gray-800">{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
