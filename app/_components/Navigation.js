import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
  const session = await auth();

  console.log(session);
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
          {session?.user?.image ? (
            <Link href="/profile">
              <Image
                src={session.user.image}
                alt="Profil Resmi"
                width={32}
                height={32}
                className="rounded-full w-8 h-8 object-cover border border-gray-300"
              />
            </Link>
          ) : (
            "Admin"
          )}
        </li>
      </ul>
    </nav>
  );
}
