import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/_lib/auth";
import LogoutButton from "./LogoutButton";
import { FiBell, FiMessageSquare, FiHelpCircle } from "react-icons/fi";

export default async function Navigation() {
  const session = await auth();

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
              0
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
        <li className="ml-2">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={session.user.image}
                    alt="Profil Resmi"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {session.user.name}
                </span>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
