"use client";

import React from "react";
import Logo from "./Logo";
import NavigationClient from "./NavigationClient";

export default function HeaderClient({ notificationCount }) {
  return (
    <header className="border-b border-primary-900 px-8 py-5 mx-4">
      <div className="grid grid-cols-4 gap-8 items-center max-w-7xl mx-2">
        <div className="col-span-1 flex items-center">
          <Logo />
        </div>
        <div className="col-span-3 flex items-center justify-end">
          <NavigationClient notificationCount={notificationCount} />
        </div>
      </div>
    </header>
  );
}
