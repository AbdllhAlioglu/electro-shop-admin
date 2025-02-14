import React from "react";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden p-4">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-1 text-gray-800">
            Hoş Geldiniz
          </h1>
          <p className="text-base text-gray-600">
            Tüm istatistikleriniz tek bakışta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Toplam Müşteri</p>
                <h3 className="text-2xl font-bold text-gray-800">1,284</h3>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 12% geçen aya göre
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Toplam Ürün</p>
                <h3 className="text-2xl font-bold text-gray-800">2,547</h3>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 8% geçen aya göre
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-full">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Aktif Siparişler</p>
                <h3 className="text-2xl font-bold text-gray-800">32</h3>
                <p className="text-xs text-orange-600 mt-1">
                  ↓ 3% geçen aya göre
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-380px)]">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col max-h-[300px]">
            <h2 className="text-base font-semibold mb-2 text-gray-800">
              Son Aktiviteler
            </h2>
            <div className="overflow-auto">
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-green-50 rounded-full mr-3">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Yeni sipariş alındı
                    </p>
                    <p className="text-xs text-gray-500">5 dakika önce</p>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-blue-50 rounded-full mr-3">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Yeni üye kaydı
                    </p>
                    <p className="text-xs text-gray-500">15 dakika önce</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
