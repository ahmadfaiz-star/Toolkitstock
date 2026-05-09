"use client";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subMsg, setSubMsg] = useState("");
  const [subType, setSubType] = useState("success"); // "success" | "error"

  // ✅ Simple + manageable lists (only what you can handle)
  const tools = [
    { name: "Password Generator", to: "/password" },
    { name: "Words Counter", to: "wordscounter" },

    { name: "Image Converter", to: "/image" },
    { name: "JSON Formatter", to: "/jsonformat" },
    { name: "Text Converter", to: "/textconverter" },
  ];

  // ✅ Keep minimal pages (you can create these easily)
  const company = [
    { name: "Blog", to: "/BlogPage" },
    { name: "Contact", to: "/contact" },
  ];

  // ✅ Minimal legal pages (simple static pages)
  const legal = [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms", to: "/terms" },
  ];

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubMsg("");

    const v = email.trim();
    if (!isValidEmail(v)) {
      setSubType("error");
      setSubMsg("Please enter a valid email address.");
      return;
    }

    try {
      setSubLoading(true);

      const res = await axios.post("http://localhost:5000/api/subscribe", {
        email: v,
      });

      setSubType("success");
      setSubMsg(res.data?.message || "Subscribed successfully ✅");
      setEmail("");
    } catch (err) {
      setSubType("error");
      setSubMsg(err.response?.data?.message || "Server error");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white">
      {/* thin gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center font-bold">
                T
              </div>
              <h3 className="text-xl font-bold">Toolify</h3>
            </div>

            <p className="mt-4 text-slate-300 max-w-md text-sm leading-6">
              Simple productivity tools to save your time. New tools & updates
              straight to your inbox.
            </p>

            {/* ✅ Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">
                Get updates & tips
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm outline-none
                  focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                />

                <button
                  type="submit"
                  disabled={subLoading}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900
                  px-4 py-3 text-sm font-semibold hover:bg-slate-100 transition
                  disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {subLoading ? "Saving..." : "Subscribe"} <FaArrowRight />
                </button>
              </form>

              {subMsg && (
                <p
                  className={`mt-2 text-xs ${
                    subType === "error" ? "text-red-300" : "text-emerald-300"
                  }`}
                >
                  {subMsg}
                </p>
              )}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-bold text-white/90">Tools</h4>
            <ul className="mt-4 space-y-3">
              {tools.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-300 hover:text-white transition"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal (simple) */}
          <div>
            <h4 className="text-sm font-bold text-white/90">Company</h4>
            <ul className="mt-4 space-y-3">
              {company.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-300 hover:text-white transition"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold text-white/90 mt-8">Legal</h4>
            <ul className="mt-4 space-y-3">
              {legal.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.to}
                    className="text-sm text-slate-300 hover:text-white transition"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Toolify. All rights reserved.
          </p>

          {/* ✅ minimal links only */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-slate-400 hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
