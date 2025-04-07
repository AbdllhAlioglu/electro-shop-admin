"use client";
import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";

export default function AddCategoryButton({ categories }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCategoryAdded = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Yeni Kategori Ekle
      </button>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-primary-900 p-6 rounded-lg w-full max-w-md dark:bg-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-primary-200 dark:text-slate-100">
                Yeni Kategori Ekle
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-primary-400 dark:hover:text-primary-200 dark:text-slate-100"
              >
                ✕
              </button>
            </div>
            <AddCategoryForm
              categories={categories}
              onCategoryAdded={handleCategoryAdded}
            />
          </div>
        </div>
      )}
    </>
  );
}
