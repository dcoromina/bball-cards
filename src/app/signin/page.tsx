"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Flag to check if we're on the client-side
  const router = useRouter();

  useEffect(() => {
    // Ensure we only access the router on the client-side
    setIsClient(true);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Sign-in successful!");
    setErrorMessage("");

    // Redirect to a new page after sign-in (only if we are on the client-side)
    if (isClient) {
      router.push("/");
    }
  };

  if (!isClient) {
    return null; // Prevent rendering while the component is mounted on the server side
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sign In
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

        <form onSubmit={handleSignIn} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md"
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
