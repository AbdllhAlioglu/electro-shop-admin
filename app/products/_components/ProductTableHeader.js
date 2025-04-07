export default function ProductTableHeader({
  sortBy,
  sortDirection,
  onSortChange,
}) {
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <thead className="bg-gray-900 rounded-lg ">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("name")}
          >
            Ürün Adı{getSortIcon("name")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("price")}
          >
            Fiyat{getSortIcon("price")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("stock")}
          >
            Stok{getSortIcon("stock")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("category_id")}
          >
            Kategori{getSortIcon("category_id")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("brand_id")}
          >
            Marka{getSortIcon("brand_id")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
  );
}
