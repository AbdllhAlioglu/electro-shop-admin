export default function ProductTableHeader() {
  return (
    <thead className="bg-gray-800">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          Ürün Adı
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          Fiyat
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          Stok
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          Kategori
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          Marka
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-white tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
  );
}
