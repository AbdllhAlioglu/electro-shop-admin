"use client";
import { useState } from "react";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableBody from "./ProductTableBody";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "@/services/currencyService";
import { useProducts } from "@/app/_hooks/useProducts";

export default function ProductTableClient({
  initialProducts,
  categories,
  brands,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Ürünleri React Query ile getir
  const { data: products = initialProducts, isLoading: isLoadingProducts } =
    useProducts();

  // Döviz kurlarını getir
  const { data: exchangeRates } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: () => getExchangeRates(),
    staleTime: 1000 * 60, // 1 minute
  });

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
    filtered.sort((a, b) => {
      let comparison = 0;

      // Sorting based on field type
      if (sortBy === "name") {
        comparison = (a.name || "").localeCompare(b.name || "");
      } else if (sortBy === "price") {
        comparison = parseFloat(a.price || 0) - parseFloat(b.price || 0);
      } else if (sortBy === "stock") {
        comparison = parseInt(a.stock || 0) - parseInt(b.stock || 0);
      } else if (sortBy === "category_id") {
        const catA =
          categories?.find((c) => c.id === a.category_id)?.name || "";
        const catB =
          categories?.find((c) => c.id === b.category_id)?.name || "";
        comparison = catA.localeCompare(catB);
      } else if (sortBy === "brand_id") {
        const brandA = brands?.find((b) => b.id === a.brand_id)?.name || "";
        const brandB = brands?.find((b) => b.id === b.brand_id)?.name || "";
        comparison = brandA.localeCompare(brandB);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  if (isLoadingProducts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <ProductTableHeader
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
        <ProductTableBody
          products={filteredProducts}
          categories={categories}
          brands={brands}
          exchangeRates={exchangeRates}
        />
      </table>
    </>
  );
}
