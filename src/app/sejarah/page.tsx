"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const wayangStories = [
  {
    id: "awal",
    title: "Anoman — Sang Ksatria Putih",
    year: "Anoman",
    img: "/images/wayang/anoman.jpg",
    desc: "Anoman, si kera putih yang lahir dari kekuatan angin dan jiwa kesetiaan. Dengan keberanian yang tak tertandingi, ia menjadi simbol keteguhan hati dalam membela kebenaran. Tak pernah mengeluh, tak pernah mundur — bahkan saat melawan raksasa terbesar, semangatnya tetap menyala demi dharma dan sahabatnya, Rama.",
    moral: "Kesetiaan dan keberanian sejati tidak mengenal bentuk, warna, atau asal-usul.",
    voice: "/voice/abimanyu.mp3",
  },
  {
    id: "kulit",
    title: "Abimanyu — Ksatria Muda Pandawa",
    year: "Abimanyu",
    img: "/images/wayang/abimanyu.jpg",
    desc: "Abimanyu, putra Arjuna, dikenal sebagai ksatria muda yang berani menembus formasi maut Cakra Wyuh. Meskipun tahu jalan masuknya tanpa tahu jalan keluar, ia tetap maju demi kehormatan Pandawa dan kebenaran yang diyakininya. Keberaniannya jadi simbol perjuangan tanpa pamrih — melangkah bukan karena pasti menang, tapi karena yakin pada kebenaran.",
    moral: "Kebenaran butuh keberanian, bahkan jika itu berarti melawan nasib sendiri.",
    voice: "/voice/abimanyu.mp3",
  },
  {
    id: "golek",
    title: "Arjuna — Sang Pemanah Cinta dan Dharma",
    year: "Arjuna",
    img: "/images/wayang/arjuna.jpg",
    desc: "Arjuna adalah simbol kesempurnaan ksatria — gagah dalam peperangan, tenang dalam kebijaksanaan, dan lembut dalam cinta. Ia belajar bahwa kekuatan sejati bukan berasal dari senjata, tapi dari kendali atas diri sendiri. Dalam setiap panah yang dilepaskan, Arjuna tak hanya menaklukkan musuh, tapi juga egonya sendiri.",
    moral: "Kekuatan terbesar adalah menguasai diri, bukan mengalahkan orang lain.",
    voice: "/voice/abimanyu.mp3",
  },
  {
    id: "modern",
    title: "Bagong — Cermin Suara Rakyat",
    year: "Bagong",
    img: "/images/wayang/bagong.jpg",
    desc: "Bagong adalah sosok jenaka yang selalu membawa tawa di tengah kisah penuh konflik. Tapi di balik candanya, tersimpan kritik tajam terhadap keserakahan dan kebodohan manusia. Ia berbicara jujur saat yang lain bungkam, menertawakan kebohongan agar kebenaran tak terlupakan.",
    moral: "Kadang kebenaran paling dalam justru datang lewat tawa dan kejujuran yang polos.",
    voice: "/voice/abimanyu.mp3",
  },
];


export default function SejarahPage() {
  const [selected, setSelected] = useState(wayangStories[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf5] to-[#f3e8d9] text-[#1E1E1E] px-6 md:px-16 py-24 font-[Outfit]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Jejak Cerita Wayang Nusantara
        </h1>
        <p className="text-gray-700 leading-relaxed text-lg">
          Telusuri perjalanan seni pewayangan dari masa ke masa — dari simbol
          spiritual hingga narasi moral bangsa.
        </p>
      </motion.section>

      {/* Timeline */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {wayangStories.map((story) => (
          <motion.button
            key={story.id}
            onClick={() => {
              setSelected(story);
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            whileHover={{ scale: 1.05 }}
            className={`px-5 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
              selected.id === story.id
                ? "bg-amber-700 text-white shadow-md"
                : "bg-white text-gray-800 hover:bg-amber-100"
            }`}
          >
            {story.year}
          </motion.button>
        ))}
      </motion.div>

      {/* Story Display */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-8 md:p-12 flex flex-col md:flex-row md:items-start items-center gap-10"
          >
            <div className="flex justify-center md:justify-start w-full md:w-[45%]">
              <Image
                src={selected.img}
                alt={selected.title}
                width={400}
                height={400}
                className="rounded-xl object-contain max-w-[280px] md:max-w-[350px] lg:max-w-[400px] max-h-[400px] mx-auto"
                priority
              />
            </div>

            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl font-semibold text-amber-800">
                {selected.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{selected.desc}</p>
              <div className="pt-3 border-t border-amber-100">
                <p className="italic text-gray-600 text-sm">
                  💬 Nilai Moral: {selected.moral}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio player */}
      <audio ref={audioRef} src={selected.voice} onEnded={() => setIsPlaying(false)} />

      {/* Audio Button */}
      <div className="text-center mt-16">
        <motion.button
          onClick={handlePlay}
          whileHover={{ scale: 1.05 }}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white px-6 font-medium text-gray-800 shadow-sm"
        >
          <div className="inline-flex h-12 translate-y-0 items-center justify-center transition duration-500 group-hover:-translate-y-[150%]">
            {isPlaying ? "⏸️ Hentikan Narasi" : "🎧 Putar Narasi"}
          </div>
          <div className="absolute inline-flex h-20 w-full translate-y-[100%] items-center justify-center text-white transition duration-500 group-hover:translate-y-0">
            <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-amber-700 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
            <span className="z-10">
              {isPlaying ? "Berhenti" : "Lanjut"}
            </span>
          </div>
        </motion.button>
      </div>
    </main>
  );
}
