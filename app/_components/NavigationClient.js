"use client";

import React from "react";
import Link from "next/link";
import {
  FiBell,
  FiMessageSquare,
  FiHelpCircle,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import { useNotificationsCount } from "@/app/_hooks/useNotifications";

export default function NavigationClient() {
  const router = useRouter();
  const { data: notificationCount = 0 } = useNotificationsCount();

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
                // Supabase ile çıkış yap
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

  return (
    <nav className="flex justify-end">
      <ul className="flex items-center gap-4">
        <li>
          <Link
            href="/notifications"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiBell className="w-5 h-5" />
            <span>Bildirimler</span>
            {notificationCount > 0 && (
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full ml-1">
                {notificationCount}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/messages"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiMessageSquare className="w-5 h-5" />
            <span>Mesajlar</span>
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiHelpCircle className="w-5 h-5" />
            <span>Yardım</span>
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiUser className="w-5 h-5" />
            <span>Profil</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiLogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Çıkış Yap</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
