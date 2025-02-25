import CategoryTableRow from "./CategoryTableRow";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  // Find parent category name helper function
  const getParentCategoryName = (parentId) => {
    if (!parentId) return "-";
    const parent = categories.find((cat) => cat.id === parentId);
    return parent ? parent.name : "-";
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Kategori Adı
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Üst Kategori
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Oluşturulma Tarihi
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories?.map((category) => (
            <CategoryTableRow
              key={category.id}
              category={category}
              categories={categories}
              parentName={getParentCategoryName(category.parent_id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
