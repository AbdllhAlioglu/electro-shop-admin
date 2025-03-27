"use client";

import React, { useState, useEffect } from "react";
import {
  FiShield,
  FiTrendingUp,
  FiSettings,
  FiMail,
  FiLock,
  FiPhone,
  FiMessageCircle,
  FiClock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "./PublicHeader";
import Footer from "./ui/Footer";
import { useLogin } from "@/services/useLogin";
import { toast } from "react-hot-toast";
export default function PublicLanding() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const { login, isLoading } = useLogin();
  const [isSupportActive, setIsSupportActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.password) return;
    login({ email: formData.email, password: formData.password });
  };

  const handleGoogleLogin = () => {
    // Google login işlemi buraya gelecek
    console.log("Google login clicked");
    toast.error("Google login henüz desteklenmiyor");
  };

  // Destek ekibinin aktif olup olmadığını kontrol et
  const checkSupportAvailability = () => {
    const now = new Date();
    const hours = now.getHours();
    const isWeekday = now.getDay() !== 0 && now.getDay() !== 6; // 0: Pazar, 6: Cumartesi
    return isWeekday && hours >= 9 && hours < 17;
  };

  // Destek durumunu periyodik olarak kontrol et
  useEffect(() => {
    const updateSupportStatus = () => {
      setIsSupportActive(checkSupportAvailability());
    };

    // İlk kontrol
    updateSupportStatus();

    // Her dakika kontrol et
    const interval = setInterval(updateSupportStatus, 60000);

    return () => clearInterval(interval);
  }, []);

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
                        type={showPassword ? "text" : "password"}
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
                      <button
                        type="button"
                        onClick={handlePasswordToggle}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
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

            {/* Destek Bölümü */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                  Yardıma mı ihtiyacınız var?
                </h2>
                <p className="text-blue-700 mb-8 text-center">
                  Teknik destek ekibimiz hafta içi 09:00 - 17:00 saatleri
                  arasında hizmet vermektedir.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* E-posta Desteği */}
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <FiMail className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">E-posta</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Detaylı destek için e-posta gönderin
                    </p>
                    <a
                      href="mailto:support@electroshop.com"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      support@electroshop.com
                    </a>
                  </div>

                  {/* Telefon Desteği */}
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <FiPhone className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Telefon</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Hızlı destek için bizi arayın
                    </p>
                    <a
                      href="tel:+902121234567"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      0212 123 45 67
                    </a>
                  </div>

                  {/* Canlı Destek */}
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <FiMessageCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">
                        Canlı Destek
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Anlık yardım için canlı destek
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock
                        className={`w-4 h-4 ${
                          isSupportActive ? "text-green-500" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={
                          isSupportActive ? "text-green-600" : "text-gray-600"
                        }
                      >
                        {isSupportActive
                          ? "Şu an aktif"
                          : "Mesai saati dışında"}
                      </span>
                    </div>
                    {!isSupportActive && (
                      <p className="text-xs text-gray-500 mt-2">
                        Mesai saatleri: Hafta içi 09:00 - 17:00
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href="/help"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Destek Merkezi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
