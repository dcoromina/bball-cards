"use client";
import React, { useState, useRef, useEffect } from "react";
import { GalleryHorizontalEndIcon, Home, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const FloatingNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname === "/" ? "home" : "profile";

  const homeRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const [activeStyles, setActiveStyles] = useState({
    width: "0px",
    transform: "translateX(0)",
  });

  useEffect(() => {
    const activeButton =
      activeTab === "home" ? homeRef.current : profileRef.current;
    if (activeButton && homeRef.current) {
      setActiveStyles({
        width: `${activeButton.offsetWidth}px`,
        transform: `translateX(${
          activeTab === "home" ? 0 : homeRef.current.offsetWidth
        }px)`,
      });
    }
  }, [activeTab]);

  const handleNavigation = (route: "home" | "profile") => {
    if (route === "home") {
      router.push("/");
    } else {
      router.push("/cards");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-2">
      <div className="bg-black rounded-full shadow-lg flex p-2 mx-2 mb-2 relative border-[1px] border-opacity-10">
        <div
          className="absolute h-7 bg-gray-800 rounded-full transition-all duration-300 ease-in-out"
          style={activeStyles}
        />

        <button
          ref={homeRef}
          onClick={() => handleNavigation("home")}
          className={`px-3 py-1 text-sm text-white rounded-full flex items-center gap-1 transition-all duration-300 z-10
            ${activeTab === "home" ? "scale-110" : "scale-90 opacity-70"}`}
        >
          <Home size={16} />
          Home
        </button>
        <button
          ref={profileRef}
          onClick={() => handleNavigation("profile")}
          className={`px-3 py-1 text-sm text-white rounded-full flex items-center gap-1 transition-all duration-300 z-10
            ${activeTab === "profile" ? "scale-110" : "scale-90 opacity-70"}`}
        >
          <GalleryHorizontalEndIcon size={16} />
          Cards
        </button>
      </div>
    </div>
  );
};

export default FloatingNavBar;
