"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { supabase } from "@/app/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = useMemo(() => ["/signin", "/signup"], []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data?.session?.user) {
          setUser(data.session.user);
        } else if (!publicRoutes.includes(pathname)) {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          if (!publicRoutes.includes(pathname)) {
            router.push("/signin");
          }
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [pathname, router, publicRoutes]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
