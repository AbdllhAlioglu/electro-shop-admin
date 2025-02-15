"use client";

import React from "react";
import { getProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import ProductTable from "./ProductTable";
import { getCategories } from "@/services/apiCategories";
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <ProductTable products={products} categories={categories} />
    </div>
  );
}
