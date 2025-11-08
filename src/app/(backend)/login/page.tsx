"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Loading...");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Login sukses!");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 via-red-100 to-yellow-200 relative overflow-hidden">
      {/* Background Wayang Pattern */}
     

      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-96 space-y-6 border-4 border-yellow-800"
      >
        <h1 className="text-3xl font-bold text-center text-yellow-900 font-serif">
          WayangVerse Login
        </h1>
        <p className="text-center text-sm text-yellow-800 font-medium">
          Masuk untuk melanjutkan ke Dashboard
        </p>

        <input
          type="email"
          placeholder="Email"
          className="border-2 border-yellow-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border-2 border-yellow-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-yellow-800 hover:bg-yellow-900 text-white font-semibold w-full py-3 rounded-xl shadow-lg transition-all"
        >
          Masuk
        </button>

        {message && (
          <p className="text-center text-sm text-red-700 mt-2">{message}</p>
        )}

        <div className="mt-4 text-center text-yellow-900 text-sm font-serif">
          🌟 Selamat Datang di Dunia WayangVerse 🌟
        </div>
      </form>
    </div>
  );
}
