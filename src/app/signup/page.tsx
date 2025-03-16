"use client";

import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage(
        "Sign-up successful! Please check your email for a confirmation link."
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sign Up
        </h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Confirm Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-green-500 hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
