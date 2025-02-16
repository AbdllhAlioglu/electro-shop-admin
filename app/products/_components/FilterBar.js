"use client";

import React from "react";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Arama */}
      <div>
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Kategori Filtresi */}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tüm Kategoriler</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sıralama */}
      <div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Sıralama</option>
          <option value="name-asc">İsim (A-Z)</option>
          <option value="name-desc">İsim (Z-A)</option>
          <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
          <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
          <option value="stock-asc">Stok (Azdan Çoğa)</option>
          <option value="stock-desc">Stok (Çoktan Aza)</option>
        </select>
      </div>
    </div>
  );
}
