"use client";

import { useMemo, useState } from "react";
import {
  FaFont,
  FaCopy,
  FaTrash,
  FaAlignLeft,
  FaTextHeight,
  FaExchangeAlt,
  FaRedoAlt,
  FaItalic,
} from "react-icons/fa";

export default function TextConverterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ italic toggle (typing area me italic)
  const [italic, setItalic] = useState(false);

  const stats = useMemo(() => {
    const t = text || "";
    const trimmed = t.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = t.length;
    const lines = t ? t.split("\n").length : 0;
    return { words, chars, lines };
  }, [text]);

  // ✅ Actions (no HTML tags shown to user)
  const actions = useMemo(
    () => [
      {
        title: "UPPERCASE",
        desc: "Convert all text to uppercase.",
        run: (t) => t.toUpperCase(),
      },
      {
        title: "lowercase",
        desc: "Convert all text to lowercase.",
        run: (t) => t.toLowerCase(),
      },
      {
        title: "Title Case",
        desc: "Capitalize each word.",
        run: (t) =>
          t
            .toLowerCase()
            .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1)),
      },
      {
        title: "Sentence case",
        desc: "Capitalize first letter of each sentence.",
        run: (t) =>
          t
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
      },
      {
        title: "Remove Extra Spaces",
        desc: "Clean multiple spaces and extra blank lines.",
        run: (t) =>
          t
            .replace(/[ \t]+/g, " ")
            .replace(/\n{3,}/g, "\n\n")
            .trim(),
      },
      {
        title: "Trim Lines",
        desc: "Trim spaces at start/end of each line.",
        run: (t) =>
          t
            .split("\n")
            .map((line) => line.trim())
            .join("\n"),
      },
      {
        title: "Remove Empty Lines",
        desc: "Delete blank lines.",
        run: (t) =>
          t
            .split("\n")
            .filter((line) => line.trim() !== "")
            .join("\n"),
      },
      {
        title: "Reverse Text",
        desc: "Reverse all characters in your text.",
        run: (t) => t.split("").reverse().join(""),
      },
    ],
    [],
  );

  const runAction = (fn) => {
    if (!text) return;
    setText(fn(text));
    setCopied(false);
  };

  // ✅ Copy with italic formatting support (Word/Docs/HTML editors)
  const copyText = async () => {
    if (!text) return;

    try {
      const html = italic
        ? `<i>${escapeHtml(text).replace(/\n/g, "<br/>")}</i>`
        : escapeHtml(text).replace(/\n/g, "<br/>");

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const clearAll = () => {
    setText("");
    setCopied(false);
  };

  const faq = [
    {
      q: "Italic typing area me kaise hota hai?",
      a: "Italic button ON kar do — textarea me typing italic style me ho jati hai.",
    },
    {
      q: "Copy ke baad italic rahega?",
      a: "Word/Google Docs/HTML editors me yes. Plain text apps (Notepad) formatting support nahi karti.",
    },
    {
      q: "Kya ye tool text save karta hai?",
      a: "No. Text browser me hi rehta hai. Server par upload nahi hota.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 bg-white/70 border border-purple-100 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            Text Tool
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
              <FaFont className="text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                Text Converter
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl text-lg">
                Convert text case, clean formatting, remove extra spaces, and
                type in <span className="font-semibold">Italic</span> — fast and
                easy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Editor */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-xl overflow-hidden">
              {/* Top bar */}
              <div className="px-6 py-4 border-b border-purple-50 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="font-semibold text-gray-900">Your Text</div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* ✅ Italic toggle */}
                  <button
                    type="button"
                    onClick={() => setItalic((v) => !v)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                      italic
                        ? "bg-purple-600 text-white"
                        : "border border-purple-200 text-purple-700 hover:bg-purple-50"
                    }`}
                    title="Toggle Italic"
                  >
                    <FaItalic />
                    Italic
                  </button>

                  <button
                    type="button"
                    onClick={copyText}
                    disabled={!text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCopy />
                    {copied ? "Copied" : "Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={!text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash />
                    Clear
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="p-6">
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setCopied(false);
                  }}
                  placeholder="Paste or type your text here…"
                  className={`w-full min-h-[260px] resize-none rounded-2xl border border-gray-200 p-4 outline-none transition focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 ${
                    italic ? "italic" : "not-italic"
                  }`}
                />

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <MiniStat
                    icon={FaAlignLeft}
                    label="Words"
                    value={stats.words}
                  />
                  <MiniStat
                    icon={FaTextHeight}
                    label="Characters"
                    value={stats.chars}
                  />
                  <MiniStat
                    icon={FaExchangeAlt}
                    label="Lines"
                    value={stats.lines}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {actions.map((a) => (
                    <button
                      key={a.title}
                      type="button"
                      onClick={() => runAction(a.run)}
                      disabled={!text}
                      className="text-left rounded-2xl border border-gray-200 p-4 hover:border-purple-200 hover:bg-purple-50/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-gray-900">{a.title}</div>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                          <FaRedoAlt />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{a.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* How to use + FAQ */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900">
                How to Use
              </h2>
              <p className="mt-2 text-gray-600">
                Convert and style your text easily:
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  "Paste your text into the editor.",
                  "Turn Italic ON if you want italic typing.",
                  "Use conversion buttons (Uppercase, Title Case, etc.).",
                  "Copy your final text with one click.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="text-gray-700 leading-relaxed">{step}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900">FAQ</h2>
              <p className="mt-2 text-gray-600">
                Quick answers to common questions.
              </p>

              <div className="mt-6 space-y-5">
                {faq.map((f, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 pb-5 last:border-none last:pb-0"
                  >
                    <div className="font-bold text-gray-900">{f.q}</div>
                    <div className="mt-2 text-gray-600 leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-10">
          <h3 className="text-2xl font-extrabold">Convert text instantly</h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Clean formatting, change case, and type in italic — fast, modern,
            and user-friendly.
          </p>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
          <Icon />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500">{label}</div>
          <div className="text-xl font-extrabold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

// ✅ Safe HTML for rich clipboard copy
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
