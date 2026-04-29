"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/src/lib/storage";
import SplashScreen from "../components/shared/SplashScreen";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getSession();
      router.replace(session ? "/dashboard" : "/login");
    }, 1000);
    return () => clearTimeout(timer);

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () =>
        navigator.serviceWorker.register("/sw.js"),
      );
    }
  }, [router]);

  return <SplashScreen />;
}
