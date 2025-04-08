"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useProducts } from "@/app/_hooks/useProducts";
import { useCategories } from "@/app/_hooks/useCategories";

const COLORS = [
  "#dc2626", // Stokta Yok - Kırmızı (Alarm)
  "#f97316", // Kritik Stok - Turuncu (Uyarı)
  "#22c55e", // Normal Stok - Yeşil (İyi)
  "#1d4ed8", // Yüksek Stok - Lacivert (Optimal)
];

export default function StatisticsPage({
  initialProducts = [],
  initialCategories = [],
}) {
  const [activeTab, setActiveTab] = useState("products");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [stockLevelData, setStockLevelData] = useState([]);

  // API'den veri çek
  const { data: products = initialProducts } = useProducts();
  const { data: categories = initialCategories } = useCategories();

  useEffect(() => {
    if (products.length && categories.length) {
      prepareChartData(products, categories);
    }
  }, [products, categories]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prepareChartData = (products, categories) => {
    // Kategori başına ürün sayısını hesapla
    const productCountsByCategory = {};

    products.forEach((product) => {
      const categoryId = product.category_id;
      if (categoryId) {
        productCountsByCategory[categoryId] =
          (productCountsByCategory[categoryId] || 0) + 1;
      }
    });

    // Kategori adlarını ekle ve grafik verisi formatına dönüştür
    const categoryChartData = categories.map((category) => ({
      name: category.name,
      count: productCountsByCategory[category.id] || 0,
    }));

    // En çok ürüne sahip kategorileri al (en fazla 5 kategori)
    const sortedCategoryData = [...categoryChartData]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Ürün dağılımı için veri
    const productDistribution = categories
      .map((category) => ({
        name: category.name,
        value: productCountsByCategory[category.id] || 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Fiyat aralıklarına göre ürün sayısını hesapla
    const priceRanges = [
      { range: "0-100 TL", min: 0, max: 100, count: 0 },
      { range: "100-500 TL", min: 100, max: 500, count: 0 },
      { range: "500-1000 TL", min: 500, max: 1000, count: 0 },
      { range: "1000-5000 TL", min: 1000, max: 5000, count: 0 },
      { range: "5000+ TL", min: 5000, max: Infinity, count: 0 },
    ];

    products.forEach((product) => {
      const price = Number(product.price) || 0;
      const range = priceRanges.find((r) => price >= r.min && price < r.max);
      if (range) {
        range.count++;
      }
    });

    // Stok durumuna göre ürün sayısını hesapla
    const stockLevels = [
      { name: "Stokta Yok (0)", value: 0 },
      { name: "Kritik Stok (1-5)", value: 0 },
      { name: "Normal Stok (6-20)", value: 0 },
      { name: "Yüksek Stok (20+)", value: 0 },
    ];

    products.forEach((product) => {
      const stock = Number(product.stock) || 0;

      if (stock === 0) {
        stockLevels[0].value++;
      } else if (stock <= 5) {
        stockLevels[1].value++;
      } else if (stock <= 20) {
        stockLevels[2].value++;
      } else {
        stockLevels[3].value++;
      }
    });

    setProductData(productDistribution);
    setCategoryData(sortedCategoryData);
    setPriceRangeData(priceRanges);
    setStockLevelData(stockLevels);
  };

  const chartHeight = windowWidth < 768 ? 300 : 400;

  // İlk yükleme için initial data kullan
  useEffect(() => {
    if (
      initialProducts.length &&
      initialCategories.length &&
      !productData.length
    ) {
      prepareChartData(initialProducts, initialCategories);
    }
  }, [initialProducts, initialCategories]);

  return (
    <div className="container mx-auto p-6 animate-fade-in-left">
      <h1 className="text-2xl font-bold mb-6">İstatistikler</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "products"
              ? "border-b-2 border-blue-500 dark:text-stale-200 dark:hover:text-stale-400"
              : "text-gray-500 hover:text-gray-700 dark:text-stale-200 dark:hover:text-stale-400"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Ürün İstatistikleri
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "categories"
              ? "border-b-2 border-blue-500 dark:text-stale-200 dark:hover:text-stale-400"
              : "text-gray-500 hover:text-gray-700 dark:text-stale-200 dark:hover:text-stale-400"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Kategori İstatistikleri
        </button>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        {activeTab === "products" ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-slate-100">
              Ürün Dağılımı
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-600">
                <h3 className="text-lg font-medium mb-4 dark:text-slate-100">
                  Kategori Bazında Ürün Sayıları
                </h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <BarChart
                    data={productData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Ürün Sayısı"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-gray-50 p-2 rounded-lg text-[0.8rem] dark:bg-gray-600">
                <h3 className="text-lg font-medium mb-4">Stok Durumu</h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <PieChart>
                    <Pie
                      data={stockLevelData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stockLevelData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Fiyat ve Kategori Analizi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bar Chart for Price Ranges */}
              <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-600 dark:text-slate-100">
                <h3 className="text-lg font-medium mb-4 dark:text-slate-100">
                  Fiyat Aralıklarına Göre Ürünler
                </h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <BarChart
                    data={priceRangeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="range"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="Ürün Sayısı"
                      fill="#00C49F"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Area Chart for Category Distribution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Kategori Dağılımı</h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <AreaChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="count"
                      name="Ürün Sayısı"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
