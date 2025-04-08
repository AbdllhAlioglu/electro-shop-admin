"use client";

import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
export default function NotificationFilters({ filterType, onFilterChange }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex flex-wrap gap-2 mb-6 ${
        isVisible ? "animate-fade-in-left" : "opacity-0"
      }`}
    >
      <button
        onClick={() => onFilterChange("all")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "all"
            ? "bg-gray-800 text-white dark:bg-gray-900 dark:text-slate-100"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-slate-100 dark:hover:bg-gray-600"
        }`}
      >
        Tümü
      </button>
      <button
        onClick={() => onFilterChange("create")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "create"
            ? "bg-green-600 text-white dark:bg-green-800 dark:text-white"
            : "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-gray-700 dark:text-slate-100 dark:hover:bg-gray-600"
        }`}
      >
        <span className="flex items-center gap-1">
          <FiPlus className="w-4 h-4" />
          Ekleme
        </span>
      </button>
      <button
        onClick={() => onFilterChange("update")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "update"
            ? "bg-blue-600 text-white dark:bg-blue-800 dark:text-white"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-slate-100 dark:hover:bg-gray-600"
        }`}
      >
        <span className="flex items-center gap-1">
          <FiEdit2 className="w-4 h-4" />
          Güncelleme
        </span>
      </button>
      <button
        onClick={() => onFilterChange("delete")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "delete"
            ? "bg-red-600 text-white dark:bg-red-800 dark:text-white"
            : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-gray-700 dark:text-slate-100 dark:hover:bg-gray-600"
        }`}
      >
        <span className="flex items-center gap-1">
          <FiTrash2 className="w-4 h-4" />
          Silme
        </span>
      </button>
    </div>
  );
}
