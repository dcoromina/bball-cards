"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Sign-in successful!");

      setTimeout(() => {
        if (isClient) {
          router.push("/");
        }
      }, 800);
    } catch (err) {
      console.error("Sign-in error:", err);
      setErrorMessage("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* TopStack Branding */}
        <motion.div
          className="text-center mb-10"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-championship-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 mb-3">
            TopStack
          </h1>
          <p className="text-indigo-200 text-lg font-medium">
            Premium Digital Card Collection
          </p>
          <p className="text-indigo-300/70 text-sm mt-2">
            Collect, trade, and showcase your favorite NBA legends
          </p>
        </motion.div>

        {/* Sign In Card */}
        <motion.div
          className="glass rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-8 text-white text-center">
            Welcome Back
          </h2>

          {errorMessage && (
            <motion.div
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 mb-6 rounded-xl text-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMessage}
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 mb-6 rounded-xl text-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {successMessage}
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm text-indigo-200 block mb-3 font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full"
                  placeholder="your@email.com"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm text-indigo-200 block mb-3 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-slate-700/50"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-indigo-200"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                className={`w-full flex justify-center items-center space-x-2 py-4 px-6 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 ${
                  isLoading
                    ? "bg-indigo-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 hover:shadow-glow"
                } text-white`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in to TopStack</span>
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-indigo-200">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
