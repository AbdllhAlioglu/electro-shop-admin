export default function CategoryTable({ categories }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Kategori Adı
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Oluşturulma Tarihi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories?.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {new Date(category.created_at).toLocaleDateString("tr-TR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
