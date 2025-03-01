import React from "react";
import { getProducts } from "@/services/apiProducts";
import { getCategories } from "@/services/apiCategories";
import { getBrands } from "@/services/apiBrands";
import ProductTable from "./_components/ProductTable";
import AddProductButton from "./_components/AddProductButton";

export const metadata = {
  title: "Ürünler | Electro Shop Admin",
  description: "Ürünleri yönetin",
};

export default async function ProductsPage() {
  // Fetch data server-side
  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();

  return (
    <div className="container mx-auto p-4">
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
