"use client";

import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function NotificationFilters({ filterType, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "all"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Tümü
      </button>
      <button
        onClick={() => onFilterChange("create")}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          filterType === "create"
            ? "bg-green-600 text-white"
            : "bg-green-50 text-green-700 hover:bg-green-100"
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
            ? "bg-blue-600 text-white"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
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
            ? "bg-red-600 text-white"
            : "bg-red-50 text-red-700 hover:bg-red-100"
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
