"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
      );

      // ✅ save login
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");
      if (res.data.token) localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-6">
      {/* background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md relative z-10">
        {/* heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Access your account to continue</p>
        </div>

        {/* form card */}
        <div className="bg-white border border-purple-100 rounded-3xl shadow-xl p-8">
          {apiError && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`mt-2 w-full rounded-xl border px-4 py-3 outline-none transition
                ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-200 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition
                  ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
