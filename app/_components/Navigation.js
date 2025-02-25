import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
export default function Navigation() {
  return (
    <nav className="flex justify-end">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            href="/notifications"
            className="hover:text-primary-300 transition-colors"
          >
            Bildirimler (0)
          </Link>
        </li>
        <li>
          <Link
            href="/messages"
            className="hover:text-primary-300 transition-colors"
          >
            Mesajlar
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className="hover:text-primary-300 transition-colors"
          >
            Yardım
          </Link>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="hover:text-primary-300 transition-colors"
            >
              Admin
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
