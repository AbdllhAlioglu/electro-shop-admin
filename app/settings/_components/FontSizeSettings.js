"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FONT_SIZES } from "./constants";

export default function FontSizeSettings() {
  const [selectedFontSize, setSelectedFontSize] = useState("normal");

  // Load saved font size from localStorage on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("selectedFontSize");
    if (savedFontSize) {
      setSelectedFontSize(savedFontSize);
      const fontSize = FONT_SIZES.find((f) => f.id === savedFontSize)?.scale;
      if (fontSize) {
        document.documentElement.style.fontSize = `${fontSize}rem`;
      }
    }
  }, []);

  const handleFontSizeChange = (fontSizeId) => {
    try {
      setSelectedFontSize(fontSizeId);
      localStorage.setItem("selectedFontSize", fontSizeId);
      const fontSize = FONT_SIZES.find((f) => f.id === fontSizeId)?.scale;
      document.documentElement.style.fontSize = `${fontSize}rem`;
      toast.success(`Yazı boyutu ${fontSize} olarak güncellendi!`);
    } catch (error) {
      toast.error("Yazı boyutu güncellenirken bir hata oluştu!");
      console.error("Yazı boyutu güncellenirken hata:", error);
    }
  };

  return (
    <div className="theme-card rounded-lg shadow-md p-4 sm:p-6 max-w-2xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        Yazı Boyutu Ayarları
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {FONT_SIZES.map((fontSize) => (
          <button
            key={fontSize.id}
            onClick={() => handleFontSizeChange(fontSize.id)}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
              selectedFontSize === fontSize.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <p className="font-medium text-sm sm:text-base line-clamp-1">
                {fontSize.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {fontSize.description}
              </p>
              <div
                className="mt-1 sm:mt-2 text-center"
                style={{ fontSize: `${fontSize.scale}rem` }}
              >
                Aa
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          * Seçilen yazı boyutu tüm uygulamadaki metinleri etkileyecektir.
        </p>
      </div>
    </div>
  );
}
