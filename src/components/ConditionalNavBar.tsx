"use client";

import FloatingNavBar from "@/components/bottomNavbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export const ConditionalNavBar = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  // Don't show navbar on auth pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  if (isLoading || !user || isAuthPage) {
    return null;
  }

  return <FloatingNavBar />;
};
