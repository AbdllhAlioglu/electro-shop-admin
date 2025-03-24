"use client";

import React from "react";
import Logo from "./Logo";
import NavigationClient from "./NavigationClient";

export default function HeaderClient({ notificationCount }) {
  return (
    <header className="border-b border-primary-900 px-8 py-5 mx-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
