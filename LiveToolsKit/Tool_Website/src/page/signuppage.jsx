"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setApiError("");
    try {
      await axios.post("http://localhost:5000/api/auth/signup", data);
      navigate("/loginpage");
    } catch (err) {
      setApiError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-6 py-16">
      {/* background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Sign up</h1>
          <p className="text-gray-600 mt-2">
            Create your account in just a minute
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-purple-100 rounded-3xl shadow-xl p-8">
          {apiError && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className={`mt-2 w-full rounded-xl border px-4 py-3 outline-none transition
                  ${
                    errors.name
                      ? "border-red-400"
                      : "border-gray-200 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                  }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be less than 50 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                    message: "Enter a valid email address",
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
                  placeholder="Create password"
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
                    maxLength: {
                      value: 64,
                      message: "Password must be less than 64 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={show ? "Hide password" : "Show password"}
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

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  type={show2 ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition
                    ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                    }`}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShow2((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={show2 ? "Hide password" : "Show password"}
                >
                  {show2 ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
