import React from "react";
import Link from "next/link";
import { FiHelpCircle, FiShoppingCart, FiUser } from "react-icons/fi";

export default function PublicNavigation() {
  return (
    <nav className="flex justify-end">
      <ul className="flex items-center gap-4">
        <li className="ml-2">
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiUser className="w-4 h-4" />
              Giriş Yap
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
