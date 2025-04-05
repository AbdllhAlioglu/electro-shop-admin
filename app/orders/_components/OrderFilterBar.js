"use client";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

export default function OrderFilterBar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
}) {
  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Arama */}
      <div>
        <input
          type="text"
          placeholder="Sipariş ara..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Sıralama */}
      <div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="created_at">Tarih</option>
          <option value="customer">Müşteri</option>
          <option value="discounted_total">Tutar</option>
          <option value="priority">Teslimat</option>
        </select>
      </div>

      {/* Sıralama Yönü */}
      <div>
        <button
          onClick={() =>
            onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
          }
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <span>Sıralama:</span>
          {sortDirection === "asc" ? (
            <>
              <FiArrowUp className="text-green-600" />
              <span>Artan</span>
            </>
          ) : (
            <>
              <FiArrowDown className="text-red-600" />
              <span>Azalan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
