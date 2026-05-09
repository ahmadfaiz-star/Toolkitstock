"use client";

import { useMemo, useState, useEffect } from "react";
import {
  FaLock,
  FaCopy,
  FaRedoAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaKey,
  FaRandom,
} from "react-icons/fa";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(14);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = upper || lower || numbers || symbols;

  useEffect(() => {
    // generate once on mount
    setPassword(generatePassword(length, upper, lower, numbers, symbols));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strength = useMemo(() => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (upper) score += 1;
    if (lower) score += 1;
    if (numbers) score += 1;
    if (symbols) score += 1;

    score = Math.min(score, 6);

    const label = score <= 2 ? "Weak" : score <= 4 ? "Good" : "Strong";
    const bar =
      score <= 2
        ? "w-1/3 bg-red-500"
        : score <= 4
          ? "w-2/3 bg-amber-500"
          : "w-full bg-emerald-500";

    const hint =
      score <= 2
        ? "Increase length and enable more options."
        : score <= 4
          ? "Good. Use 16+ characters for extra safety."
          : "Strong password. Great choice!";

    return { label, bar, hint };
  }, [length, upper, lower, numbers, symbols]);

  const handleGenerate = () => {
    if (!canGenerate) return;
    setPassword(generatePassword(length, upper, lower, numbers, symbols));
    setCopied(false);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = password;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const faq = [
    {
      q: "Do you save my generated passwords?",
      a: "No. Passwords are generated in your browser. We don’t store them.",
    },
    {
      q: "What length is best?",
      a: "12–16+ characters is recommended for strong security.",
    },
    {
      q: "Should I use symbols?",
      a: "Yes. Symbols add complexity and make passwords harder to crack.",
    },
    {
      q: "Why should I not reuse passwords?",
      a: "If one account is hacked, reused passwords can expose your other accounts too.",
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
            Security Tool
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
              <FaLock className="text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                Password Generator
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl text-lg">
                Generate strong, secure passwords instantly. Choose length, add
                symbols, numbers, and copy with one click.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Generator */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-xl overflow-hidden">
              {/* Top */}
              <div className="px-6 py-4 border-b border-purple-50 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="font-semibold text-gray-900">Generator</div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyPassword}
                    disabled={!password}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCopy />
                    {copied ? "Copied" : "Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaRedoAlt />
                    Generate
                  </button>
                </div>
              </div>

              {/* Password output */}
              <div className="p-6">
                <div className="rounded-2xl border border-gray-200 p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">
                      Generated Password
                    </div>
                    <div className="font-extrabold text-gray-900 text-lg break-all">
                      {password || "—"}
                    </div>
                  </div>

                  <div className="shrink-0 w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <FaKey />
                  </div>
                </div>

                {/* Strength */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">
                      Strength
                    </span>
                    <span className="font-bold text-gray-900">
                      {strength.label}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full ${strength.bar}`} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{strength.hint}</p>
                </div>

                {/* Controls */}
                <div className="mt-8 space-y-6">
                  {/* Length */}
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">
                        Password Length
                      </div>
                      <div className="text-sm font-bold text-purple-700">
                        {length}
                      </div>
                    </div>

                    <input
                      type="range"
                      min={6}
                      max={32}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="mt-4 w-full accent-purple-600"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Recommended: 12–16+ characters.
                    </p>
                  </div>

                  {/* Options */}
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">Options</div>
                      <div className="text-sm text-gray-500 inline-flex items-center gap-2">
                        <FaRandom className="text-purple-700" />
                        Customize
                      </div>
                    </div>

                    <div className="mt-4 grid sm:grid-cols-2 gap-3">
                      <Toggle
                        label="Uppercase (A-Z)"
                        checked={upper}
                        onChange={setUpper}
                      />
                      <Toggle
                        label="Lowercase (a-z)"
                        checked={lower}
                        onChange={setLower}
                      />
                      <Toggle
                        label="Numbers (0-9)"
                        checked={numbers}
                        onChange={setNumbers}
                      />
                      <Toggle
                        label="Symbols (!@#...)"
                        checked={symbols}
                        onChange={setSymbols}
                      />
                    </div>

                    {!canGenerate && (
                      <p className="mt-3 text-sm text-red-600">
                        Select at least one option to generate a password.
                      </p>
                    )}
                  </div>

                  {/* Tip */}
                  <div className="rounded-2xl bg-purple-50 border border-purple-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white text-purple-700 flex items-center justify-center border border-purple-100">
                        <FaShieldAlt />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          Security Tip
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                          Use a unique password for every account and store it
                          in a password manager.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to use + FAQ */}
          <div className="lg:col-span-5 space-y-8">
            {/* How to use */}
            <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900">
                How to Use
              </h2>
              <p className="mt-2 text-gray-600">
                Generate a strong password in seconds:
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  "Choose password length using the slider.",
                  "Enable options (uppercase, numbers, symbols).",
                  "Click Generate to create a password.",
                  "Click Copy and paste it wherever needed.",
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

            {/* FAQ */}
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
          <h3 className="text-2xl font-extrabold">Stay secure, stay safe</h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Generate strong passwords, use unique credentials, and protect your
            online accounts easily.
          </p>
        </div>
      </div>
    </section>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between w-full rounded-2xl border px-4 py-3 transition ${
        checked
          ? "border-purple-200 bg-purple-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <span className="text-sm font-semibold text-gray-900">{label}</span>

      <span
        className={`w-12 h-7 rounded-full p-1 transition ${
          checked ? "bg-purple-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function generatePassword(len, useUpper, useLower, useNum, useSym) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numChars = "0123456789";
  const symChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let pool = "";
  const required = [];

  if (useUpper) {
    pool += upperChars;
    required.push(randomChar(upperChars));
  }
  if (useLower) {
    pool += lowerChars;
    required.push(randomChar(lowerChars));
  }
  if (useNum) {
    pool += numChars;
    required.push(randomChar(numChars));
  }
  if (useSym) {
    pool += symChars;
    required.push(randomChar(symChars));
  }

  if (!pool) return "";

  const remaining = Math.max(0, len - required.length);
  const chars = [...required];

  for (let i = 0; i < remaining; i++) {
    chars.push(randomChar(pool));
  }

  // shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}
