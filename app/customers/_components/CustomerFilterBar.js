"use client";
import { FiFilter, FiSearch } from "react-icons/fi";

export default function CustomerFilterBar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4 p-3 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:text-slate-100 ">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FiSearch className="h-5 w-5 text-gray-500" />
        </span>
        <input
          type="text"
          placeholder="Müşteri ara..."
          className="w-full pl-10 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none "
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-600 flex gap-1 items-center whitespace-nowrap">
          <FiFilter className="h-4 w-4" /> Sırala:
        </span>
        <select
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none "
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name">İsim</option>
          <option value="email">E-posta</option>
          <option value="phone">Telefon</option>
          <option value="created_at">Kayıt Tarihi</option>
          <option value="total_orders">Toplam Sipariş</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none "
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
        >
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>
    </div>
  );
}
