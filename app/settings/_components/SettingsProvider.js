"use client";
import { useEffect } from "react";
import { FONT_SIZES } from "./constants";

// Bu bileşen, tema ve font boyutu gibi ayarları sayfa yüklendiğinde uygular
export default function SettingsProvider() {
  useEffect(() => {
    // Tema ayarını al ve uygula
    const savedTheme = localStorage.getItem("selectedTheme");
    const savedFontSize = localStorage.getItem("selectedFontSize");

    // Dark mode için
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Font boyutu için
    if (savedFontSize) {
      const fontSize = FONT_SIZES.find((f) => f.id === savedFontSize)?.scale;
      if (fontSize) {
        document.documentElement.style.fontSize = `${fontSize}rem`;
      }
    }
  }, []);

  // Bu bileşen hiçbir şey render etmiyor
  return null;
}
