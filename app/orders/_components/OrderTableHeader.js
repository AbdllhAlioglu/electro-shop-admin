export default function OrderTableHeader({
  sortBy,
  sortDirection,
  onSortChange,
}) {
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <thead className="bg-gray-900 rounded-lg">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("id")}
          >
            Sipariş No{getSortIcon("id")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("customer")}
          >
            Müşteri{getSortIcon("customer")}
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
            Tarih{getSortIcon("created_at")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("discounted_total")}
          >
            Tutar{getSortIcon("discounted_total")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          <button
            className="font-semibold focus:outline-none text-white"
            onClick={() => onSortChange("priority")}
          >
            Teslimat{getSortIcon("priority")}
          </button>
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
  );
}
