import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "../app/supabaseClient"; // Adjust path as necessary

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getSession(); // Fetch session
        if (data?.session?.user) {
          setUser(data.session.user as unknown as Record<string, unknown>);
        } else {
          router.push("/signin"); // Redirect if no session
        }
        setIsLoading(false);
      };

      checkUser();
    }, [router]);

    if (isLoading) {
      return <div className="loading loading-spinner loading-lg"></div>;
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
