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
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import { useNotificationsCount } from "@/app/_hooks/useNotifications";
import LeftMenu from "./LeftMenu";

export default function NavigationClient() {
  const router = useRouter();
  const { data: notificationCount = 0 } = useNotificationsCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("nav"); // 'nav' veya 'menu'

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
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                toast.success("Başarıyla çıkış yapıldı");
                router.push("/");
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
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-100 transition-colors">
            <FiBell className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </div>
          <span className="text-sm md:text-base font-medium">Bildirimler</span>
          {notificationCount > 0 && (
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {notificationCount}
            </span>
          )}
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          href="/messages"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-100 transition-colors">
            <FiMessageSquare className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </div>
          <span className="text-sm md:text-base font-medium">Mesajlar</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          href="/help"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-100 transition-colors">
            <FiHelpCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </div>
          <span className="text-sm md:text-base font-medium">Yardım</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          href="/profile"
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-100 transition-colors">
            <FiUser className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </div>
          <span className="text-sm md:text-base font-medium">Profil</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <button
          onClick={() => {
            setIsMenuOpen(false);
            handleLogout();
          }}
          className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out w-full"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-100 transition-colors">
            <FiLogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-red-600" />
          </div>
          <span className="text-sm md:text-base font-medium text-red-600">
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
        className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        {isMenuOpen ? (
          <FiX className="w-6 h-6 text-gray-700" />
        ) : (
          <FiMenu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`${
          isMenuOpen
            ? "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden"
            : "hidden"
        }`}
        onClick={handleContentClick}
      >
        {/* Mobile menu panel - bottom drawer */}
        <div
          className={`fixed inset-x-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out rounded-t-2xl ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          } md:relative md:translate-y-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            {/* Drawer handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

            {/* Tab buttons */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "nav"
                    ? "bg-primary-50 text-primary-700"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("nav")}
              >
                Navigasyon
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "menu"
                    ? "bg-primary-50 text-primary-700"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("menu")}
              >
                Menü
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
