"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "@/app/_hooks/useProducts";
import { useCategories } from "@/app/_hooks/useCategories";
import { useRecentSales, useSalesTrends } from "@/app/_hooks/useOrders";
import {
  FiPackage,
  FiShoppingCart,
  FiGrid,
  FiTrendingUp,
  FiAlertCircle,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#dc2626", // Stokta Yok - Kırmızı (Alarm)
  "#f97316", // Kritik Stok - Turuncu (Uyarı)
  "#22c55e", // Normal Stok - Yeşil (İyi)
  "#1d4ed8", // Yüksek Stok - Lacivert (Optimal)
];

const DashboardClient = ({ initialProducts = [], initialCategories = [] }) => {
  const { data: products = initialProducts } = useProducts();
  const { data: categories = initialCategories } = useCategories();
  const { data: recentSales = [] } = useRecentSales();
  const { data: salesTrendsData = [] } = useSalesTrends();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0,
    recentSales: 0,
  });
  const [recentTrend, setRecentTrend] = useState({
    salesTrend: 0,
    productTrend: 12.3,
  });
  const [topCategories, setTopCategories] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (products.length && categories.length) {
      prepareStats();
      prepareChartData();
    }
  }, [products, categories, recentSales, salesTrendsData]);

  const prepareStats = () => {
    // Temel istatistikler
    const lowStock = products.filter(
      (product) => (Number(product.stock) || 0) <= 5
    ).length;

    // Calculate total sales from recentSales data
    const totalRecentSales = recentSales.length;

    // Calculate sales trend
    let salesTrendPercentage = 0;
    if (salesTrendsData.length >= 2) {
      const currentMonth = salesTrendsData[salesTrendsData.length - 1].amount;
      const prevMonth = salesTrendsData[salesTrendsData.length - 2].amount;

      if (prevMonth > 0) {
        salesTrendPercentage = ((currentMonth - prevMonth) / prevMonth) * 100;
      }
    }

    setStats({
      totalProducts: products.length,
      totalCategories: categories.length,
      lowStockProducts: lowStock,
      recentSales: totalRecentSales,
    });

    setRecentTrend({
      salesTrend: Number(salesTrendPercentage.toFixed(1)),
      productTrend: 12.3, // Örnek veri
    });
  };

  const prepareChartData = () => {
    // Kategori başına ürün sayısını hesapla
    const productCountsByCategory = {};

    products.forEach((product) => {
      const categoryId = product.category_id;
      if (categoryId) {
        productCountsByCategory[categoryId] =
          (productCountsByCategory[categoryId] || 0) + 1;
      }
    });

    // En çok ürüne sahip kategorileri bul
    const topCategoriesData = categories
      .map((category) => ({
        id: category.id,
        name: category.name,
        count: productCountsByCategory[category.id] || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTopCategories(topCategoriesData);

    // Stok durumuna göre ürünleri grupla
    const stockLevels = [
      { name: "Stokta Yok", value: 0 },
      { name: "Kritik Stok", value: 0 },
      { name: "Normal Stok", value: 0 },
      { name: "Yüksek Stok", value: 0 },
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

    setStockData(stockLevels);

    // Use real sales data from API
    setSalesData(salesTrendsData);
  };

  // İlk yükleme için initial data kullan
  useEffect(() => {
    if (
      initialProducts.length &&
      initialCategories.length &&
      !stats.totalProducts
    ) {
      prepareStats();
      prepareChartData();
    }
  }, [initialProducts, initialCategories]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Gösterge Paneli</h1>

      {/* İstatistik Kartları başlangıç */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Toplam Ürün */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Toplam Ürün</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiPackage className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <FiChevronUp className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">
              {recentTrend.productTrend}%
            </span>
            <span className="text-gray-500 ml-2">son 30 günden</span>
          </div>
        </div>

        {/* Toplam Kategori */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Toplam Kategori
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {stats.totalCategories}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiGrid className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-500">Aktif kategoriler</span>
          </div>
        </div>

        {/* Son Satışlar */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Son Satışlar</p>
              <h3 className="text-2xl font-bold mt-1">{stats.recentSales}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiShoppingCart className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {recentTrend.salesTrend > 0 ? (
              <>
                <FiChevronUp className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">
                  {recentTrend.salesTrend}%
                </span>
              </>
            ) : (
              <>
                <FiChevronDown className="text-red-500 mr-1" />
                <span className="text-red-500 font-medium">
                  {Math.abs(recentTrend.salesTrend)}%
                </span>
              </>
            )}
            <span className="text-gray-500 ml-2">son aydan</span>
          </div>
        </div>

        {/* Düşük Stok Uyarısı */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Düşük Stok</p>
              <h3 className="text-2xl font-bold mt-1">
                {stats.lowStockProducts}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-red-500 font-medium">Kritik seviyede</span>
            <span className="text-gray-500 ml-2">ürün stokta</span>
          </div>
        </div>
      </div>
      {/* İstatistik Kartları biti */}

      {/* Grafikler başlangıç */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Satış Trendleri */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Satış Trendleri</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} TL`, "Satış"]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                name="Satış"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Kategori Dağılımı */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Kategori Dağılımı</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCategories}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar
                dataKey="count"
                name="Ürün Sayısı"
                fill="#82ca9d"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stok Durumu */}
        <div className="bg-white p-3 rounded-lg shadow-md text-sm">
          <h2 className="text-lg font-medium mb-4">Stok Durumu</h2>
          <div className="flex justify-center">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stockData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {stockData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      value,
                      props.payload.name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Ürün Listesi - En Popüler */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">
            En Popüler Ürünler <i>(Test)</i>
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice(0, 5).map((product) => {
                  const category = categories.find(
                    (c) => c.id === product.category_id
                  );
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {category?.name || "Kategorisiz"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock <= 5
                              ? "bg-red-100 text-red-800"
                              : product.stock <= 20
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.price + " " + (product.currency || "TL")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Grafikler biti */}
    </div>
  );
};

export default DashboardClient;
