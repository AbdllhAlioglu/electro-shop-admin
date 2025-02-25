"use client";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiSun, FiMoon, FiLayout, FiDroplet } from "react-icons/fi";

const CURRENCIES = [
  { code: "TRY", symbol: "₺", name: "Türk Lirası" },
  { code: "USD", symbol: "$", name: "Amerikan Doları" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "İngiliz Sterlini" },
];

const THEMES = [
  {
    id: "light",
    name: "Açık Tema",
    icon: FiSun,
    description: "Klasik, temiz ve profesyonel görünüm",
    colors: {
      primary: "#f8fafc",
      secondary: "#1e293b",
      accent: "#3b82f6",
    },
  },
  {
    id: "colored",
    name: "Renkli Tema",
    icon: FiDroplet,
    description: "Modern ve canlı gradyan tasarım",
    colors: {
      primary: "#4f46e5",
      secondary: "#7c3aed",
      accent: "#6366f1",
    },
  },
];

const FONT_SIZES = [
  {
    id: "normal",
    name: "Normal",
    scale: "1",
    description: "Varsayılan yazı boyutu",
  },
  {
    id: "large",
    name: "Büyük",
    scale: "1.1",
    description: "Daha büyük yazı boyutu",
  },
  {
    id: "larger",
    name: "Çok Büyük",
    scale: "1.2",
    description: "En büyük yazı boyutu",
  },
];

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [selectedCurrency, setSelectedCurrency] = useState("TRY");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFontSize, setSelectedFontSize] = useState("normal");

  // Sayfa yüklendiğinde localStorage'dan değerleri al
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    const savedTheme = localStorage.getItem("selectedTheme");
    const savedFontSize = localStorage.getItem("selectedFontSize");

    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
      queryClient.setQueryData(["settings", "currency"], savedCurrency);
    }

    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      queryClient.setQueryData(["settings", "theme"], savedTheme);
    }

    if (savedFontSize) {
      setSelectedFontSize(savedFontSize);
      document.documentElement.style.fontSize = `${
        FONT_SIZES.find((f) => f.id === savedFontSize)?.scale
      }rem`;
      queryClient.setQueryData(["settings", "fontSize"], savedFontSize);
    }
  }, [queryClient]);

  const handleCurrencyChange = async (currency) => {
    try {
      setSelectedCurrency(currency);
      // localStorage'a kaydet
      localStorage.setItem("selectedCurrency", currency);
      // Global state'i güncelle
      queryClient.setQueryData(["settings", "currency"], currency);
      toast.success("Para birimi başarıyla güncellendi!");
    } catch (error) {
      toast.error("Para birimi güncellenirken bir hata oluştu!");
      console.error("Para birimi güncellenirken hata:", error);
    }
  };

  const handleThemeChange = (themeId) => {
    try {
      setSelectedTheme(themeId);
      // localStorage'a kaydet
      localStorage.setItem("selectedTheme", themeId);
      // Global state ve DOM'u güncelle
      queryClient.setQueryData(["settings", "theme"], themeId);
      document.documentElement.setAttribute("data-theme", themeId);
      toast.success("Tema başarıyla güncellendi!");
    } catch (error) {
      toast.error("Tema güncellenirken bir hata oluştu!");
      console.error("Tema güncellenirken hata:", error);
    }
  };

  const handleFontSizeChange = (fontSizeId) => {
    try {
      setSelectedFontSize(fontSizeId);
      // localStorage'a kaydet
      localStorage.setItem("selectedFontSize", fontSizeId);
      // Global state ve DOM'u güncelle
      queryClient.setQueryData(["settings", "fontSize"], fontSizeId);
      const fontSize = FONT_SIZES.find((f) => f.id === fontSizeId)?.scale;
      document.documentElement.style.fontSize = `${fontSize}rem`;
      toast.success("Yazı boyutu başarıyla güncellendi!");
    } catch (error) {
      toast.error("Yazı boyutu güncellenirken bir hata oluştu!");
      console.error("Yazı boyutu güncellenirken hata:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>

      {/* Para Birimi Ayarları */}
      <div className="theme-card rounded-lg shadow-md p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Para Birimi Ayarları</h2>
        <div className="grid grid-cols-2 gap-4">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCurrency === currency.code
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currency.name}</p>
                  <p className="text-sm text-gray-500">{currency.code}</p>
                </div>
                <span className="text-2xl">{currency.symbol}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            * Seçilen para birimi tüm ürün fiyatlarının gösterimini
            etkileyecektir. Fiyatlar güncel döviz kuruna göre otomatik olarak
            dönüştürülecektir.
          </p>
        </div>
      </div>

      {/* Tema Ayarları */}
      <div className="theme-card rounded-lg shadow-md p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Tema Ayarları</h2>
        <div className="grid grid-cols-2 gap-4">
          {THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-6 rounded-lg border-2 transition-all card-hover ${
                  selectedTheme === theme.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        theme.id === "colored"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          theme.id === "colored"
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-sm text-gray-500">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {Object.values(theme.colors).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            * Seçilen tema tüm uygulamanın görünümünü değiştirecektir.
          </p>
        </div>
      </div>

      {/* Yazı Boyutu Ayarları */}
      <div className="theme-card rounded-lg shadow-md p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Yazı Boyutu Ayarları</h2>
        <div className="grid grid-cols-3 gap-4">
          {FONT_SIZES.map((fontSize) => (
            <button
              key={fontSize.id}
              onClick={() => handleFontSizeChange(fontSize.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFontSize === fontSize.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col gap-2">
                <p className="font-medium">{fontSize.name}</p>
                <p className="text-sm text-gray-500">{fontSize.description}</p>
                <div className="mt-2">
                  <span style={{ fontSize: `${fontSize.scale}rem` }}>Aa</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            * Seçilen yazı boyutu tüm uygulamadaki metinleri etkileyecektir.
          </p>
        </div>
      </div>
    </div>
  );
}
