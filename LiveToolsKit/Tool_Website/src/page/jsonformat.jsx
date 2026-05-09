"use client";

import { useMemo, useState } from "react";
import {
  FaCode,
  FaCopy,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaCompress,
  FaExpand,
  FaWrench,
} from "react-icons/fa";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ok | error | fixed
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const canRun = useMemo(() => input.trim().length > 0, [input]);

  const formatJSON = () => run("format");
  const minifyJSON = () => run("minify");
  const validateJSON = () => run("validate");
  const autoFixJSON = () => run("fix");

  function run(mode) {
    setCopied(false);

    const raw = input;

    // 1) try parse directly
    const direct = tryParse(raw);
    if (direct.ok) {
      const pretty = JSON.stringify(direct.value, null, 2);
      const mini = JSON.stringify(direct.value);

      if (mode === "minify") setOutput(mini);
      else setOutput(pretty);

      setStatus("ok");
      setMessage("Valid JSON ✅");
      return;
    }

    // If user just wants validate and it fails
    if (mode === "validate") {
      setOutput("");
      setStatus("error");
      setMessage(buildErrorMessage(direct.error, raw));
      return;
    }

    // 2) try best-effort fixes
    const fixedText = smartFix(raw);
    const fixed = tryParse(fixedText);

    if (fixed.ok) {
      const pretty = JSON.stringify(fixed.value, null, 2);
      const mini = JSON.stringify(fixed.value);

      if (mode === "minify") setOutput(mini);
      else setOutput(pretty);

      setStatus("fixed");
      setMessage(
        "Your JSON had issues, but we auto-fixed common errors ✅ (Please review)",
      );
      return;
    }

    // still invalid
    setOutput("");
    setStatus("error");
    setMessage(
      buildErrorMessage(direct.error, raw) +
        "\n\nTried auto-fix but still invalid. Please check brackets, commas, and quotes.",
    );
  }

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStatus("idle");
    setMessage("");
    setCopied(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
            <FaCode />
          </div>
          <div className="min-w-0">
            <h1 className="text-4xl font-extrabold text-gray-900">
              JSON Formatter
            </h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Format, minify, validate — and if your JSON is invalid, we’ll try
              to auto-fix common mistakes and show you the exact error.
            </p>
          </div>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* INPUT */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Input JSON</h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                Paste here
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste JSON here...\nExample:\n{"name":"Ali","age":20}`}
              className="mt-4 w-full min-h-[290px] border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition font-mono text-[13px]"
            />

            <p className="mt-3 text-xs text-gray-500">
              Tip: If JSON is invalid, click <b>Auto Fix</b> to fix common
              issues (single quotes, trailing commas, smart quotes).
            </p>
          </div>

          {/* OUTPUT */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                Output
                {status === "ok" ? (
                  <FaCheckCircle className="text-emerald-500" />
                ) : status === "fixed" ? (
                  <FaCheckCircle className="text-purple-600" />
                ) : status === "error" ? (
                  <FaTimesCircle className="text-red-500" />
                ) : null}
              </h2>

              <button
                onClick={copyOutput}
                disabled={!output}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCopy />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* status message */}
            {message && (
              <div
                className={`mt-4 rounded-2xl border p-4 text-sm whitespace-pre-wrap ${
                  status === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : status === "fixed"
                      ? "border-purple-200 bg-purple-50 text-purple-800"
                      : "border-emerald-200 bg-emerald-50 text-emerald-800"
                }`}
              >
                {message}
              </div>
            )}

            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="mt-4 w-full min-h-[290px] border border-gray-200 rounded-2xl p-4 outline-none font-mono text-[13px]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={formatJSON}
            disabled={!canRun}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-2xl hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaExpand /> Format
          </button>

          <button
            onClick={minifyJSON}
            disabled={!canRun}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-2xl hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaCompress /> Minify
          </button>

          <button
            onClick={validateJSON}
            disabled={!canRun}
            className="flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-2xl hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            ✅ Validate
          </button>

          <button
            onClick={autoFixJSON}
            disabled={!canRun}
            className="flex items-center gap-2 border border-purple-200 text-purple-700 px-5 py-2 rounded-2xl hover:bg-purple-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaWrench /> Auto Fix
          </button>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 border border-gray-200 px-5 py-2 rounded-2xl hover:bg-gray-50 transition"
          >
            <FaTrash /> Clear
          </button>
        </div>

        {/* How to use */}
        <div className="mt-12 bg-white rounded-3xl border border-purple-100 p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900">How to Use</h2>
          <ol className="mt-4 space-y-2 text-gray-700">
            <li>1️⃣ Paste JSON in the input box</li>
            <li>
              2️⃣ Click <b>Format</b> to beautify
            </li>
            <li>
              3️⃣ If invalid, click <b>Auto Fix</b> (best-effort)
            </li>
            <li>4️⃣ Copy output instantly</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function tryParse(str) {
  try {
    return { ok: true, value: JSON.parse(str) };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function buildErrorMessage(err, raw) {
  const msg = String(err?.message || "Invalid JSON");
  const pos = extractPositionFromMessage(msg);
  if (!pos) return `❌ Invalid JSON\n${msg}`;

  const lc = posToLineCol(raw, pos);
  return `❌ Invalid JSON\n${msg}\n📍 Line: ${lc.line}, Column: ${lc.col}`;
}

// parses: "Unexpected token ... in JSON at position 123"
function extractPositionFromMessage(message) {
  const match = message.match(/position\s(\d+)/i);
  if (!match) return null;
  return Number(match[1]);
}

function posToLineCol(text, pos) {
  const upto = text.slice(0, pos);
  const lines = upto.split("\n");
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  return { line, col };
}

// Best-effort common fixes
function smartFix(str) {
  let s = String(str);

  // replace smart quotes
  s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  // remove BOM
  s = s.replace(/^\uFEFF/, "");

  // remove trailing commas:  { "a": 1, } or [1,2,]
  s = s.replace(/,\s*([}\]])/g, "$1");

  // if user used single quotes, convert to double quotes (basic)
  // (this is best-effort; can fail in complex cases)
  s = s.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (_m, p1) => {
    const inner = p1.replace(/"/g, '\\"');
    return `"${inner}"`;
  });

  // sometimes people paste JS object without quotes on keys: {name:"a"}
  // best-effort: quote simple keys (letters, numbers, _)
  s = s.replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)/g, '$1"$2"$3');

  // trim
  s = s.trim();

  return s;
}
