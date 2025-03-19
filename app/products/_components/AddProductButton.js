"use client";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
import ProductModal from "./ProductModal";

export default function AddProductButton({ categories, brands }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleProductAdded = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Yeni Ürün Ekle
      </button>

      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Yeni Ürün Ekle"
      >
        <AddProductForm
          onProductAdded={handleProductAdded}
          categories={categories}
          brands={brands}
        />
      </ProductModal>
    </>
  );
}
