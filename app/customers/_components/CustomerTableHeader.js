export default function CustomerTableHeader({
  sortBy,
  sortDirection,
  onSortChange,
}) {
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <thead className="bg-gray-800 rounded-lg border-collapse">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("id")}
          >
            ID{getSortIcon("id")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("name")}
          >
            Müşteri Adı{getSortIcon("name")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("email")}
          >
            E-posta{getSortIcon("email")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("phone")}
          >
            Telefon{getSortIcon("phone")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("created_at")}
          >
            Kayıt Tarihi{getSortIcon("created_at")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("total_orders")}
          >
            Toplam Sipariş{getSortIcon("total_orders")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
  );
}
