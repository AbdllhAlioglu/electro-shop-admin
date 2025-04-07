import React from "react";
import Logo from "./Logo";
import PublicNavigation from "./PublicNavigation";

export default function PublicHeader() {
  return (
    <header className="border-b border-primary-900 px-8 py-5  bg-white flex justify-center md:justify-between ">
      <div className="text-center gap-8 items-center max-w-7xl mx-2">
        <div className="flex items-center text-center">
          <Logo />
        </div>
      </div>
    </header>
  );
}
