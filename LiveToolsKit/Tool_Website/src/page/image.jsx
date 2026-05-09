"use client";

import { useMemo, useState, useEffect } from "react";
import {
  FaImage,
  FaCloudUploadAlt,
  FaDownload,
  FaTrash,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function ImageConverterPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [format, setFormat] = useState("image/png"); // image/png | image/jpeg | image/webp
  const [quality, setQuality] = useState(0.85); // for jpeg/webp
  const [resultUrl, setResultUrl] = useState("");
  const [resultName, setResultName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // cleanup urls
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accept = "image/png, image/jpeg, image/webp";

  const formatLabel = useMemo(() => {
    if (format === "image/png") return "PNG";
    if (format === "image/jpeg") return "JPG";
    return "WebP";
  }, [format]);

  const onPickFile = (f) => {
    setError("");
    setResultUrl("");
    setResultName("");

    if (!f) return;

    if (!accept.includes(f.type)) {
      setError("Please upload PNG, JPG/JPEG, or WebP images only.");
      return;
    }

    setFile(f);

    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const clearAll = () => {
    setError("");
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setPreview("");
    setResultUrl("");
    setResultName("");
  };

  const convert = async () => {
    setError("");
    setBusy(true);

    try {
      if (!file) {
        setError("Please upload an image first.");
        setBusy(false);
        return;
      }

      // Load image into canvas
      const img = await loadImage(preview);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      ctx.drawImage(img, 0, 0);

      const outBlob = await new Promise((resolve, reject) => {
        const q = format === "image/png" ? 1 : quality; // png ignores quality
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Conversion failed."));
            resolve(blob);
          },
          format,
          q,
        );
      });

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(outBlob);
      setResultUrl(url);

      const base = file.name.replace(/\.[^/.]+$/, "");
      const ext =
        format === "image/png"
          ? "png"
          : format === "image/jpeg"
            ? "jpg"
            : "webp";
      setResultName(`${base}.${ext}`);
    } catch (e) {
      setError(e?.message || "Something went wrong while converting.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = resultName || `converted.${formatLabel.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const faq = [
    {
      q: "Does this upload my image to a server?",
      a: "No. Everything happens in your browser. Your image stays on your device.",
    },
    {
      q: "Which format should I choose?",
      a: "JPG is best for photos, PNG for transparency/logos, WebP for web speed and smaller files.",
    },
    {
      q: "Why does PNG quality not change?",
      a: "PNG is lossless; it doesn’t use the same quality slider as JPG/WebP.",
    },
    {
      q: "Is WebP supported everywhere?",
      a: "Most modern browsers support WebP. It’s great for websites.",
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
            Converter Tool
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
              <FaImage className="text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                Image Converter
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl text-lg">
                Convert images to JPG, PNG, or WebP in seconds. Fast, clean, and
                easy — everything happens on your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Converter UI */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-purple-100 rounded-3xl shadow-xl overflow-hidden">
              {/* Top bar */}
              <div className="px-6 py-4 border-b border-purple-50 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="font-semibold text-gray-900">Converter</div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <FaTrash />
                    Clear
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Upload */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Upload Image
                    </div>

                    <label className="mt-3 block cursor-pointer rounded-2xl border border-dashed border-purple-200 bg-purple-50/40 hover:bg-purple-50 transition p-6">
                      <div className="flex items-center gap-3 text-purple-700 font-semibold">
                        <FaCloudUploadAlt />
                        <span>Click to upload (PNG/JPG/WebP)</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Your image stays in your browser — no server upload.
                      </p>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => onPickFile(e.target.files?.[0])}
                      />
                    </label>

                    {file && (
                      <div className="mt-4 text-sm text-gray-700">
                        <span className="font-semibold">Selected:</span>{" "}
                        {file.name}
                      </div>
                    )}

                    {error && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Preview */}
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Preview
                    </div>

                    <div className="mt-3 rounded-2xl border border-gray-200 bg-white overflow-hidden min-h-[180px] flex items-center justify-center">
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="max-h-[240px] w-auto object-contain"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">
                          Upload an image to see preview
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="mt-8 rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">
                        Output Format
                      </div>
                      <div className="text-sm text-gray-600">
                        Choose the format to convert into.
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FormatPill
                        label="PNG"
                        active={format === "image/png"}
                        onClick={() => setFormat("image/png")}
                      />
                      <FormatPill
                        label="JPG"
                        active={format === "image/jpeg"}
                        onClick={() => setFormat("image/jpeg")}
                      />
                      <FormatPill
                        label="WebP"
                        active={format === "image/webp"}
                        onClick={() => setFormat("image/webp")}
                      />
                    </div>
                  </div>

                  {(format === "image/jpeg" || format === "image/webp") && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900">
                          Quality
                        </div>
                        <div className="text-sm font-bold text-purple-700">
                          {Math.round(quality * 100)}%
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0.4}
                        max={1}
                        step={0.01}
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="mt-3 w-full accent-purple-600"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        Higher quality = bigger file size. Recommended 70–90%.
                      </p>
                    </div>
                  )}

                  {format === "image/png" && (
                    <div className="mt-5 rounded-xl bg-purple-50 border border-purple-100 p-4 text-sm text-gray-700 flex gap-2">
                      <FaInfoCircle className="text-purple-700 mt-0.5" />
                      PNG is lossless. Quality slider is not needed for PNG.
                    </div>
                  )}
                </div>

                {/* Convert + download */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={convert}
                    disabled={busy || !file}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {busy ? "Converting..." : "Convert Image"}
                  </button>

                  <button
                    type="button"
                    onClick={download}
                    disabled={!resultUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>

                {/* Result */}
                {resultUrl && (
                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center">
                        <FaCheckCircle />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900">
                          Converted Successfully
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                          File ready:{" "}
                          <span className="font-semibold">{resultName}</span>
                        </p>

                        <div className="mt-4 rounded-2xl border border-emerald-200 bg-white overflow-hidden p-3 flex items-center justify-center">
                          <img
                            src={resultUrl}
                            alt="converted"
                            className="max-h-[240px] w-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-gray-500">
                  Note: Conversion happens in your browser (client-side). Your
                  image is not uploaded to any server.
                </p>
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
                Convert your image in seconds:
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  "Upload your image (PNG/JPG/WebP).",
                  "Choose output format: PNG, JPG, or WebP.",
                  "Adjust quality (for JPG/WebP).",
                  "Click Convert, then Download your image.",
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
          <h3 className="text-2xl font-extrabold">
            Convert images the easy way
          </h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Choose the best format for your needs and download instantly — fast,
            clean, and user-friendly.
          </p>
        </div>
      </div>
    </section>
  );
}

function FormatPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${
        active
          ? "bg-purple-600 border-purple-600 text-white"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("Unable to load image. Please try another file."));
    img.src = src;
  });
}
