import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5 mx-4">
      <div className="grid grid-cols-4 gap-8 items-center max-w-7xl mx-2 ">
        <div className="col-span-1 flex items-center">
          <Logo />
        </div>
        <div className="col-span-3 flex items-center justify-end">
          <Navigation />
        </div>
      </div>
    </header>
  );
}
