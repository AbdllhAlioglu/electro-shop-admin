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

export default function LeftMenu() {
  return (
    <nav className="flex flex-col gap-4  ">
      <Link
        href="/dashboard"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiHome className="w-5 h-5" /> Ana Sayfa
      </Link>
      <Link
        href="/products"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiBox className="w-5 h-5" /> Ürünler
      </Link>
      <Link
        href="/categories"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiList className="w-5 h-5" /> Kategoriler
      </Link>
      <Link
        href="/orders"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiShoppingCart className="w-5 h-5" /> Siparişler
      </Link>
      <Link
        href="/customers"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiUsers className="w-5 h-5" /> Müşteriler
      </Link>

      <Link
        href="/statistics"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiBarChart2 className="w-5 h-5" /> İstatistikler
      </Link>

      <Link
        href="/settings"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md flex items-center gap-2"
      >
        <FiSettings className="w-5 h-5" /> Ayarlar
      </Link>
    </nav>
  );
}
