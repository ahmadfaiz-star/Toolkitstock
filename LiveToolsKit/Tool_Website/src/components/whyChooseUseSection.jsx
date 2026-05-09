"use client";

import { FaShieldAlt, FaBolt, FaMagic, FaUserCheck } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Safe",
      desc: "Your data stays private. We never store your content.",
    },
    {
      icon: FaBolt,
      title: "Lightning Fast",
      desc: "All tools work instantly with high-speed performance.",
    },
    {
      icon: FaMagic,
      title: "Easy to Use",
      desc: "Clean interface designed for everyone.",
    },
    {
      icon: FaUserCheck,
      title: "Trusted by Users",
      desc: "Thousands of users rely on our tools daily.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Why Choose Us
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We provide fast, secure, and easy-to-use tools to make your work
          effortless.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition group"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white text-2xl group-hover:scale-110 transition">
                  <Icon />
                </div>

                <h3 className="mt-5 font-semibold text-lg text-gray-900">
                  {f.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
