"use client";

import React, { useState } from "react";
import {
  FiShield,
  FiTrendingUp,
  FiSettings,
  FiMail,
  FiLock,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "./PublicHeader";
import { useLogin } from "@/services/useLogin";
export default function PublicLanding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "abdullahalioglu37@gmail.com",
    password: "",
    rememberMe: false,
  });

  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Burada gerçek authentication işlemi yapılacak
    if (!formData.email && !formData.password) return;
    login({ email: formData.email, password: formData.password });
  };

  const handleGoogleLogin = () => {
    // Google login işlemi buraya gelecek
    console.log("Google login clicked");
  };

  return (
    <>
      <PublicHeader />
      <main className="flex-1 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Sol taraf - Açıklama */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Electro Shop Yönetim Paneli
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Elektronik mağazanızı yönetmek için güçlü araçlar ve detaylı
                  analizler
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    🚀 Yeni: Gelişmiş stok takibi ve satış raporlama özellikleri
                    eklendi!
                  </p>
                </div>
              </div>

              {/* Sağ taraf - Login Formu */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Yönetici Girişi
                  </h2>
                  <p className="text-gray-600">
                    Hesabınıza giriş yaparak devam edin
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Adresi
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        disabled={isLoading}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ornek@sirket.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Şifre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        value={formData.password}
                        disabled={isLoading}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rememberMe: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Beni hatırla
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Şifremi unuttum
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FcGoogle className="w-5 h-5 mr-2" />
                      Google ile devam et
                    </button>
                  </div>
                </form>
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
