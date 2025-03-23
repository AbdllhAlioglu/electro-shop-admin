import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="logo"
        width={60}
        height={60}
        className="object-contain"
      />
      <span className="text-xl font-semibold text-primary-100">
        Electro Shop Admin
      </span>
    </Link>
  );
}
