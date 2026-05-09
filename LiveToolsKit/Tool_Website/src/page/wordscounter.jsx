"use client";

import { useMemo, useState } from "react";
import {
  FaFileAlt,
  FaCopy,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaFont,
  FaParagraph,
  FaAlignLeft,
} from "react-icons/fa";

export default function WordsCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => {
    const t = text || "";
    const trimmed = t.trim();

    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = t.length;
    const charsNoSpaces = t.replace(/\s/g, "").length;

    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter(Boolean).length
      : 0;

    const lines = t ? t.split("\n").length : 0;

    const sentences = trimmed
      ? (trimmed.match(/[^.!?]+[.!?]+/g)?.length ?? 0) || (trimmed ? 1 : 0)
      : 0;

    // reading time (avg 200 wpm)
    const readingMinutes =
      words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

    return {
      words,
      chars,
      charsNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingMinutes,
    };
  }, [text]);

  const density = useMemo(() => {
    const t = text.trim().toLowerCase();
    if (!t) return [];
    const wordsArr = t.split(/\s+/).filter(Boolean);
    const map = new Map();
    for (const w of wordsArr) map.set(w, (map.get(w) || 0) + 1);
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [text]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const faq = [
    {
      q: "Does this tool store my text?",
      a: "No. Your text stays in your browser. We do not store it on any server.",
    },
    {
      q: "How is reading time calculated?",
      a: "We estimate reading time using an average of ~200 words per minute.",
    },
    {
      q: "Can I count characters without spaces?",
      a: "Yes. We show both characters (with spaces) and characters (no spaces).",
    },
    {
      q: "Can I use this for essays or SEO writing?",
      a: "Yes. It helps you stay within word limits and check readability quickly.",
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
            Productivity Tool
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
              <FaFileAlt className="text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                Words Counter
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl text-lg">
                Count words, characters, sentences, paragraphs, and reading time
                instantly. Clean, fast, and super easy to use.
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-purple-50 bg-white">
                <div className="font-semibold text-gray-900">Your Text</div>

                <div className="flex items-center gap-2 ">
                  <button
                    type="button"
                    onClick={copyText}
                    disabled={!text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? (
                      <>
                        <FaCheckCircle className="text-purple-600" /> Copied
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setText("")}
                    disabled={!text}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash /> Clear
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="p-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your text here…"
                  className="w-full min-h-[260px] resize-none rounded-2xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
                />
                <p className="mt-3 text-sm text-gray-500">
                  Tip: Paste an essay, blog, caption, or SEO content — stats
                  will update automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-extrabold text-gray-900">
                Live Statistics
              </h2>
              <p className="mt-1 text-gray-600 text-sm">
                Updates automatically as you type.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatCard
                  icon={FaAlignLeft}
                  label="Words"
                  value={stats.words}
                />
                <StatCard
                  icon={FaFont}
                  label="Characters"
                  value={stats.chars}
                />
                <StatCard
                  icon={FaFont}
                  label="Chars (no spaces)"
                  value={stats.charsNoSpaces}
                />
                <StatCard
                  icon={FaParagraph}
                  label="Paragraphs"
                  value={stats.paragraphs}
                />
                <StatCard
                  icon={FaCheckCircle}
                  label="Sentences"
                  value={stats.sentences}
                />
                <StatCard
                  icon={FaClock}
                  label="Reading time"
                  value={`${stats.readingMinutes} min`}
                />
              </div>

              {/* Top Words */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-900">Top Words</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Quick view of most repeated words.
                </p>

                {density.length === 0 ? (
                  <div className="mt-4 text-sm text-gray-500">
                    Start typing to see word frequency.
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {density.map(([word, count]) => (
                      <span
                        key={word}
                        className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700 border border-purple-100"
                      >
                        {word} • {count}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Extra info row */}
              <div className="mt-8 rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lines</span>
                  <span className="font-semibold text-gray-900">
                    {stats.lines}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to use + FAQ */}
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          {/* How to use (no boxy feel — clean blocks) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900">
                How to Use Words Counter
              </h2>
              <p className="mt-2 text-gray-600">
                Just follow these simple steps:
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  "Paste or type your text in the editor.",
                  "See live stats: words, characters, sentences, paragraphs, and reading time.",
                  "Use Copy to copy your text or Clear to reset.",
                  "Improve your writing based on the statistics.",
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
          </div>

          {/* FAQ */}
          <div className="lg:col-span-5">
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

        {/* bottom CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-10">
          <h3 className="text-2xl font-extrabold">Write smarter, faster</h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Use Words Counter to stay within limits, improve readability, and
            make your content more professional.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 hover:border-purple-200 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
          <Icon />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-500">{label}</div>
          <div className="text-xl font-extrabold text-gray-900 truncate">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
