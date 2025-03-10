import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="logo" width={60} height={60} quality={100} />
      <span className="text-xl font-semibold text-primary-100">
        Electro Shop Admin
      </span>
    </Link>
  );
}
