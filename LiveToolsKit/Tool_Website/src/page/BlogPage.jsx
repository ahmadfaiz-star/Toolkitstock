"use client";

import { useMemo } from "react";
import {
  FaLock,
  FaFileAlt,
  FaRobot,
  FaImage,
  FaCode,
  FaFont,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

export default function BlogPageSingle() {
  const posts = useMemo(
    () => [
      {
        icon: FaLock,
        title: "Password Generator",
        subtitle: "Create secure passwords in seconds",
        intro:
          "A Password Generator helps you create strong and unique passwords to protect your accounts. Instead of using simple passwords like '123456' or your name, you can generate a random and secure password instantly.",
        sections: [
          {
            h2: "Why strong passwords matter",
            points: [
              "Weak passwords are easy to guess or crack.",
              "Reusing passwords increases risk across all accounts.",
              "Strong passwords reduce chances of hacking significantly.",
            ],
          },
          {
            h2: "How to use our Password Generator",
            points: [
              "Choose password length (recommended 12–16+).",
              "Enable options: uppercase, lowercase, numbers, symbols.",
              "Click generate and copy your password.",
              "Save it in a safe place (password manager recommended).",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Use different passwords for each account.",
              "Avoid your name, birthdays, or common words.",
              "Long passwords are more secure than complex short ones.",
            ],
          },
        ],
        faq: [
          {
            q: "Do you save my passwords?",
            a: "No. Everything stays on your device.",
          },
          { q: "What length is best?", a: "12–16+ characters is recommended." },
        ],
      },

      {
        icon: FaFileAlt,
        title: "Words Counter",
        subtitle: "Count words, characters & reading time",
        intro:
          "Words Counter is helpful for students, writers, and bloggers. It instantly shows how many words, characters, sentences, and paragraphs your text has — plus an estimate of reading time.",
        sections: [
          {
            h2: "What you can count",
            points: [
              "Total words (for essays and assignments).",
              "Characters (with/without spaces).",
              "Sentences & paragraphs (for readability).",
              "Reading time (useful for blogs).",
            ],
          },
          {
            h2: "How to use",
            points: [
              "Paste or type your text in the box.",
              "Counts update automatically in real-time.",
              "Copy your text or edit until you reach your limit.",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Use reading time to make blog posts user-friendly.",
              "For SEO, keep headings short and clear.",
              "Remove extra spaces before submitting work.",
            ],
          },
        ],
        faq: [
          { q: "Is my text stored?", a: "No. Your text stays private." },
          {
            q: "Can I count very long text?",
            a: "Yes, you can paste long text easily.",
          },
        ],
      },

      {
        icon: FaRobot,
        title: "Humanize AI Text Converter",
        subtitle: "Make AI text sound natural & human",
        intro:
          "Sometimes AI-generated text sounds robotic. Humanize AI Text Converter helps improve tone, flow, and readability so your content feels natural and easy to understand.",
        sections: [
          {
            h2: "When you should humanize text",
            points: [
              "When content feels too formal or robotic.",
              "When sentences repeat the same style.",
              "When you want more natural tone for blog/email.",
            ],
          },
          {
            h2: "How to use",
            points: [
              "Paste your AI-generated text.",
              "Click Humanize / Convert.",
              "Review and adjust (add your own style if needed).",
              "Copy the final human-friendly version.",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Keep sentences shorter for better clarity.",
              "Use simple words and active voice.",
              "Add examples to make content feel real.",
            ],
          },
        ],
        faq: [
          {
            q: "Will meaning change?",
            a: "It keeps the same meaning, improves wording.",
          },
          {
            q: "Can I humanize long content?",
            a: "Yes, large text can be improved too.",
          },
        ],
      },

      {
        icon: FaImage,
        title: "Image Converter",
        subtitle: "Convert JPG, PNG, WebP easily",
        intro:
          "Image Converter helps you convert images into different formats. This is useful for websites (faster loading), social media, and keeping file sizes smaller without losing quality.",
        sections: [
          {
            h2: "Which format should you choose?",
            points: [
              "JPG: best for photos (small size).",
              "PNG: best for logos (supports transparency).",
              "WebP: best for websites (small size + good quality).",
            ],
          },
          {
            h2: "How to use",
            points: [
              "Upload your image.",
              "Select the output format (JPG/PNG/WebP).",
              "Choose quality if available.",
              "Convert and download.",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Use WebP for faster websites.",
              "Use PNG for transparent logos.",
              "Keep JPG quality 70–85 for best balance.",
            ],
          },
        ],
        faq: [
          {
            q: "Does conversion reduce quality?",
            a: "Only if you choose lower quality.",
          },
          { q: "Is WebP supported?", a: "Yes in most modern browsers." },
        ],
      },

      {
        icon: FaCode,
        title: "JSON Formatter",
        subtitle: "Prettify, validate & minify JSON",
        intro:
          "JSON Formatter is perfect for developers. It makes JSON readable (pretty format), validates errors, and can also minify JSON for faster use in APIs and apps.",
        sections: [
          {
            h2: "What JSON Formatter does",
            points: [
              "Prettify: makes JSON clean and readable.",
              "Validate: checks if JSON is correct or has errors.",
              "Minify: removes spaces to make JSON smaller.",
            ],
          },
          {
            h2: "How to use",
            points: [
              "Paste your JSON into the editor.",
              "Click Format / Validate.",
              "Fix errors if tool shows them.",
              "Copy your formatted JSON.",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Always validate JSON before using in API.",
              "Use prettify for debugging.",
              "Use minify for production (optional).",
            ],
          },
        ],
        faq: [
          { q: "Does it store my JSON?", a: "No, it stays private." },
          {
            q: "Can it handle large JSON?",
            a: "Yes, most large JSON works fine.",
          },
        ],
      },

      {
        icon: FaFont,
        title: "Text Converter",
        subtitle: "Uppercase, lowercase, title case & cleanup",
        intro:
          "Text Converter helps you quickly change text formatting. Useful for headings, emails, documents, and cleaning copied text by removing extra spaces.",
        sections: [
          {
            h2: "Most useful conversions",
            points: [
              "UPPERCASE / lowercase / Title Case",
              "Remove extra spaces",
              "Clean copied text formatting",
            ],
          },
          {
            h2: "How to use",
            points: [
              "Paste your text.",
              "Choose conversion type.",
              "Copy the converted text instantly.",
            ],
          },
          {
            h2: "Pro tips",
            points: [
              "Use Title Case for headings.",
              "Remove extra spaces before submitting assignments.",
              "Lowercase helps with usernames and URLs.",
            ],
          },
        ],
        faq: [
          {
            q: "Will it change the meaning?",
            a: "No, only text formatting changes.",
          },
          {
            q: "Can I convert long text?",
            a: "Yes, large text can be converted too.",
          },
        ],
      },
    ],
    [],
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-purple-600" />
          Toolify Blog
        </div>

        <h1 className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900">
          Easy Guides for Our Tools
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl">
          Simple, easy-to-understand guides so users can quickly learn how each
          tool works and why it helps.
        </p>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {posts.map((post, idx) => {
            const Icon = post.icon;
            return (
              <article
                key={idx}
                className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                {/* Title row */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
                    <Icon className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-extrabold text-gray-900">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{post.subtitle}</p>
                  </div>
                </div>

                {/* Intro */}
                <p className="mt-5 text-gray-700 leading-relaxed">
                  {post.intro}
                </p>

                {/* Sections */}
                <div className="mt-6 space-y-6">
                  {post.sections.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-gray-50 p-5 border border-gray-100"
                    >
                      <h3 className="font-bold text-gray-900">{s.h2}</h3>
                      <ul className="mt-3 space-y-2">
                        {s.points.map((p, j) => (
                          <li key={j} className="flex gap-3 text-gray-700">
                            <FaCheckCircle className="text-purple-600 mt-1 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* FAQ */}
                <div className="mt-6 rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <FaBolt className="text-purple-600" />
                    FAQs
                  </div>

                  <div className="mt-4 space-y-4">
                    {post.faq.map((f, i) => (
                      <div key={i}>
                        <div className="font-semibold text-gray-900">{f.q}</div>
                        <div className="text-gray-600 mt-1">{f.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* End section */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-10">
          <h3 className="text-2xl font-extrabold">Want to try these tools?</h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Open any tool from the homepage and test it instantly. Our goal is
            to keep everything simple, fast, and user-friendly.
          </p>
        </div>
      </div>
    </section>
  );
}
