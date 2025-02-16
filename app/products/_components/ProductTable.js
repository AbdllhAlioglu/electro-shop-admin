"use client";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableBody from "./ProductTableBody";

export default function ProductTable({
  products,
  categories,
  brands,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full bg-white">
        <ProductTableHeader />
        <ProductTableBody
          products={products}
          categories={categories}
          brands={brands}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </table>
    </div>
  );
}
