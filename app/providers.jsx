"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";

// Tema için context oluştur
export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ThemeProvider bileşeni
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Server-side rendering için varsayılan değer
    return "light";
  });

  // Sayfa yüklendiğinde localStorage'dan tema bilgisini al
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("selectedTheme");
      if (savedTheme) {
        setTheme(savedTheme);
        // Dark mode için HTML elementine dark class'ı ekle
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch (error) {
      console.error("Tema bilgisi alınamadı:", error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000, // 10 saniye
            refetchOnWindowFocus: true, // Sekme aktif olduğunda yenile
            retry: 1, // Başarısız sorguları sadece 1 kez yeniden dene
            refetchOnReconnect: true, // Bağlantı tekrar kurulduğunda yeniden veri çek
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#059669",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#DC2626",
                secondary: "#fff",
              },
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
