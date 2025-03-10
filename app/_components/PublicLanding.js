import React from "react";
import Link from "next/link";
import { FiShield, FiTrendingUp, FiSettings } from "react-icons/fi";

export default function PublicLanding() {
  return (
    <>
      <main className="flex-1 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Electro Shop Yönetim Paneli
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Elektronik mağazanızı yönetmek için güçlü araçlar
              </p>
              <div className="flex justify-center">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Satışları Takip Edin
                </h3>
                <p className="text-gray-600 text-center">
                  Gerçek zamanlı satış istatistikleri ve analitiklerle
                  işletmenizi büyütün.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4 mx-auto">
                  <FiSettings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Ürünleri Yönetin
                </h3>
                <p className="text-gray-600 text-center">
                  Ürün kataloğunuzu kolayca düzenleyin, stok takibi yapın ve
                  fiyatları güncelleyin.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4 mx-auto">
                  <FiShield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Güvenli Erişim
                </h3>
                <p className="text-gray-600 text-center">
                  Rol tabanlı erişim kontrolü ile verilerinizi güvende tutun.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Yardıma mı ihtiyacınız var?
              </h2>
              <p className="text-blue-700 mb-6">
                Teknik destek ekibimiz size yardımcı olmak için hazır.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Destek Alın
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Electro Shop. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </>
  );
}
