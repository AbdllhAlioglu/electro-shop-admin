"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CURRENCIES } from "./constants";

export default function CurrencySettings() {
  const [selectedCurrency, setSelectedCurrency] = useState("TRY");

  // Load saved currency from localStorage on component mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = async (currency) => {
    try {
      setSelectedCurrency(currency);
      localStorage.setItem("selectedCurrency", currency);
      toast.success(`Para birimi ${currency} olarak güncellendi!`);
    } catch (error) {
      toast.error("Para birimi güncellenirken bir hata oluştu!");
      console.error("Para birimi güncellenirken hata:", error);
    }
  };

  return (
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
  );
}
