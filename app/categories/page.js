"use client";
import React, { useState } from "react";
import { getCategories } from "@/services/apiCategories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryTable from "./_components/CategoryTable";
import AddCategoryForm from "./_components/AddCategoryForm";

export default function Page() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(categories);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Yeni Kategori Ekle
        </button>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-primary-900 p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-primary-200">
                Yeni Kategori Ekle
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-primary-400 dark:hover:text-primary-200"
              >
                ✕
              </button>
            </div>
            <AddCategoryForm
              categories={categories}
              onCategoryAdded={() => {
                setIsAddModalOpen(false);
                queryClient.invalidateQueries(["categories"]);
              }}
            />
          </div>
        </div>
      )}

      <CategoryTable
        categories={categories}
        onEdit={(category) => {
          /* Düzenleme işlemi CategoryTableRow içinde yapılıyor */
        }}
        onDelete={(category) => {
          /* Silme işlemi CategoryTableRow içinde yapılıyor */
        }}
      />
    </div>
  );
}
