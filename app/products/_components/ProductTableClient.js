"use client";
import { useState } from "react";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableBody from "./ProductTableBody";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "@/services/currencyService";
import { useRouter } from "next/navigation";

export default function ProductTableClient({ products, categories, brands }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const filteredProducts = getFilteredAndSortedProducts();

  const handleDelete = (deletedProduct) => {
    // After deletion, refresh the page to get updated data
    router.refresh();
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

      <table className="min-w-full bg-white rounded-lg ">
        <ProductTableHeader />
        <ProductTableBody
          products={filteredProducts}
          categories={categories}
          brands={brands}
          onEdit={(product) => {
            /* Düzenleme modalını aç */
          }}
          onDelete={handleDelete}
          exchangeRates={exchangeRates}
        />
      </table>
    </>
  );
}
