export default function CategoryTableHeader({
  sortBy,
  sortDirection,
  onSortChange,
}) {
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <thead className="bg-gray-800 rounded-lg">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("name")}
          >
            Kategori Adı{getSortIcon("name")}
          </button>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("parent_id")}
          >
            Üst Kategori{getSortIcon("parent_id")}
          </button>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("created_at")}
          >
            Oluşturulma Tarihi{getSortIcon("created_at")}
          </button>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-white tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
  );
}
