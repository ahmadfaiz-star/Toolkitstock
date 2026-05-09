"use client";

import { FaMagic, FaClock, FaRocket } from "react-icons/fa";

export default function HumanizeComingSoonPage() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-purple-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[420px] sm:h-[420px] bg-fuchsia-200 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-700 bg-white/80 border border-purple-100 px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              New Tool in Progress
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Humanize AI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600">
                Coming Soon
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We are working on a beautiful Humanize AI tool that will help turn
              robotic text into content that feels more natural, clear, and
              human-friendly.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-purple-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm">
                <FaMagic className="text-purple-600" />
                Smarter rewriting
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-purple-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm">
                <FaClock className="text-fuchsia-600" />
                Launching soon
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-purple-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm">
                <FaRocket className="text-indigo-600" />
                Better user experience
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-[32px] blur-2xl opacity-20 scale-105" />

              <div className="relative bg-white/90 backdrop-blur-xl border border-purple-100 rounded-[32px] shadow-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-300" />
                    <span className="w-3 h-3 rounded-full bg-yellow-300" />
                    <span className="w-3 h-3 rounded-full bg-green-300" />
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                    Preview
                  </div>
                </div>

                <div className="mt-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-lg mx-auto">
                    <FaMagic className="text-2xl sm:text-3xl" />
                  </div>

                  <h2 className="mt-5 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                    Coming Soon
                  </h2>

                  <p className="mt-3 text-center text-sm sm:text-base text-gray-600 leading-relaxed">
                    This page is under development. A polished and powerful
                    Humanize AI experience will be available here very soon.
                  </p>

                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 p-4">
                    <div className="text-xs sm:text-sm font-semibold text-purple-700">
                      Planned Features
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li>• Human-like sentence improvement</li>
                      <li>• Better readability and flow</li>
                      <li>• Cleaner tone for blogs and essays</li>
                      <li>• Fast and simple text transformation</li>
                    </ul>
                  </div>

                  <div className="mt-6 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500" />
                  </div>

                  <p className="mt-2 text-center text-xs sm:text-sm text-gray-500">
                    Design in progress...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
