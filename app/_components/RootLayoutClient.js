"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "../ClientLayout";
import { memo } from "react";

function RootLayoutClient({ children, header }) {
  const pathname = usePathname();
  const isPublicPage = pathname === "/";

  if (isPublicPage) {
    return children;
  }

  return (
    <div className="antialiased h-screen flex flex-col">
      {header}
      <ClientLayout>{children}</ClientLayout>
    </div>
  );
}

export default memo(RootLayoutClient);
