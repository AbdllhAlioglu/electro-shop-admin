import React from "react";
import Link from "next/link";

export default function LeftMenu() {
  return (
    <nav className="flex flex-col gap-4">
      <Link
        href="/"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Ana Sayfa
      </Link>
      <Link
        href="/products"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Ürünler
      </Link>
      <Link
        href="/categories"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Kategoriler
      </Link>
      <Link
        href="/orders"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Siparişler
      </Link>
      <Link
        href="/customers"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Müşteriler
      </Link>
      <Link
        href="/settings"
        className="hover:text-primary-300 transition-colors px-4 py-2 hover:bg-primary-800 rounded-md"
      >
        Ayarlar
      </Link>
    </nav>
  );
}
