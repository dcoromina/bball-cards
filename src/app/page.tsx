"use client";
import Image from "next/image";
import CardGrid from "./grid/cardGrid";
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
    return <div>Loading...</div>;
  }

  return <TestCard />;
}
