"use client";
import { useEffect, useState } from "react";
import LeftMenu from "./_components/LeftMenu";

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
    <div className="flex-1 theme-transition" data-theme={theme}>
      <div className="flex-1 px-6 py-8 grid grid-cols-4 gap-8 overflow-hidden bg-gray-50">
        <div className="col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <LeftMenu />
          </div>
        </div>
        <div className="col-span-3">
          <main className="max-w-7xl mx-auto pr-4 h-[calc(100vh-120px)] overflow-y-auto rounded-lg bg-white shadow-md p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
