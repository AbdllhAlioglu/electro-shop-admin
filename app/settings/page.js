import React from "react";
import CurrencySettings from "./_components/CurrencySettings";
import ThemeSettings from "./_components/ThemeSettings";
import FontSizeSettings from "./_components/FontSizeSettings";
import SettingsProvider from "./_components/SettingsProvider";

export const metadata = {
  title: "Ayarlar | Electro Shop Admin",
  description: "Uygulama ayarlarını yönetin",
};

export default function SettingsPage() {
  return (
    <>
      <SettingsProvider />

      <div className="container mx-auto p-6 space-y-6 animate-fade-in-left">
        <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>

        {/* Para Birimi Ayarları */}
        <CurrencySettings />

        {/* Tema Ayarları */}
        <ThemeSettings />

        {/* Yazı Boyutu Ayarları */}
        <FontSizeSettings />
      </div>
    </>
  );
}
