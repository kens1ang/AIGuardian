"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the useRouter for navigation

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const { data: session } = useSession(); // Access session data
  const router = useRouter(); // Initialize Next.js router

  // Handle Worldcoin login and store worldId in sessionStorage
  const handleLogin = async () => {
    try {
      const res = await signIn("worldcoin", {
        redirect: false,
        callbackUrl: "http://localhost:3000/demo",
      });

      if (res?.error) {
        setError(res.error);
      } else {
        // Fetch the session to get the user details (e.g., World ID)
        const session = await fetch("/api/auth/session").then((res) =>
          res.json()
        );

        // Store World ID in sessionStorage (from the session user data)
        if (session?.user?.id) {
          sessionStorage.setItem("worldId", session.user.id);
          router.push("/demo"); // Redirect to /demo after login
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // Automatically redirect to /demo if worldId is in sessionStorage
  useEffect(() => {
    const worldId = sessionStorage.getItem("worldId");
    if (worldId) {
      router.push("/demo"); // Navigate to /demo if worldId exists
    } else {
      setLoading(false); // Set loading state to false
    }
  }, [router]); // Trigger on router changes

  // Only render login page if not loading (i.e., no worldId found)
  if (loading) {
    return null; // This prevents the login page from rendering if still checking
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl px-8">
        {/* Left side: Logo */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/assets/twitter-clone-logo.avif"
            alt="Tweeter Clone Logo"
            width={700}
            height={700}
            className="max-w-full"
          />
        </div>

        {/* Right side: Login form */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h1 className="text-center text-7xl font-extrabold mb-8 font-neue-machina" >
            Happening now
          </h1>
          <p className="text-4xl font-bold mb-12 font-neue-machina font-light">
            Join today.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            className="relative bg-white font-bold py-2 px-4 rounded-full w-72 overflow-hidden group"
          >
            <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 text-transparent bg-clip-text font-neue-machina font-bold group-hover:text-white transition-colors duration-500">
              Sign Up with WorldCoin
            </span>

            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 transition-transform duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
          </button>
        </div>
      </div>
      <footer className="text-center text-white py-8">
        <div className="font-neue-machina font-light">
          <p>
            AIGuardian for{" "}
            <a
              href="https://www.2024.ethkl.org/"
              target="_blank"
              className="text-orange-300 hover:underline"
            >
              ETHKL2024
            </a>
          </p>
          <p>© 2024 AIGuardian</p>
        </div>
      </footer>
    </div>
  );
}
