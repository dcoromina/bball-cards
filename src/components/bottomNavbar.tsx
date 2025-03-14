"use client";
import React, { useState, useEffect } from "react";
import {
  GalleryHorizontalEndIcon,
  Home,
  Star,
  User,
  Package,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const FloatingNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      name: "home",
      path: "/",
      icon: Home,
      label: "Home",
    },
    {
      name: "cards",
      path: "/cards",
      icon: GalleryHorizontalEndIcon,
      label: "Cards",
    },
    {
      name: "packs",
      path: "/grid",
      icon: Package,
      label: "Packs",
    },
  ];

  const getActiveTab = () => {
    if (pathname === "/") return "home";
    if (pathname.includes("/cards")) return "cards";
    if (pathname.includes("/grid")) return "packs";
    return "home";
  };

  const activeTab = getActiveTab();

  const handleNavigation = (route) => {
    router.push(route.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-50">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex p-1.5 border border-gray-700"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {routes.map((route) => {
          const isActive = activeTab === route.name;
          const Icon = route.icon;

          return (
            <motion.button
              key={route.name}
              onClick={() => handleNavigation(route)}
              className={`relative px-5 py-2 text-sm rounded-xl flex items-center gap-2 transition-all duration-300
                ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-90"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon size={18} className={isActive ? "text-white" : ""} />
              </span>
              <span className="relative z-10 font-medium">{route.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FloatingNavBar;
