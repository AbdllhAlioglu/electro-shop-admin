import DashboardCard from "@/app/_components/DashboardCard";
import WelcomeBanner from "@/app/_components/WelcomeBanner";
import { getProducts } from "@/services/apiProducts";
import { getCategories } from "@/services/apiCategories";
import { FiPackage, FiGrid, FiAlertCircle } from "react-icons/fi";

export default async function DashboardPage() {
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
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <WelcomeBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <DashboardCard
          title="Toplam Ürünler"
          value={totalProducts}
          icon={<FiPackage className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <DashboardCard
          title="Kategoriler"
          value={totalCategories}
          icon={<FiGrid className="w-6 h-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <DashboardCard
          title="Stokta Olmayan"
          value={outOfStock}
          icon={<FiAlertCircle className="w-6 h-6 text-red-600" />}
          color="bg-red-50"
        />
        <DashboardCard
          title="Düşük Stok"
          value={lowStock}
          icon={<FiAlertCircle className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
      </div>
    </div>
  );
}
