"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import { Sling as Hamburger } from "hamburger-react"; // 🍔 import dari hamburger-react

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Sejarah", href: "/sejarah" },
    { name: "AI", href: "/ai" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFFCF7]/80 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-4">
        {/* Logo section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E1E1E] text-white font-semibold">
            <span>W</span>
          </div>
          <span className="text-base md:text-lg font-semibold tracking-wide text-gray-800">
            WayangNusantara
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium">
          <MdGraphicEq className="text-[#1E1E1E] text-xl opacity-70" />
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-gray-900 italic"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Underline animation */}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-[2px] w-full h-[1.5px] bg-gray-800 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            color="#1E1E1E"
            rounded
            label="Toggle menu"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[68px] left-0 w-full bg-[#FFFCF7]/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
          >
            <ul className="flex flex-col text-center py-6 space-y-4 font-medium text-gray-700">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 transition ${
                        isActive
                          ? "text-amber-700 font-semibold"
                          : "hover:text-amber-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
