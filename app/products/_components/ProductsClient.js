"use client";
import React from "react";
import ProductTable from "./ProductTable";
import AddProductButton from "./AddProductButton";
import { useProducts } from "@/app/_hooks/useProducts";
import { useCategories } from "@/app/_hooks/useCategories";

export default function ProductsClient({
  initialProducts,
  initialCategories,
  initialBrands,
}) {
  // Hook ile ürünleri ve kategorileri client-side'da çek
  const { data: products = initialProducts } = useProducts();
  const { data: categories = initialCategories } = useCategories();
  // Not: useBrands hook'u mevcut değilse initialBrands değerini kullanıyoruz
  const brands = initialBrands;

  return (
    <div className="container mx-auto p-4 animate-fade-in-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <AddProductButton categories={categories} brands={brands} />
      </div>

      <ProductTable
        products={products}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
