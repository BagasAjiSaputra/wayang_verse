"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#1E1E1E] flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-24 mt-[3rem] relative overflow-hidden">
        <div className="absolute right-[-150px] md:right-[0px] top-20 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[#F5E4C3] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#1E1E1E]">
            Cerita <span className="text-[#A46B00]">Wayang</span> nusantara
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Wayang adalah bentuk teater boneka tradisional yang berasal dari pulau Jawa di Indonesia.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="#edukasi">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#1E1E1E] bg-white font-medium"
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
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#1E1E1E] bg-[#1E1E1E] font-medium"
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

          <motion.div
            whileHover={{ y: 4 }}
            className="pt-8 flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-black"
          >
            <span>↓</span> Gulir ke bawah
          </motion.div>
        </motion.div>

        {/* Hero Bg */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Image
            src="/images/bg.png"
            alt="Ilustrasi Wayang"
            width={500}
            height={500}
            priority
          />
        </motion.div>
      </section>

      {/* Section Edukasi Wayang */}
      <section
        id="edukasi"
        className="px-8 md:px-16 py-20 bg-[#FFF8ED] border-t border-[#F0E2C2]"
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
            Setiap tokoh, setiap bayangan, menyimpan pesan moral yang masih relevan hingga kini.
          </p>
        </motion.div>

        {/* Card */}
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
              {/* <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={250}
                className="object-cover w-full h-[230px]"
              /> */}
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
