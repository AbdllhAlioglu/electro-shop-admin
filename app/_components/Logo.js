import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-0"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/logo.png`}
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
