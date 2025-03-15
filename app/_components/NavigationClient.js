"use client";

import React from "react";
import Link from "next/link";
import {
  FiBell,
  FiMessageSquare,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

export default function NavigationClient({ notificationCount }) {
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
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full ml-1">
              {notificationCount}
            </span>
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
            href="/"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600"
          >
            <FiLogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Çıkış Yap</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
