import React from "react";
import Logo from "./Logo";
import PublicNavigation from "./PublicNavigation";

export default function PublicHeader() {
  return (
    <header className="border-b border-primary-900 px-8 py-5 mx-4 bg-white">
      <div className="grid grid-cols-4 gap-8 items-center max-w-7xl mx-2">
        <div className="col-span-1 flex items-center">
          <Logo />
        </div>
        <div className="col-span-3 flex items-center justify-end">
          <PublicNavigation />
        </div>
      </div>
    </header>
  );
}
