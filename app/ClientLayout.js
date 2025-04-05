"use client";
import { useEffect, useState } from "react";
import LeftMenu from "./_components/LeftMenu";

export default function ClientLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // localStorage'dan tema ayarını al
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Menüyü kapatmak için click handler
  const handleContentClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div
      className="flex-1 theme-transition h-screen overflow-hidden"
      data-theme={theme}
    >
      <div className="flex-1 px-2 sm:px-4 md:px-6 py-4 md:py-8 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 h-full overflow-hidden bg-gray-50">
        {/* Sol menü - Mobil için bottom drawer */}
        <div
          className={`${
            isMobileMenuOpen
              ? "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden"
              : "hidden"
          }`}
          onClick={handleContentClick}
        >
          <div
            className={`fixed inset-x-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out rounded-t-2xl ${
              isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
            } md:relative md:translate-y-0`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Drawer handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <div className="space-y-6">
                <LeftMenu onItemClick={handleContentClick} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sol Menü */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2 bg-white shadow-md rounded-lg overflow-y-auto h-full">
          <div className="p-4">
            <LeftMenu />
          </div>
        </div>

        {/* Ana içerik */}
        <div
          className="md:col-span-9 lg:col-span-10 h-full flex flex-col overflow-y-auto"
          onClick={handleContentClick}
        >
          <main className="w-full mx-auto flex-1 overflow-y-auto rounded-lg bg-white shadow-md p-3 sm:p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
