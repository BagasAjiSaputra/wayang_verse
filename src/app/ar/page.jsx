"use client";

import { useEffect, useState } from "react";

export default function Wayang3DPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center py-12 bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen mt-[3rem]">
      <div className="w-full max-w-3xl p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
        <div className="sketchfab-embed-wrapper w-full aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 shadow-lg">
<iframe
  title="Wayang Golek Arjuna"
  frameBorder="0"
  allowFullScreen
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  allow="autoplay; fullscreen; xr-spatial-tracking"
  xr-spatial-tracking="true"
  execution-while-out-of-viewport="true"
  execution-while-not-rendered="true"
  web-share="true"
  src="https://sketchfab.com/models/8993880cd8fa4a0dbf6a08127f4d39f9/embed"
  className="w-full h-full rounded-xl"
/>

        </div>
        <p className="text-sm font-normal mt-4 text-gray-700 text-center">
          Wayang 3D
        </p>
      </div>
    </div>
  );
}
