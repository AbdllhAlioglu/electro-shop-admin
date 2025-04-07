import React from "react";
import Link from "next/link";
import {
  FiHome,
  FiBox,
  FiList,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

export default function LeftMenu({ onItemClick }) {
  const menuItems = [
    { href: "/dashboard", icon: FiHome, text: "Ana Sayfa" },
    { href: "/products", icon: FiBox, text: "Ürünler" },
    { href: "/categories", icon: FiList, text: "Kategoriler" },
    { href: "/orders", icon: FiShoppingCart, text: "Siparişler" },
    { href: "/customers", icon: FiUsers, text: "Müşteriler" },
    { href: "/statistics", icon: FiBarChart2, text: "İstatistikler" },
    { href: "/settings", icon: FiSettings, text: "Ayarlar" },
  ];

  return (
    <nav className="flex flex-col gap-1 md:gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-gray-700 dark:text-slate-100 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-blue-400"
            onClick={() => {
              if (onItemClick) onItemClick();
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:bg-primary-100 dark:group-hover:bg-gray-600">
              <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 dark:text-slate-300" />
            </div>
            <span className="text-sm md:text-base font-medium truncate">
              {item.text}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
