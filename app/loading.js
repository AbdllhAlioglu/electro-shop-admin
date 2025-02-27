import React from "react";

export default function loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="ml-3 text-blue-600">Loading...</p>
    </div>
  );
}
