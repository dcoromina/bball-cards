"use client";
import Image from "next/image";
import CardGrid from "./grid/page";
import LeagueNav from "./leagueNav";
import CardPacks from "@/components/cardPacks";
import MainInfo from "@/components/mainInfo";
import TestCard from "@/components/test";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession(); // Fetch session
      if (!data?.session?.user) {
        router.push("/signin"); // Redirect if not logged in
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-700">
        <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh">
      <MainInfo />
      <TestCard />
    </div>
  );
}
