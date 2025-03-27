"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { THEMES } from "./constants";

export default function ThemeSettings() {
  const [selectedTheme, setSelectedTheme] = useState("light");

  // Load saved theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (themeId) => {
    try {
      setSelectedTheme(themeId);
      localStorage.setItem("selectedTheme", themeId);
      document.documentElement.setAttribute("data-theme", themeId);
      toast.success("Tema başarıyla güncellendi!");
    } catch (error) {
      toast.error("Tema güncellenirken bir hata oluştu!");
      console.error("Tema güncellenirken hata:", error);
    }
  };

  return (
    <div className="theme-card rounded-lg shadow-md p-4 sm:p-6 max-w-2xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        Tema Ayarları
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 sm:p-6 rounded-lg border-2 transition-all card-hover ${
                selectedTheme === theme.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                      theme.id === "colored"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        theme.id === "colored" ? "text-white" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base line-clamp-1">
                      {theme.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                      {theme.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {Object.values(theme.colors).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          * Seçilen tema tüm uygulamanın görünümünü değiştirecektir.
        </p>
      </div>
    </div>
  );
}
