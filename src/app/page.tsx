"use client";

import MainInfo from "@/components/mainInfo";
import TestCard from "@/components/test";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        router.push("/signin");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 mb-2">
              TopStack
            </h1>
            <p className="text-indigo-200 text-sm font-medium">
              Premium Digital Card Collection
            </p>
          </motion.div>

          {/* Loading Animation */}
          <div className="glass rounded-2xl p-8 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </div>

            <motion.p
              className="text-white/80 text-sm font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading your collection...
            </motion.p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MainInfo />
      <TestCard />
    </motion.div>
  );
}
