"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Pawitran Cerita (Awal Kisah)",
    description: [
      "Menelusuri kisah klasik Mahabharata dan Ramayana sebagai akar utama inspirasi.",
      "Menentukan tokoh sentral dan pesan moral yang ingin diangkat dalam versi modern Wayang Verse.",
    ],
  },
  {
    id: 2,
    title: "Nitis Karakter (Perwujudan Tokoh)",
    description: [
      "Mendesain ulang karakter wayang dengan sentuhan gaya visual kontemporer tanpa meninggalkan pakem tradisi.",
      "Memberi identitas unik pada setiap tokoh — warna, bentuk wajah, hingga simbol kekuatan.",
    ],
  },
  {
    id: 3,
    title: "Gelar Jagat (Penciptaan Dunia Wayang)",
    description: [
      "Membangun dunia WayangVerse yang memadukan elemen dunia kuno, spiritual, dan teknologi futuristik.",
      "Menentukan latar tempat, aturan kosmos, dan hubungan antar kerajaan dalam semesta ini.",
    ],
  },
  {
    id: 4,
    title: "Pawitra Narasi (Penyusunan Alur Cerita)",
    description: [
      "Menulis kisah lintas zaman dengan konflik antara kebaikan, keserakahan, dan takdir.",
      "Mengkombinasikan filosofi Jawa dengan gaya bercerita modern agar relevan bagi generasi muda.",
    ],
  },
  {
    id: 5,
    title: "Tatah Rupa (Desain Visual & Ilustrasi)",
    description: [
      "Membuat ilustrasi tokoh dan latar dengan sentuhan digital painting, pewayangan klasik, dan komik modern.",
      "Menjaga estetika wayang tetap hidup di era digital.",
    ],
  },
  {
    id: 6,
    title: "Suara Jiwa (Dubbing & Musik Tradisi)",
    description: [
      "Menggabungkan narasi dalang dengan efek suara dan musik gamelan modern.",
      "Menumbuhkan suasana magis dan emosi khas pertunjukan wayang dalam format audio-visual.",
    ],
  },
  {
    id: 7,
    title: "Pagelaran Digital (Wayang Verse Show)",
    description: [
      "Menayangkan kisah WayangVerse dalam bentuk animasi interaktif atau webcomic.",
      "Pengalaman digital yang tetap membawa nilai-nilai filosofi wayang.",
    ],
  },
  {
    id: 8,
    title: "Panutan Nusantara (Warisan dan Edukasi)",
    description: [
      "Mengedukasi generasi muda tentang filosofi wayang melalui media digital, pameran, dan kolaborasi kreatif.",
      "Menjadikan WayangVerse sebagai jembatan antara budaya klasik dan dunia modern.",
    ],
  },
  {
    id: 9,
    title: "Pustaka WayangVerse",
    description: [
      "Mengarsipkan seluruh karya digital dalam pustaka daring sebagai sumber pengetahuan budaya.",
      "Setiap karakter dan cerita terdokumentasi dengan metadata budaya dan filosofi aslinya.",
    ],
  },
  {
    id: 10,
    title: "Interaksi Pengguna",
    description: [
      "Membuka ruang bagi pengguna untuk berinteraksi dengan tokoh wayang melalui AI Chat.",
      "Pengalaman imersif — berdialog dengan Arjuna, Srikandi, atau Semar secara digital.",
    ],
  },
  {
    id: 11,
    title: "Kolaborasi Nusantara",
    description: [
      "Berkolaborasi dengan seniman, dalang, dan desainer muda untuk menghidupkan kembali pertunjukan digital.",
      "WayangVerse menjadi wadah lintas generasi bagi pelestarian budaya.",
    ],
  },
  {
    id: 12,
    title: "Kehidupan Virtual",
    description: [
      "Tokoh wayang mulai hidup dalam dunia metaverse dan game edukasi interaktif.",
      "Penggabungan teknologi 3D dan kecerdasan buatan membawa wayang ke dunia baru.",
    ],
  },
  {
    id: 13,
    title: "Warisan Abadi",
    description: [
      "WayangVerse menjadi warisan digital Nusantara yang terus berkembang dan menginspirasi dunia.",
      "Filosofi dan nilai luhur budaya Jawa tetap lestari di masa depan.",
    ],
  },
];

export default function StepSection() {
  return (
    <section className="bg-[#FFF8ED]min-h-screen py-24 px-4 overflow-hidden">
      {/* HEADER SECTION */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2E2B25] mb-4 relative inline-block">
          Tentang WayangVerse
          <span className="absolute left-1/2 bottom-[-10px] w-24 h-[3px] bg-[#8E7C6E] transform -translate-x-1/2 rounded-full"></span>
        </h2>
        <p className="text-[#5A544B] max-w-2xl mx-auto mt-6 text-sm sm:text-base leading-relaxed">
          Dari akar legenda menuju realitas digital — setiap tahap dalam
          WayangVerse adalah perjalanan antara masa lalu dan masa depan.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-1/2 top-0 w-[3px] bg-[#D8CFC2] h-full transform -translate-x-1/2"></div>

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`mb-14 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Card Konten */}
            <div className="w-full md:w-1/2 px-6">
              <div className="bg-white border border-[#E3DFDA] shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-[#A46B00] mb-2">
                  {step.title}
                </h3>
                {step.description.map((desc, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-[#5A544B] leading-relaxed mb-2"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>

            {/* Icon Tengah */}
            <div className="relative flex justify-center items-center w-10 h-10 bg-[#F9F8F6] z-10">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaCheckCircle className="text-[#8E7C6E] text-2xl" />
              </motion.div>
            </div>

            {/* Spacer */}
            <div className="w-1/2 hidden md:block"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
