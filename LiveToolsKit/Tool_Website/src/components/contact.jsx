import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [now, setNow] = useState(new Date());
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", form);

      setMsg("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setMsg("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f6ff]">
      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-10 -right-32 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Contact</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-2xl p-6 shadow-sm space-y-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl text-white disabled:opacity-60"
            style={{
              background: "linear-gradient(to right, #6D28D9, #A855F7)",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {msg && <p className="text-sm mt-2 text-green-600">{msg}</p>}
        </form>

        {/* ✅ Live UTC Time */}
        <p className="mt-8 text-sm text-slate-500">
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
  );
}
