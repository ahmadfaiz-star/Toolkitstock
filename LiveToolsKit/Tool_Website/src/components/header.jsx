import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function Header() {
  const [openCat, setOpenCat] = useState(false);
  const [openMobileCat, setOpenMobileCat] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ auth state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  // ✅ logout UX states
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // ✅ close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenCat(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ keep header updated if login/logout happens elsewhere
  useEffect(() => {
    const syncAuth = () =>
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-changed", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    // ✅ little delay for action feel
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");

      // ✅ notify header + other components
      window.dispatchEvent(new Event("auth-changed"));

      setIsLoggedIn(false);
      setIsLoggingOut(false);
      setMobileMenuOpen(false);
      setOpenMobileCat(false);

      // ✅ toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      // ✅ stay / go to home
      navigate("/");
    }, 800);
  };

  const categories = [
    { name: "Password Generator", to: "/password" },
    { name: "Words Counter", to: "/wordscounter" },
    { name: "Humanize AI Text Converter", to: "/humanize" },
    { name: "Image Converter", to: "/image" },
    { name: "JSON Formatter", to: "/jsonformat" },
    { name: "Text Converter", to: "/textconverter" },
  ];

  return (
    <>
      {/* ✅ Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-[9999] bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce text-sm sm:text-base">
          Logged out successfully ✅
        </div>
      )}

      <header className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* ✅ Left Logo */}
          <div className="w-[150px] h-[55px] sm:w-[190px] sm:h-[65px] md:w-[220px] md:h-[75px] lg:w-[260px] lg:h-[90px] flex items-center shrink-0">
            <img
              src="/images/log.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ✅ Desktop / Tablet Nav */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-[15px] lg:text-[17px] font-medium">
            <Link
              to="/"
              className="cursor-pointer px-3 lg:px-4 py-2 rounded-lg text-white whitespace-nowrap"
              style={{
                background: "linear-gradient(to right, #6D28D9, #A855F7)",
              }}
            >
              Home
            </Link>

            <Link
              to="/categories-section"
              className="cursor-pointer px-3 lg:px-4 py-2 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition whitespace-nowrap"
            >
              All Tools
            </Link>

            {/* ✅ Desktop Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpenCat((p) => !p)}
                className="flex items-center gap-2 cursor-pointer px-3 lg:px-4 py-2 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition whitespace-nowrap"
              >
                Categories
                <FaChevronDown
                  className={`text-sm transition ${openCat ? "rotate-180" : ""}`}
                />
              </button>

              {openCat && (
                <div className="absolute top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                  {categories.map((c) => (
                    <Link
                      key={c.name}
                      to={c.to}
                      onClick={() => setOpenCat(false)}
                      className="block px-4 py-3 text-[15px] text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/BlogPage"
              className="cursor-pointer px-3 lg:px-4 py-2 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition whitespace-nowrap"
            >
              Blog
            </Link>
          </nav>

          {/* ✅ Desktop / Tablet Right Login / Logout */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 lg:px-5 py-2 border border-purple-600 text-purple-600 rounded-lg 
                hover:bg-red-50 transition-all duration-300 
                active:scale-95 disabled:opacity-60 flex items-center gap-2 whitespace-nowrap text-sm lg:text-base"
              >
                {isLoggingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            ) : (
              <>
                <Link to="/loginpage">
                  <button className="px-4 lg:px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition active:scale-95 whitespace-nowrap text-sm lg:text-base">
                    Login
                  </button>
                </Link>

                <Link to="/signuppage">
                  <button
                    className="px-4 lg:px-5 py-2 rounded-lg text-white font-medium active:scale-95 whitespace-nowrap text-sm lg:text-base"
                    style={{
                      background: "linear-gradient(to right, #6D28D9, #A855F7)",
                    }}
                  >
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg border border-gray-200 bg-white shrink-0"
          >
            <span className="w-5 h-0.5 bg-gray-800 rounded"></span>
            <span className="w-5 h-0.5 bg-gray-800 rounded"></span>
            <span className="w-5 h-0.5 bg-gray-800 rounded"></span>
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl border border-gray-200 bg-white shadow-lg p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 rounded-lg text-white text-sm font-medium"
              style={{
                background: "linear-gradient(to right, #6D28D9, #A855F7)",
              }}
            >
              Home
            </Link>

            <Link
              to="/categories-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition"
            >
              All Tools
            </Link>

            {/* ✅ Mobile Categories Dropdown */}
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenMobileCat((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 transition"
              >
                Categories
                <FaChevronDown
                  className={`text-sm transition ${openMobileCat ? "rotate-180" : ""}`}
                />
              </button>

              {openMobileCat && (
                <div className="border-t border-gray-100 bg-gray-50">
                  {categories.map((c) => (
                    <Link
                      key={c.name}
                      to={c.to}
                      onClick={() => {
                        setOpenMobileCat(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/BlogPage"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition"
            >
              Blog
            </Link>

            <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full px-4 py-3 border border-purple-600 text-purple-600 rounded-lg 
                  hover:bg-red-50 transition-all duration-300 
                  active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
                >
                  {isLoggingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                      Logging out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </button>
              ) : (
                <>
                  <Link
                    to="/loginpage"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition active:scale-95 text-sm">
                      Login
                    </button>
                  </Link>

                  <Link
                    to="/signuppage"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button
                      className="w-full px-4 py-3 rounded-lg text-white font-medium active:scale-95 text-sm"
                      style={{
                        background:
                          "linear-gradient(to right, #6D28D9, #A855F7)",
                      }}
                    >
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
