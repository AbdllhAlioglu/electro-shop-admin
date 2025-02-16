import ProductTableRow from "./ProductTableRow";
import EmptyRow from "./EmptyRow";

export default function ProductTableBody({
  products,
  categories,
  brands,
  onEdit,
  onDelete,
}) {
  return (
    <tbody className="divide-y divide-gray-200">
      {products?.length === 0 ? (
        <EmptyRow />
      ) : (
        products?.map((product) => (
          <ProductTableRow
            key={product.id}
            product={product}
            categories={categories}
            brands={brands}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </tbody>
  );
}
