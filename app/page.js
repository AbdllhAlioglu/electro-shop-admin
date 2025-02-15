import React from "react";
import { getProducts } from "@/services/apiProducts";
import { getCategories } from "@/services/apiCategories";
import { FiPackage, FiGrid, FiAlertCircle, FiDollarSign } from "react-icons/fi";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 20
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ana Sayfa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Toplam Ürünler */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Ürünler</p>
              <p className="text-2xl font-bold mt-1">{totalProducts}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Toplam Kategoriler */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kategoriler</p>
              <p className="text-2xl font-bold mt-1">{totalCategories}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <FiGrid className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Stokta Olmayan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stokta Olmayan</p>
              <p className="text-2xl font-bold mt-1">{outOfStock}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Düşük Stok */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Düşük Stok</p>
              <p className="text-2xl font-bold mt-1">{lowStock}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
