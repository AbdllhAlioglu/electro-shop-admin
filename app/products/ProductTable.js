import React from "react";

// Stok durumuna göre class belirleme fonksiyonunu component dışına çıkaralım
const getStockStatusClass = (stock) => {
  if (stock > 50) return "bg-green-100 text-green-800";
  if (stock > 20) return "bg-yellow-100 text-yellow-800";
  if (stock > 0) return "bg-red-100 text-red-800";
  return "bg-red-500 text-white";
};

export default function ProductTable({ products, categories }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Ürün Adı
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Fiyat
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Stok
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Kategori
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products?.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {product.price} ₺
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(
                    product.stock
                  )}`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {categories?.find(
                  (category) => category.id === product.category_id
                )?.name || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
