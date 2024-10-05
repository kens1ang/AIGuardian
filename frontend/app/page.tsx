"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/landing-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/landing-components/ui/dialog"; // Import Dialog components
import AIEngineSection from "@/app/landing-components/AIEngineSection";
import MonitoringSection from "@/app/landing-components/MonitoringSection";
import ActionSteps from "@/app/landing-components/ActionSteps";
import TechStacks from "@/app/landing-components/TechStacks";
import { ethers } from "ethers"; // Correct import for ethers
import { useRouter } from "next/navigation"; // Next.js navigation

const LandingPage = () => {
  const [address, setAddress] = useState<string | null>(null); // State to store connected wallet address
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [isCheckingConnection, setIsCheckingConnection] = useState(false); // State to check if connecting
  const router = useRouter(); // Next.js router for navigation

  // Function to handle MetaMask connection
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("Ethereum object found");

        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("No accounts found.");
        }

        // Create ethers provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();

        // Log the address and store it in localStorage
        console.log("Wallet address:", walletAddress);
        localStorage.setItem("walletAddress", walletAddress); // Store in localStorage
        localStorage.setItem("hasConnected", "true"); // Store the connect status
        setAddress(walletAddress); // Set state

        // Clear any previous errors
        setError(null);
      } catch (err) {
        setError("Failed to connect wallet");
        console.error("Error connecting to wallet:", err);
      }
    } else {
      // MetaMask not installed
      setIsDialogOpen(true);
      setError("MetaMask is not installed");
      console.log("MetaMask not found");
    }
  };

  // Function to check if MetaMask has connected accounts
  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts && accounts.length > 0;
    } else {
      return false;
    }
  };

  // Handle demo button click
  const handleDemoClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Stop the default anchor behavior immediately
    setIsCheckingConnection(true); // Set loading state
    const isConnected = await checkMetaMaskConnection();
    setIsCheckingConnection(false);

    // Check if the user clicked the "Connect" button by checking localStorage
    const hasConnected = localStorage.getItem("hasConnected");

    if (!isConnected || !hasConnected) {
      setIsDialogOpen(true); // Open the dialog prompting the user to connect MetaMask
    } else {
      router.push("/login"); // Navigate to the demo page if MetaMask is connected and the user clicked "Connect"
    }
  };

  // Automatically connect MetaMask if an account is connected but not displayed
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkMetaMaskConnection(); // Check MetaMask connection
      const savedAddress = localStorage.getItem("walletAddress");

      if (isConnected && !savedAddress) {
        // If MetaMask is connected but address is not stored, fetch and display it
        connectWallet();
      } else if (savedAddress && isConnected) {
        // If already stored in localStorage and connected
        setAddress(savedAddress);
      } else {
        // Remove wallet address if disconnected
        localStorage.removeItem("walletAddress");
        setAddress(null);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="px-4 py-6 border-b-2 border-dashed border-gray-400 sticky top-0 bg-black">
        <nav className="flex justify-between items-center max-w-[1700px] mx-auto">
          <h1 className="text-3xl font-light font-neue-machina">AIGuardian</h1>
          <div className="space-x-16 font-neue-machina font-light">
            <a href="#how" className="hover:text-gray-300">
              How it Works
            </a>
            <a
              href="/login"
              className="hover:text-gray-300"
              onClick={handleDemoClick}
            >
              Demo
            </a>
          </div>
          <div>
            <Button
              className="bg-orange-300 text-black hover:bg-orange-300 text-xl px-8 py-6 rounded-sm font-neue-machina"
              onClick={connectWallet} // Connect wallet when the button is clicked
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect"}
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Sections */}
        <section className="text-left py-24 max-w-[1700px] mx-auto sm:px-10 border-b-2 border-gray-400 border-dashed">
          <h2 className="text-9xl font-light mb-4 font-neue-machina leading-tight tracking-tight uppercase">
            un-deepfake you.
          </h2>
          <h2 className="text-9xl font-light mb-12 font-neue-machina leading-tight">
            <span className="bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 text-transparent bg-clip-text">
              AI GUARDIAN
            </span>
            <br />
            <span className="text-white">IS HERE.</span>
          </h2>
        </section>

        {/* Your main content */}
        <section className="py-20 max-w-5xl mx-auto">
          <TechStacks />
        </section>
        <section className="py-20 max-w-6xl mx-auto">
          <AIEngineSection />
        </section>
        <section className="py-20 max-w-7xl mx-auto">
          <MonitoringSection />
        </section>
        <section className="py-20 max-w-6xl mx-auto" id="how">
          <ActionSteps />
        </section>
      </main>

      <footer className="text-center py-8">
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

      {/* Dialog to alert user to install MetaMask */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>MetaMask Not Connected</DialogTitle>
            <DialogDescription>
              Please connect MetaMask to access the demo.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="bg-orange-300 text-black mt-4"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default LandingPage;