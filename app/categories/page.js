"use client";
import React from "react";
import { getCategories } from "@/services/apiCategories";
import { useQuery } from "@tanstack/react-query";
import CategoryTable from "./CategoryTable";
export default function Page() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kategoriler</h1>
      <CategoryTable categories={categories} />
    </div>
  );
}
