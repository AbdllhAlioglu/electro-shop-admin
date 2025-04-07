"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiBell,
  FiMessageSquare,
  FiHelpCircle,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import { useNotificationsCount } from "@/app/_hooks/useNotifications";
import { useTheme } from "@/app/providers";
import LeftMenu from "./LeftMenu";

export default function NavigationClient() {
  const router = useRouter();
  const { data: notificationCount = 0 } = useNotificationsCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("nav"); // 'nav' veya 'menu'
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Menüyü kapatmak için click handler
  const handleContentClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>Çıkış yapmak istediğinizden emin misiniz?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            İptal
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            onClick={async () => {
              try {
                toast.dismiss(t.id);

                // Session önbelleğini temizle
                localStorage.removeItem("supabase.auth.token");

                // SignOut işlemini dene, hata olursa da devam et
                try {
                  await supabase.auth.signOut();
                } catch (signOutError) {
                  console.warn(
                    "SignOut sırasında hata oluştu, sayfaya yine de yönlendiriliyor:",
                    signOutError
                  );
                }

                // Başarı mesajı göster
                toast.success("Başarıyla çıkış yapıldı");

                // Ana sayfaya yönlendir
                setTimeout(() => {
                  router.push("/");
                  router.refresh();
                }, 500);
              } catch (error) {
                toast.error("Çıkış yapılırken bir hata oluştu");
                console.error("Çıkış hatası:", error);
              }
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    ));
  };

  const navItems = (
    <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
      <li className="w-full md:w-auto">
        <Link
          href="/notifications"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            <FiBell className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-gray-700 dark:text-slate-100" />
          </div>
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-slate-100">
            Bildirimler
          </span>
          {notificationCount > 0 && (
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
              {notificationCount}
            </span>
          )}
        </Link>
      </li>

      <li className="w-full md:w-auto">
        <Link
          href="/messages"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            <FiMessageSquare className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-gray-700 dark:text-slate-100" />
          </div>
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-slate-100">
            Mesajlar
          </span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          href="/help"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            <FiHelpCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-gray-700 dark:text-slate-100" />
          </div>
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-slate-100">
            Yardım
          </span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          href="/profile"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            <FiUser className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-gray-700 dark:text-slate-100" />
          </div>
          <span className="text-sm md:text-base font-medium text-gray-700 dark:text-slate-100">
            Profil
          </span>
        </Link>
      </li>
      {/* Tema toggle butonu */}
      <li className="w-full md:w-auto">
        <button
          onClick={() => {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            // Tema değişikliğinin etkisini hemen görmek için doğrudan DOM'u da değiştirelim
            if (newTheme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }}
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
          aria-label={theme === "dark" ? "Açık Mod'a geç" : "Koyu Mod'a geç"}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            {theme === "dark" ? (
              <FiSun className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-yellow-500" />
            ) : (
              <FiMoon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-blue-500" />
            )}
          </div>
        </button>
      </li>
      <li className="w-full md:w-auto">
        <button
          onClick={() => {
            setIsMenuOpen(false);
            handleLogout();
          }}
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 w-full"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-100 dark:bg-gray-800">
            <FiLogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-red-600 dark:text-red-500" />
          </div>
          <span className="text-sm md:text-base font-medium text-red-600 dark:text-red-500">
            Çıkış Yap
          </span>
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="relative flex justify-end">
      {/* Hamburger menu button */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        {isMenuOpen ? (
          <FiX className="w-6 h-6 text-gray-700 dark:text-slate-100" />
        ) : (
          <FiMenu className="w-6 h-6 text-gray-700 dark:text-slate-100" />
        )}
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`${
          isMenuOpen
            ? "fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            : "hidden"
        }`}
        onClick={handleContentClick}
      >
        {/* Mobile menu panel - bottom drawer */}
        <div
          className={`fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 transform rounded-t-2xl ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          } md:relative md:translate-y-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            {/* Drawer handle */}
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />

            {/* Tab buttons */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  activeTab === "nav"
                    ? "bg-primary-50 text-primary-700 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("nav")}
              >
                Hızlı Erişim
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  activeTab === "menu"
                    ? "bg-primary-50 text-primary-700 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("menu")}
              >
                Sayfalar
              </button>
            </div>

            {/* Tab content */}
            <div className="space-y-4">
              {activeTab === "nav" ? (
                navItems
              ) : (
                <LeftMenu onItemClick={handleContentClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:block">{navItems}</div>
    </nav>
  );
}
