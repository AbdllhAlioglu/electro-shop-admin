"use client";
import React, { useState } from "react";
import { getProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import ProductTable from "./_components/ProductTable";
import { getCategories } from "@/services/apiCategories";
import { getBrands } from "@/services/apiBrands";
import FilterBar from "./_components/FilterBar";
import { FiPlus } from "react-icons/fi";
import IconButton from "@/app/ui/IconButton";

export default function Page() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  // Filtreleme state'leri
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtreleme ve sıralama fonksiyonu
  const getFilteredAndSortedProducts = () => {
    if (!products) return [];

    let filtered = [...products];

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Kategori filtresi
    if (selectedCategory === "all") {
      filtered = filtered.filter((product) => product.category_id);
    } else if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category_id === parseInt(selectedCategory)
      );
    }

    // Sıralama
    if (sortBy) {
      const [field, direction] = sortBy.split("-");
      filtered.sort((a, b) => {
        let comparison = 0;
        if (field === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (field === "price") {
          comparison = a.price - b.price;
        } else if (field === "stock") {
          comparison = a.stock - b.stock;
        }
        return direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <IconButton
          icon={FiPlus}
          variant="primary"
          onClick={() => {
            /* Ürün ekleme modalını aç */
          }}
        >
          Yeni Ürün
        </IconButton>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <ProductTable
        products={filteredProducts}
        categories={categories}
        brands={brands}
        onEdit={(product) => {
          /* Düzenleme modalını aç */
        }}
        onDelete={(product) => {
          /* Silme işlemini başlat */
        }}
      />
    </div>
  );
}
