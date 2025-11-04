"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPlay, FaTrash } from "react-icons/fa";

type Mode = "story" | "summarize" | "translate";

export default function AIPlaygroundPage() {
  const [mode, setMode] = useState<Mode>("story");
  const [input, setInput] = useState("Tuliskan ringkasan tentang Abimanyu dalam gaya epik.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<
    { id: string; mode: Mode; prompt: string; output: string }[]
  >([]);
  const [voiceLang, setVoiceLang] = useState("id-ID");
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function callAI(prompt: string, mode: Mode) {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, mode }),
    });
    if (!res.ok) throw new Error("API error " + res.status);
    const data = await res.json();
    return data.text as string;
  }

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const out = await callAI(input, mode);
      setResult(out);
      setHistory((h) => [{ id: Date.now().toString(), mode, prompt: input, output: out }, ...h]);
    } catch (err) {
      console.error(err);
      setResult("Gagal menghasilkan konten. Under Development");
    } finally {
      setLoading(false);
    }
  };

  const playTTS = (text?: string) => {
    const content = text ?? result ?? "";
    if (!content) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(content);
    utter.lang = voiceLang;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(voiceLang.split("-")[0]));
    if (match) utter.voice = match;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
  };

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const clearHistory = () => setHistory([]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf5] to-[#f8f3ea] text-[#1E1E1E] px-4 md:px-10 py-10 font-[Outfit] overflow-x-hidden">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-10 mt-12">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold"
        >
          WayangVerse — AI Playground
        </motion.h1>
        <p className="text-gray-700 mt-3 text-sm md:text-base leading-relaxed">
          Eksperimen ringkas: buat cerita, ringkasan, atau terjemahan cepat. Cocok buat ide konten, narasi TTS, dan prototype storytelling.
        </p>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between flex-wrap">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full bg-white shadow-sm p-1 flex-wrap">
            {(["story", "summarize", "translate"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition ${
                  mode === m
                    ? "bg-amber-700 text-white shadow-sm"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                {m === "story"
                  ? "Generate Story"
                  : m === "summarize"
                  ? "Summarize"
                  : "Translate"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-600">Voice:</label>
          <select
            value={voiceLang}
            onChange={(e) => setVoiceLang(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
          >
            <option value="id-ID">Bahasa Indonesia</option>
            <option value="en-US">English</option>
            <option value="jv-ID">Bahasa Jawa</option>
          </select>
        </div>
      </section>

      {/* Playground Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input + Result */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_6px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          <label className="text-sm text-gray-600">Prompt / Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan teks..."
            className="w-full mt-3 min-h-[140px] p-4 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-800 resize-y max-h-[50vh]"
          />

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:brightness-95 disabled:opacity-60"
            >
              <FaRobot /> {loading ? "Men-generate..." : "Generate"}
            </button>

            <button
              onClick={() => {
                setInput("");
                setResult(null);
              }}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm"
            >
              Clear
            </button>
          </div>

          {/* Result */}
          <div className="mt-6">
            <label className="text-sm text-gray-600">Hasil</label>
            <AnimatePresence>
              <motion.div
                key={result ?? "empty"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 bg-[#fffaf0] p-4 rounded-lg min-h-[120px] border border-amber-50 text-gray-800 overflow-y-auto max-h-[45vh]"
              >
                {loading ? (
                  <p className="text-sm text-gray-500">Sedang memproses...</p>
                ) : result ? (
                  <>
                    <p className="whitespace-pre-line break-words">{result}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => playTTS(result)}
                        className="px-3 py-2 rounded-full bg-amber-700 text-white text-sm inline-flex items-center gap-2"
                      >
                        <FaPlay /> Putar TTS
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="px-3 py-2 rounded-full border text-sm"
                      >
                        Salin
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    Hasil akan muncul di sini setelah generate.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)] flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Riwayat</h4>
            <button onClick={clearHistory} className="text-sm text-gray-500">
              <FaTrash />
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[45vh] scrollbar-thin scrollbar-thumb-gray-300">
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">
                Belum ada riwayat. Simpan hasil untuk menampilkan.
              </p>
            ) : (
              history.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium">
                        {h.mode === "story"
                          ? "Story"
                          : h.mode === "summarize"
                          ? "Ringkas"
                          : "Translate"}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-[200px]">
                        {h.prompt}
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <button
                        onClick={() => {
                          setResult(h.output);
                          setInput(h.prompt);
                        }}
                        className="text-xs text-amber-700"
                      >
                        Muat
                      </button>
                      <button
                        onClick={() => playTTS(h.output)}
                        className="text-xs text-gray-600 mt-1"
                      >
                        Putar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </aside>
      </section>

      {/* Footer */}
      <section className="max-w-6xl mx-auto mt-10 text-center px-4">
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          Under Testing
        </p>
      </section>
    </main>
  );
}
