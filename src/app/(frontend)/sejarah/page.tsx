"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Fungsi untuk mendapatkan nilai moral berdasarkan nama
const getMoralValue = (nama: string): string => {
  const morals: Record<string, string> = {
    "Anoman": "Kesetiaan dan keberanian sejati tidak mengenal bentuk, warna, atau asal-usul.",
    "Abimanyu": "Kebenaran butuh keberanian, bahkan jika itu berarti melawan nasib sendiri.",
    "Arjuna": "Kekuatan terbesar adalah menguasai diri, bukan mengalahkan orang lain.",
    "Bagong": "Kadang kebenaran paling dalam justru datang lewat tawa dan kejujuran yang polos.",
  };
  return morals[nama] || "Nilai moral tokoh ini sedang diperbarui.";
};

// Tipe data dari API
type Wayang = {
  id: string;
  nama: string;
  images: string;
  kisah: string;
};

// Helper: validasi URL
const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export default function SejarahPage() {
  const [wayangList, setWayangList] = useState<Wayang[]>([]);
  const [selected, setSelected] = useState<Wayang | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ambil data dari API saat komponen mount
  useEffect(() => {
    const fetchWayang = async () => {
      try {
        const res = await fetch("/api/wayang");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Validasi struktur data
        if (!Array.isArray(data)) {
          throw new Error("Data tidak dalam format array");
        }

        const validatedData = data
          .filter((item): item is Wayang => 
            typeof item === 'object' &&
            item &&
            typeof item.id === 'string' &&
            typeof item.nama === 'string' &&
            typeof item.images === 'string' &&
            typeof item.kisah === 'string'
          );

        setWayangList(validatedData);
        if (validatedData.length > 0) {
          setSelected(validatedData[0]);
        }
      } catch (error) {
        console.error("Error fetching wayang:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWayang();
  }, []);

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

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffaf5] to-[#f3e8d9]">
        <p className="text-xl text-gray-700">Memuat cerita wayang...</p>
      </main>
    );
  }

  if (wayangList.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffaf5] to-[#f3e8d9]">
        <p className="text-xl text-gray-700">Belum ada tokoh wayang tersedia.</p>
      </main>
    );
  }

  // Ambil URL gambar yang sudah dibersihkan dan divalidasi
  const cleanImageUrl = selected?.images.trim() || "";
  const displayImageUrl = isValidUrl(cleanImageUrl) && !imageError
    ? cleanImageUrl
    : "https://via.placeholder.com/400x400?text=Gambar+Tidak+Tersedia";

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
        {wayangList.map((wayang) => (
          <motion.button
            key={wayang.id}
            onClick={() => {
              setSelected(wayang);
              setImageError(false); // reset error saat ganti tokoh
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            whileHover={{ scale: 1.05 }}
            className={`px-5 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
              selected?.id === wayang.id
                ? "bg-amber-700 text-white shadow-md"
                : "bg-white text-gray-800 hover:bg-amber-100"
            }`}
          >
            {wayang.nama}
          </motion.button>
        ))}
      </motion.div>

      {/* Story */}
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
                src={displayImageUrl}
                alt={selected.nama}
                width={400}
                height={400}
                className="rounded-xl object-contain max-w-[280px] md:max-w-[350px] lg:max-w-[400px] max-h-[400px] mx-auto border border-gray-200"
                onError={handleImageError}
                priority
              />
            </div>

            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl font-semibold text-amber-800">
                {selected.nama}
              </h2>
              <p className="text-gray-700 leading-relaxed">{selected.kisah}</p>
              <div className="pt-3 border-t border-amber-100">
                <p className="italic text-gray-600 text-sm">
                  💬 Nilai Moral: {getMoralValue(selected.nama)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player */}
      {selected && (
        <audio
          ref={audioRef}
          src="/voice/abimanyu.mp3"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Play Button */}
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
            <span className="z-10">{isPlaying ? "Berhenti" : "Lanjut"}</span>
          </div>
        </motion.button>
      </div>
    </main>
  );
}