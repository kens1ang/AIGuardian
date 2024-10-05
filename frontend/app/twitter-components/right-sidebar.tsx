import React, { useState, useEffect } from "react";
import { SearchBar } from "./ui/search-bar";
import { RightFooter } from "./ui/right-footer";
import { SuggestWidget } from "./ui/suggest-widget";
import { TrendingWidget } from "./ui/trending-widget";

const RightSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Set the initial visibility
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="w-96 bg-black text-white p-4 h-screen flex flex-col gap-4 border-l border-zinc-500 sticky top-0">
      <SearchBar />
      <TrendingWidget />
      <SuggestWidget />
      <RightFooter />
    </aside>
  );
};

export default RightSidebar;
