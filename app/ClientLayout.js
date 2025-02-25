"use client";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import LeftMenu from "./_components/LeftMenu";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // localStorage'dan tema ayarını al
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <div
      className="antialiased h-screen flex flex-col theme-transition"
      data-theme={theme}
    >
      <Providers>
        <Header />
        <div className="flex-1 px-8 py-12 grid grid-cols-4 gap-8 overflow-hidden theme-bg">
          <div className="col-span-1 theme-card rounded-lg p-4 border-r">
            <LeftMenu />
          </div>
          <div className="col-span-3">
            <main className="max-w-7xl mx-auto pr-4 h-[calc(100vh-136px)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </Providers>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}
