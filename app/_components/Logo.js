import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="logo"
        width={60}
        height={60}
        unoptimized
        className="object-contain"
      />
      <span className="text-xl font-semibold text-primary-100">
        Electro Shop Admin
      </span>
    </Link>
  );
}
