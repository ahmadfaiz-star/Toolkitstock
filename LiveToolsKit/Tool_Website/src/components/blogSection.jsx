import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function BlogSectionClean() {
  const blogs = [
    { title: "Password Generator Guide", meta: "Security • 4 min" },
    {
      title: "Words Counter: What to Track & Why",
      meta: "Productivity • 4 min",
    },
    { title: "Humanize AI Text: Make it Natural", meta: "AI • 5 min" },
    { title: "Image Converter: JPG vs PNG vs WebP", meta: "Design • 6 min" },
    {
      title: "JSON Formatter: Clean & Validate JSON",
      meta: "Development • 3 min",
    },
    { title: "Text Converter: Clean Text Fast", meta: "Text • 3 min" },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold text-purple-700">
              BLOG / GUIDES
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug lg:leading-tight">
              Quick guides to help users
              <span className="text-purple-700"> understand</span> your tools
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-md">
              Simple, practical articles — so people can use Password Generator,
              Word Counter, Text Converter, Image Converter, JSON Formatter and
              Humanize AI easily.
            </p>

            <Link
              to="/BlogPage"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold hover:bg-gray-800 transition"
            >
              Read Blog <FaArrowRight />
            </Link>
          </div>

          {/* Right list */}
          <div className="lg:col-span-7">
            <div className="border-t border-gray-200">
              {blogs.map((b, i) => (
                <Link
                  key={i}
                  to="/BlogPage"
                  className="group block py-4 sm:py-5 border-b border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 sm:truncate group-hover:text-purple-700 transition">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        {b.meta}
                      </p>
                    </div>

                    <span className="shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition">
                      Read
                      <FaArrowRight className="group-hover:translate-x-1 transition" />
                    </span>
                  </div>

                  <div className="mt-3 h-[2px] w-0 bg-purple-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
