import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../app/supabaseClient"; // Adjust path as necessary

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getSession(); // Fetch session
        if (data?.session?.user) {
          setUser(data.session.user);
        } else {
          router.push("/signin"); // Redirect if no session
        }
        setIsLoading(false);
      };

      checkUser();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
