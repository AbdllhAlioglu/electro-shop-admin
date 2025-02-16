import { FiEdit2, FiTrash2 } from "react-icons/fi";
import StockStatus from "./StockStatus";
import IconButton from "@/app/ui/IconButton";

export default function ProductTableRow({
  product,
  categories,
  brands,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
        {product.name}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
        {product.price} ₺
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm">
        <StockStatus stock={product.stock} />
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
        {categories?.find((category) => category.id === product.category_id)
          ?.name || "-"}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
        {brands?.find((brand) => brand.id === product.brand_id)?.name || "-"}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-sm">
        <div className="flex gap-2">
          <IconButton
            icon={FiEdit2}
            variant="primary"
            onClick={() => onEdit(product)}
            className="!p-1 !bg-slate-500"
            title="Düzenle"
          />
          <IconButton
            icon={FiTrash2}
            variant="danger"
            onClick={() => onDelete(product)}
            className="!p-1"
            title="Sil"
          />
        </div>
      </td>
    </tr>
  );
}
