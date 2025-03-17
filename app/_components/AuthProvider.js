"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Korumalı rota kontrolü
  const isProtectedRoute = pathname !== "/" && !pathname.startsWith("/auth");

  // Yetkilendirme kontrolü ve yönlendirme fonksiyonu
  const handleAuthCheck = (session) => {
    if (!session?.user && isProtectedRoute) {
      toast.error("Lütfen önce giriş yapın", {
        duration: 4000,
        position: "top-right",
      });
      router.push("/");
    }
  };

  useEffect(() => {
    // Supabase'den mevcut oturumu al
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      handleAuthCheck(session);
      setLoading(false);
    };

    getSession();

    // Auth durumu değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      handleAuthCheck(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  const value = {
    user,
    loading,
  };

  // Sayfa yüklenirken loading göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
