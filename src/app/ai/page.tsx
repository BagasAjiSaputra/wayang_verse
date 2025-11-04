"use client";

/**
 * WayangVerse — AI Playground Page
 * - Playground untuk generate cerita, ringkasan, dan TTS ringan (Web Speech API)
 * - UI clean, responsive, Framer Motion untuk micro-interactions
 * - Comments explain each block so you (dev) can extend easily
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaRobot, FaPlay, FaStop, FaTrash } from "react-icons/fa";

type Mode = "story" | "summarize" | "translate";

export default function AIPlaygroundPage() {
  // -------------------------
  // State: form + results + status
  // -------------------------
  const [mode, setMode] = useState<Mode>("story"); // active AI action
  const [input, setInput] = useState<string>("Tuliskan ringkasan tentang Abimanyu dalam gaya epik.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<
    { id: string; mode: Mode; prompt: string; output: string }[]
  >([]);
  const [voiceLang, setVoiceLang] = useState("id-ID");
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // -------------------------
  // Helper: call backend AI (stub)
  // Replace /api/ai/generate with your server endpoint that talks to OpenAI or other LLMs
  // -------------------------
  async function callAI(prompt: string, mode: Mode) {
    // Basic stub: Ideally POST to your backend, which calls LLM + returns text
    // Example payload { prompt, mode } -> backend decides model/temperature
    const payload = { prompt, mode };
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("API error " + res.status);
    }
    const data = await res.json();
    // Expect { text: "..." }
    return data.text as string;
  }

  // -------------------------
  // Action: Generate result
  // - toggles loading, calls backend, stores history
  // -------------------------
  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      // Call backend (or mock)
      const out = await callAI(input, mode);
      setResult(out);

      // add to local history
      setHistory((h) => [
        { id: Date.now().toString(), mode, prompt: input, output: out },
        ...h,
      ]);
    } catch (err) {
      console.error(err);
      setResult("Gagal menghasilkan konten. Cek koneksi atau endpoint API.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // TTS: client-side using Web Speech API
  // - If unavailable, show fallback message
  // -------------------------
  const playTTS = (text?: string) => {
    const content = text ?? result ?? "";
    if (!content) return;
    // stop existing
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(content);
    utter.lang = voiceLang;
    // optional: pick a voice closer to user locale (simple heuristic)
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(voiceLang.split("-")[0]));
    if (match) utter.voice = match;
    utter.rate = 1;
    utter.pitch = 1;
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

  // -------------------------
  // Small UI helpers
  // -------------------------
  const clearHistory = () => setHistory([]);

  // -------------------------
  // Render
  // -------------------------
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf5] to-[#f8f3ea] text-[#1E1E1E] px-6 md:px-16 py-12 font-[Outfit]">
      {/* Header / Hero */}
      <section className="max-w-4xl mx-auto text-center mb-10 mt-[3rem]">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold"
        >
          WayangVerse — AI Playground
        </motion.h1>
        <p className="text-gray-700 mt-3">
          Eksperimen ringkas: buat cerita, ringkasan, atau terjemahan cepat. Cocok
          buat ide konten, narasi TTS, dan prototype storytelling.
        </p>
      </section>

      {/* Top Controls: mode selector + voice */}
      <section className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mode buttons */}
          <div className="inline-flex rounded-full bg-white shadow-sm p-1">
            {(["story", "summarize", "translate"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  mode === m
                    ? "bg-amber-700 text-white shadow-sm"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                {m === "story" ? "Generate Story" : m === "summarize" ? "Summarize" : "Translate"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Voice language select */}
          <label className="text-sm text-gray-600 mr-2">Voice:</label>
          <select
            value={voiceLang}
            onChange={(e) => setVoiceLang(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
          >
            <option value="id-ID">Bahasa Indonesia (id-ID)</option>
            <option value="en-US">English (en-US)</option>
            <option value="jv-ID">Jawa (jv-ID)</option>
          </select>
        </div>
      </section>

      {/* Main playground area */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Input + actions */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-[0_6px_30px_rgba(0,0,0,0.04)]">
          <label className="text-sm text-gray-600">Prompt / Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "story" ? "Tuliskan premis cerita (tema, tokoh, mood)..." : "Masukkan teks untuk diringkas atau diterjemahkan..."}
            className="w-full mt-3 min-h-[140px] p-4 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-800"
          />

          <div className="flex items-center gap-3 mt-4">
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

            {/* Quick preset prompts */}
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setInput("Buat cerita Abimanyu versi modern, 3 paragraf, tone cinematic.")}
                className="text-sm px-3 py-1 rounded-full bg-gray-100"
              >
                Preset: Abimanyu
              </button>
              <button
                onClick={() => setInput("Ringkas cerita ini ke 2 kalimat: ")}
                className="text-sm px-3 py-1 rounded-full bg-gray-100"
              >
                Preset: Ringkas
              </button>
            </div>
          </div>

          {/* Result area */}
          <div className="mt-6">
            <label className="text-sm text-gray-600">Hasil</label>
            <AnimatePresence>
              <motion.div
                key={result ?? "empty"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 bg-[#fffaf0] p-4 rounded-lg min-h-[120px] border border-amber-50 text-gray-800"
              >
                {loading ? (
                  <p className="text-sm text-gray-500">Sedang memproses...</p>
                ) : result ? (
                  <>
                    <p className="whitespace-pre-line">{result}</p>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => playTTS(result)}
                        className="px-3 py-2 rounded-full bg-amber-700 text-white text-sm inline-flex items-center gap-2"
                      >
                        <FaPlay /> Putar TTS
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result);
                        }}
                        className="px-3 py-2 rounded-full border text-sm"
                      >
                        Salin
                      </button>
                      <button
                        onClick={() => {
                          setHistory((h) => [{ id: Date.now().toString(), mode, prompt: input, output: result! }, ...h]);
                        }}
                        className="px-3 py-2 rounded-full border text-sm"
                      >
                        Simpan
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Hasil akan muncul di sini setelah generate.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Small sidebar — history & quick explore */}
        <aside className="bg-white rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Riwayat</h4>
            <button onClick={clearHistory} className="text-sm text-gray-500">
              <FaTrash />
            </button>
          </div>

          {/* history list */}
          <div className="flex flex-col gap-3 overflow-auto max-h-[40vh]">
            {history.length === 0 && (
              <p className="text-sm text-gray-500">Belum ada riwayat. Simpan hasil untuk menampilkan.</p>
            )}

            {history.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{h.mode === "story" ? "Story" : h.mode === "summarize" ? "Ringkas" : "Translate"}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{h.prompt}</div>
                  </div>
                  <div className="flex flex-col items-end">
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
            ))}
          </div>

          {/* quick examples / feature promo */}
          <div className="pt-2 border-t border-gray-100">
            <h5 className="text-sm text-gray-700 font-medium mb-2">Eksperimen Cepat</h5>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setInput("Ceritakan Abimanyu sebagai hero sci-fi, 2 paragraf.")}
                className="text-sm px-3 py-2 rounded-lg bg-gray-100 text-left"
              >
                Abimanyu — Sci-fi
              </button>
              <button
                onClick={() => setInput("Ringkas konflik Bharatayudha ke 3 kalimat.")}
                className="text-sm px-3 py-2 rounded-lg bg-gray-100 text-left"
              >
                Ringkas Bharatayudha
              </button>
            </div>
          </div>
        </aside>
      </section>

      {/* Footer CTA */}
      <section className="max-w-6xl mx-auto mt-10 text-center">
        <p className="text-sm text-gray-600">
          Catatan: endpoint `/api/ai/generate` masih stub — hubungkan dengan backend (OpenAI, local LLM, atau server Anda). Jangan lupa batasi usages dan amankan API key.
        </p>
      </section>
    </main>
  );
}
