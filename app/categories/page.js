import React from "react";
import { getCategories } from "@/services/apiCategories";
import CategoryTable from "./_components/CategoryTable";
import AddCategoryButton from "./_components/AddCategoryButton";

export const metadata = {
  title: "Kategoriler | Electro Shop Admin",
  description: "Kategorileri yönetin",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <AddCategoryButton categories={categories} />
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
