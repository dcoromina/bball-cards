import { NextResponse, NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data } = await supabase.auth.getSession();

  const session = data.session;
  const url = req.nextUrl.clone();

  // Define public routes (accessible without login)
  const publicRoutes = ["/signin", "/signup", "/api", "/public"];

  // Check if the path matches a public route
  const isPublicRoute = publicRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (!session?.user && !isPublicRoute) {
    // Redirect unauthorized users to the signin page
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return res;
}
