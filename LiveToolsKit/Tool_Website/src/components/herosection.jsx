"use client";

import { useMemo } from "react";
import {
  FaLock,
  FaFileAlt,
  FaRobot,
  FaImage,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";

export default function Hero() {
  const tools = useMemo(
    () => [
      { name: "Password Generator", icon: FaLock },
      { name: "Words Counter", icon: FaFileAlt },
      { name: "Humanize AI Text Converter", icon: FaRobot },
      { name: "Image Converter", icon: FaImage },
      { name: "JSON Formatter", icon: FaCode },
    ],
    [],
  );

  const positions = useMemo(
    () => [
      { top: "12%", left: "6%" },
      { top: "20%", right: "10%" },
      { bottom: "18%", left: "14%" },
      { bottom: "22%", right: "6%" },
      { top: "52%", left: "86%" },
    ],
    [],
  );

  return (
    <section className="relative w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white overflow-hidden">
      {/* ⭐ FLOW LINES BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <circle cx="400" cy="300" r="250" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="300" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="300" r="150" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* ⭐ YELLOW BLOB */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-70 blur-2xl"></div>

      {/* ⭐ GREEN CURVED SHAPE */}
      <div className="absolute bottom-0 right-0 w-96 h-64 bg-green-400 rounded-tl-full opacity-80"></div>

      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center gap-10 relative z-10">
        {/* Left Text */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Boost Your Productivity with Toolify
          </h1>

          <p className="text-lg lg:text-xl text-purple-100">
            All the essential tools you need in one place: generate strong
            passwords, count words, humanize AI text, convert images, and format
            JSON easily.
          </p>

          <button className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold bg-white text-purple-600 hover:bg-purple-100 transition">
            Get Started <FaArrowRight />
          </button>
        </div>

        {/* Right Tool Cards */}
        <div className="flex-1 relative w-full h-[380px] lg:h-[330px]">
          {/* Main Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-purple-600 rounded-2xl p-6 shadow-2xl w-64 lg:w-72 flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Toolify Tools</h2>

            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.name}
                  className="group flex items-center gap-3 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg w-full hover:bg-purple-100 hover:scale-[1.02] transition"
                >
                  <Icon className="text-lg group-hover:text-purple-800 transition" />

                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floating Icons */}
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="absolute w-10 h-10 flex items-center justify-center bg-white text-purple-600 rounded-full shadow-md cursor-pointer hover:scale-110 transition"
                style={positions[idx]}
                title={tool.name}
              >
                <Icon className="text-lg" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
