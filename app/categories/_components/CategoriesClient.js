"use client";
import React from "react";
import CategoryTable from "./CategoryTable";
import AddCategoryButton from "./AddCategoryButton";
import { useCategories } from "@/app/_hooks/useCategories";

export default function CategoriesClient({ initialCategories }) {
  // useCategories hook'u ile kategorileri çek
  const { data: categories = initialCategories } = useCategories();

  return (
    <div className="container mx-auto p-4 animate-fade-in-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <AddCategoryButton categories={categories} />
      </div>

      <CategoryTable initialCategories={categories} />
    </div>
  );
}
