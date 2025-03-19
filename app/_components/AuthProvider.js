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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Korumalı rota kontrolü
  const isProtectedRoute = pathname !== "/" && !pathname.startsWith("/auth");
  const isHomePage = pathname === "/";

  // Yetkilendirme kontrolü ve yönlendirme fonksiyonu
  const handleAuthCheck = (session, isAuthChange = false) => {
    // Kullanıcı giriş yapmamış ve korumalı sayfaya erişmeye çalışıyorsa
    if (!session?.user && isProtectedRoute) {
      if (!isAuthChange) {
        toast.error("Lütfen önce giriş yapın", {
          duration: 3000,
          position: "top-center",
          icon: "🔒",
        });
      }
      router.push("/");
      return;
    }

    // Kullanıcı giriş yapmış ve ana sayfada ise dashboard'a yönlendir
    if (session?.user && isHomePage) {
      router.push("/dashboard");
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
      setIsInitialLoad(false);
    };

    getSession();

    // Auth durumu değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      // Auth değişiminde toast göstermemek için true flag'i gönder
      handleAuthCheck(session, true);
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
