"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Public routes that don't require authentication
    const publicRoutes = ["/login"];
    
    if (publicRoutes.includes(pathname)) {
      // If already authenticated and on login page, redirect to home
      if (isAuthenticated()) {
        router.push("/");
      }
      return;
    }

    // Protected routes - require authentication
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
