"use client";
import { useEffect } from "react";
import { FONT_SIZES } from "./constants";

// This component is responsible for initializing settings on the client side
// without affecting the UI directly
export default function SettingsProvider() {
  useEffect(() => {
    // Initialize settings from localStorage
    const savedTheme = localStorage.getItem("selectedTheme");
    const savedFontSize = localStorage.getItem("selectedFontSize");

    // Apply theme
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    // Apply font size
    if (savedFontSize) {
      const fontSize = FONT_SIZES.find((f) => f.id === savedFontSize)?.scale;
      if (fontSize) {
        document.documentElement.style.fontSize = `${fontSize}rem`;
      }
    }
  }, []);

  // This component doesn't render anything
  return null;
}
