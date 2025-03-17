import React from "react";
import Link from "next/link";

export default function LeftMenu() {
  return (
    <nav className="flex flex-col gap-4  ">
      <Link
        href="/dashboard"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Ana Sayfa
      </Link>
      <Link
        href="/products"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Ürünler
      </Link>
      <Link
        href="/categories"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Kategoriler
      </Link>
      <Link
        href="/orders"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Siparişler
      </Link>
      <Link
        href="/customers"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Müşteriler
      </Link>
      <Link
        href="/settings"
        className="hover:text-primary-300 transition-all duration-300 ease-out transform hover:scale-105 px-4 py-2 hover:bg-primary-800 hover:translate-x-[10px] rounded-md"
      >
        Ayarlar
      </Link>
    </nav>
  );
}
