import ProductTableHeader from "./ProductTableHeader";
import ProductTableClient from "./ProductTableClient";

export default function ProductTable({ products, categories, brands }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <ProductTableClient
        products={products}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
