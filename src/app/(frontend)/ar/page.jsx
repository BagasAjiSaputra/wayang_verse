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
        <div className="sketchfab-embed-wrapper">
          <iframe
            title="Punakawan Bagong"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/3c4f8cd99d9a4370a76bbd94d0ed02b6/embed"
            className="w-full h-[480px] rounded-xl"
          ></iframe>
          <p className="text-[13px] font-normal mt-2 text-gray-700 text-center">
            <a
              href="https://sketchfab.com/3d-models/punakawan-bagong-3c4f8cd99d9a4370a76bbd94d0ed02b6?utm_medium=embed&utm_campaign=share-popup&utm_content=3c4f8cd99d9a4370a76bbd94d0ed02b6"
              target="_blank"
              rel="nofollow"
              className="font-bold text-sky-500"
            >
              Punakawan Bagong
            </a>{" "}
            by{" "}
            <a
              href="https://sketchfab.com/ditaashifa?utm_medium=embed&utm_campaign=share-popup&utm_content=3c4f8cd99d9a4370a76bbd94d0ed02b6"
              target="_blank"
              rel="nofollow"
              className="font-bold text-sky-500"
            >
              ditaashifa
            </a>{" "}
            on{" "}
            <a
              href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=3c4f8cd99d9a4370a76bbd94d0ed02b6"
              target="_blank"
              rel="nofollow"
              className="font-bold text-sky-500"
            >
              Sketchfab
            </a>
          </p>
        </div>

        <p className="text-sm font-normal mt-4 text-gray-700 text-center">
          Wayang 3D
        </p>
      </div>
    </div>
  );
}
