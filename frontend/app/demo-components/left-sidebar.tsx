import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ExploreIcon,
  GithubIcon,
  HouseIcon,
  HowitWorksIcon,
  MoreIcon,
} from "./ui/heroicon";

export type NavLink = {
  href: string;
  linkName: string;
  icon?: JSX.Element;
};

const navLinks: Readonly<NavLink[]> = [
  {
    href: "/twitter",
    linkName: "Home",
    icon: <HouseIcon className="h-16 w-16" />,
  },
  {
    href: "/",
    linkName: "Explore",
    icon: <ExploreIcon className="h-16 w-16" />,
  },
  { href: "/", linkName: "GitHub", icon: <GithubIcon className="h-16 w-16" /> },
  {
    href: "/#how",
    linkName: "How It Works",
    icon: <HowitWorksIcon className="h-16 w-16" />,
  },
  { href: "/", linkName: "More", icon: <MoreIcon className="h-16 w-16" /> },
];

const LeftSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="w-96 bg-black text-white p-4 h-screen flex flex-col justify-between items-end border-r border-zinc-500 sticky top-0">
      <div className="flex flex-col justify-between items-start w-3/4">
        <div className="flex flex-col items-end">
          <h2 className="text-3xl font-light font-neue-machina mb-4">
            <span className="bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 text-transparent bg-clip-text">
              AIGuardian
            </span>
          </h2>

          <div className="flex flex-col gap-4 items-start">
            <nav>
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="flex gap-2 text-center text-xl font-bold text-slate-200 hover:bg-gray-700 p-2 rounded-3xl"
                >
                  {link.icon}
                  {link.linkName}
                </Link>
              ))}
            </nav>

            <button className="relative mt-6 bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 font-bold py-2 px-4 rounded-full w-full overflow-hidden group">
              <span className="relative z-10 text-white transition-colors duration-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-pink-300 group-hover:to-orange-300 group-hover:text-transparent group-hover:bg-clip-text">
                Post
              </span>

              <span className="absolute inset-0 bg-white transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0 z-0"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start mt-6 w-3/4">
        <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300">
          <img
            src="/assets/twitter-clone-logo.avif"
            alt="Profile"
            className="w-full h-full rounded-full bg-black p-1"
          />
        </div>
        <div className="ml-3">
          <p className="font-bold text-white">AI Guardian</p>
          <p className="text-sm text-gray-500">@0x2c50...6489</p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
