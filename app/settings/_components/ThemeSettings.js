"use client";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { THEMES } from "./constants";
import { useTheme } from "@/app/providers";

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [isLoading, setIsLoading] = useState(false);

  // Global tema değiştiğinde local state'i güncelle
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleThemeChange = useCallback(
    (themeId) => {
      if (themeId === selectedTheme || isLoading) return;

      setIsLoading(true);
      try {
        setSelectedTheme(themeId);
        setTheme(themeId);

        // Bir mikrosaniye sonra localStorage işlemini yap (debounce)
        setTimeout(() => {
          localStorage.setItem("selectedTheme", themeId);
        }, 0);

        // Dark mode için HTML elementine dark class'ı ekle
        if (themeId === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        toast.success("Tema başarıyla güncellendi!");
      } catch (error) {
        toast.error("Tema güncellenirken bir hata oluştu!");
        console.error("Tema güncellenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedTheme, setTheme, isLoading]
  );

  return (
    <div className="card p-4 sm:p-6 max-w-2xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        Tema Ayarları
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 sm:p-6 rounded-lg border-2 card-hover ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400"
                  : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-400"
              }`}
              disabled={isLoading}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-slate-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base line-clamp-1">
                      {theme.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          * Tema tercihi tarayıcınızda saklanır ve bir sonraki girişinizde
          hatırlanır.
        </p>
      </div>
    </div>
  );
}
