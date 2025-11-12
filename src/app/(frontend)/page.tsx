"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#1E1E1E] flex flex-col relative overflow-hidden">
      {/* 🔹 VIDEO BACKGROUND (AUTO MENYESUAIKAN DEVICE) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-label="Latar belakang video animasi Wayang"
        >
          <source src="/images/wayang/shortvideo.mp4" type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </div>

      {/* 🔹 HERO SECTION RESPONSIVE */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-24 mt-[3rem] relative overflow-hidden">
        {/* Lingkaran dekorasi */}
        <div className="absolute right-[-80px] lg:right-[59px] top-16 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-[#F5E4C3] rounded-full -z-10" />

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl space-y-6 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-200">
            Cerita <span className="text-yellow-700">Wayang</span> Nusantara
          </h1>
          <p className="text-base sm:text-lg text-white leading-relaxed max-w-lg mx-auto lg:mx-0">
            Wayang adalah bentuk teater boneka tradisional yang berasal dari
            pulau Jawa di Indonesia.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="#edukasi">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group relative inline-flex h-11 sm:h-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#1E1E1E] bg-white font-medium w-[150px] sm:w-auto"
              >
                <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-[#1E1E1E] transition duration-500 group-hover:-translate-y-[150%]">
                  Telusuri
                </div>
                <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-white transition duration-500 group-hover:translate-y-0">
                  <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#1E1E1E] transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                  <span className="z-10">Telusuri</span>
                </div>
              </motion.button>
            </Link>

            <Link href="#demo">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group relative inline-flex h-11 sm:h-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#1E1E1E] bg-[#1E1E1E] font-medium w-[150px] sm:w-auto"
              >
                <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-white transition duration-500 group-hover:-translate-y-[150%]">
                  Lihat Demo
                </div>
                <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-[#1E1E1E] transition duration-500 group-hover:translate-y-0">
                  <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-white transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                  <span className="z-10">Lihat Demo</span>
                </div>
              </motion.button>
            </Link>
          </div>

          {/* Petunjuk Scroll */}
          <motion.div
            whileHover={{ y: 4 }}
            className="pt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-white cursor-pointer hover:text-black"
          >
            <span>↓</span> Gulir ke bawah
          </motion.div>
        </motion.div>

        {/* IMAGE HERO */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-10 lg:mb-0"
        >
          <Image
            src="/images/bg.png"
            alt="Ilustrasi Wayang"
            width={400}
            height={400}
            className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[450px] h-auto"
            priority
          />
        </motion.div>
      </section>

      {/* 🔹 SECTION EDUKASI (TIDAK DIUBAH) */}
      <section
        id="edukasi"
        className="px-8 md:px-16 py-20 bg-[#FFF8ED] border-t border-[#F0E2C2] relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">
            Mengenal Wayang Lebih Dekat
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Wayang bukan hanya seni pertunjukan, tapi juga cermin kehidupan.
            Setiap tokoh, setiap bayangan, menyimpan pesan moral yang masih
            relevan hingga kini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Sejarah Wayang",
              desc: "Berawal dari ritual kuno hingga menjadi simbol budaya yang menyatukan spiritualitas dan seni.",
              img: "/images/wayang/abimanyu.jpg",
            },
            {
              title: "Filosofi Kehidupan",
              desc: "Wayang mengajarkan keseimbangan antara kebaikan dan kejahatan, antara dunia fana dan abadi.",
              img: "/images/wayang/arjuna.jpg",
            },
            {
              title: "Karakter dan Cerita",
              desc: "Setiap tokoh memiliki peran dan pesan — dari Arjuna yang bijak hingga Bagong yang jenaka.",
              img: "/images/wayang/bagong.jpg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] overflow-hidden border border-[#f0e0c8] flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href="/sejarah"
                  className="text-sm text-[#A46B00] font-medium mt-4 hover:underline"
                >
                  Baca selengkapnya →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
