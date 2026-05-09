import { useEffect, useState } from "react";

export default function Privacy() {
  const [now, setNow] = useState(new Date());

  // ✅ live time
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#f7f6ff]">
        {/* ✅ same side colors */}
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-10 -right-32 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>

          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <p>
              We only collect your email if you subscribe to our newsletter.
            </p>
            <p>We do not sell or share your data with third parties.</p>
            <p>Cookies may be used to improve user experience.</p>
          </div>

          {/* ✅ LIVE date+time */}
          <p className="mt-8 text-sm text-slate-500">
            Last updated:{" "}
            <span className="font-medium text-slate-700">
              {now.toLocaleString("en-GB", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}{" "}
              UTC
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
