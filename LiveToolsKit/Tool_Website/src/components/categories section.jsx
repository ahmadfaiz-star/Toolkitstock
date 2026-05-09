"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaFileAlt,
  FaRobot,
  FaImage,
  FaCode,
  FaArrowRight,
  FaFont,
} from "react-icons/fa";

export default function CategoriesSection() {
  const [active, setActive] = useState(null);

  const categories = useMemo(
    () => [
      {
        title: "Password Generator",
        desc: "Create strong, secure passwords instantly.",
        icon: FaLock,
        badge: "Secure",
        gradient: "from-purple-600 to-fuchsia-500",
        link: "/password",
      },
      {
        title: "Words Counter",
        desc: "Count words, characters & reading time.",
        icon: FaFileAlt,
        badge: "Fast",
        gradient: "from-blue-600 to-cyan-500",
        link: "/wordscounter", // ✅ Words Counter page
      },
      {
        title: "Humanize AI Text",
        desc: "Make AI text natural and human-friendly.",
        icon: FaRobot,
        badge: "AI",
        gradient: "from-emerald-600 to-lime-500",
        link: "/humainizeai",
      },
      {
        title: "Image Converter",
        desc: "Convert images to JPG, PNG & WebP.",
        icon: FaImage,
        badge: "Convert",
        gradient: "from-amber-500 to-orange-500",
        link: "/image",
      },
      {
        title: "JSON Formatter",
        desc: "Format & validate JSON instantly.",
        icon: FaCode,
        badge: "Dev",
        gradient: "from-slate-700 to-slate-500",
        link: "/jsonformat",
      },
      {
        title: "Text Converter",
        desc: "Convert text case, format & styles easily.",
        icon: FaFont,
        badge: "New",
        gradient: "from-pink-600 to-rose-500",
        link: "/textconverter",
      },
    ],
    [],
  );

  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-green-200 rounded-full opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            Categories
          </p>

          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
            Choose a tool and boost productivity
          </h2>

          <p className="mt-3 text-slate-600 max-w-2xl">
            Modern, fast, and easy tools designed to simplify your work.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            const isActive = active === idx;

            return (
              <Link key={c.title} to={c.link} className="block">
                <div
                  onMouseEnter={() => setActive(idx)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Glow gradient */}
                  <div
                    className={`absolute -top-28 -right-28 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br ${c.gradient}`}
                  />

                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                      {c.badge}
                    </span>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      Open
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${c.gradient}`}
                    >
                      <Icon className="text-xl" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-900">
                        {c.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Try now
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-1 transition">
                      <FaArrowRight />
                    </div>
                  </div>

                  {/* Bottom line glow */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
