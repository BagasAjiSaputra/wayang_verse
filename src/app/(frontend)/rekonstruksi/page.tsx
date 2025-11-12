"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMagic, FaUpload, FaRegImage } from "react-icons/fa";

const RekonstruksiPage = () => {
  return (
    <section className="min-h-screen bg-[#F9F8F6] py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Ornamen lingkaran dekoratif */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#F5E4C3] rounded-full opacity-40 blur-2xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[250px] h-[250px] bg-[#E8D5B5] rounded-full opacity-30 blur-2xl"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E2B25]">
          Rekonstruksi Wayang dengan AI
        </h1>
        <p className="mt-4 text-[#5A544B] max-w-2xl mx-auto text-base leading-relaxed">
          Unggah foto wayang lama, sketsa, atau siluet — AI kami akan mengembalikan detail visualnya secara otomatis: bentuk, ornamen, hingga warna tradisional. 
          Teknologi modern untuk melestarikan warisan budaya Nusantara.
        </p>
      </motion.div>

      {/* Konten Utama - Diselaraskan Tinggi */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Kiri - Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-b from-white to-[#FFF9EF] shadow-xl border border-[#E3DFDA] rounded-2xl p-8 flex flex-col text-center min-h-[400px]"
        >
          <FaUpload className="mx-auto text-5xl text-[#A46B00] mb-6" />
          <h2 className="text-xl font-semibold text-[#2E2B25] mb-2">
            Unggah Gambar Wayang
          </h2>
          <p className="text-[#5A544B] text-sm mb-4">
            Dukungan format: <span className="font-medium">JPG, PNG</span>
          </p>
          <p className="text-[#5A544B] text-sm mb-6 opacity-90">
            Cocok untuk foto lama, sketsa tangan, atau bayangan siluet wayang.
          </p>

          <label
            htmlFor="fileUpload"
            className="cursor-pointer border-2 border-dashed border-[#A46B00] rounded-xl py-10 flex flex-col items-center justify-center hover:bg-[#FFF9EF] hover:border-[#8E7C6E] transition-all duration-300 flex-grow"
          >
            <FaRegImage className="text-4xl text-[#A46B00] mb-3" />
            <span className="text-[#2E2B25] font-medium text-sm">
              Klik atau seret gambar ke sini
            </span>
            <input id="fileUpload" type="file" className="hidden" accept="image/jpeg,image/png" />
          </label>
        </motion.div>

        {/* Kanan - Preview / Output Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-b from-white to-[#F8F5F0] shadow-xl border border-[#E3DFDA] rounded-2xl p-8 flex flex-col text-center min-h-[400px] relative overflow-hidden"
        >
          <FaMagic className="mx-auto text-5xl text-[#8E7C6E] mb-6" />
          <h2 className="text-xl font-semibold text-[#2E2B25] mb-3">
            Hasil Rekonstruksi AI
          </h2>
          <p className="text-[#5A544B] text-sm mb-6 opacity-90">
            AI akan mengembalikan detail wayang: wajah, mahkota, motif, dan ekspresi khas — dalam gaya tradisional Nusantara.
          </p>

          <div className="border border-dashed border-[#C1B9B0] rounded-lg flex items-center justify-center text-gray-400 flex-grow">
            <span className="italic text-sm">Hasil akan muncul di sini</span>
          </div>

          {/* Dekorasi animasi lembut */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-6 right-6 w-8 h-8 border-2 border-[#E3DFDA] rounded-full opacity-60"
          ></motion.div>
        </motion.div>
      </div>

      {/* Catatan bawah */}
      <div className="text-center mt-20 text-sm text-[#5A544B] mb-4">
        © {new Date().getFullYear()} WayangVerse — Rekonstruksi Digital Wayang Nusantara by Astra-Verse
      </div>
    </section>
  );
};

export default RekonstruksiPage;