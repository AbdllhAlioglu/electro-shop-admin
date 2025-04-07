"use client";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Yardım Merkezi</h1>

      <div className="space-y-8">
        {/* Ürün Yönetimi */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Ürün Yönetimi</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-slate-100">
                Nasıl yeni ürün ekleyebilirim?
              </h3>
              <p className="text-gray-600 dark:text-slate-100">
                Ürünler sayfasında &quot;Yeni Ürün Ekle&quot; butonunu
                kullanarak ürün ekleyebilirsiniz. Ürün görseli, fiyat, stok
                durumu ve diğer detayları doldurmanız gerekir.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-slate-100">
                Ürün bilgilerini nasıl güncelleyebilirim?
              </h3>
              <p className="text-gray-600 dark:text-slate-100">
                Ürünler listesinde düzenlemek istediğiniz ürünün yanındaki
                &quot;Düzenle&quot; butonunu kullanarak ürün bilgilerini
                güncelleyebilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Kategori Yönetimi */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Kategori Yönetimi</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-slate-100">
                Kategori oluşturma ve düzenleme
              </h3>
              <p className="text-gray-600 dark:text-slate-100">
                Kategoriler sayfasından yeni kategori ekleyebilir, mevcut
                kategorileri düzenleyebilir veya silebilirsiniz. Alt kategoriler
                oluşturarak ürünlerinizi daha detaylı sınıflandırabilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Sipariş Yönetimi */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sipariş Yönetimi</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-slate-100">
                Sipariş durumunu nasıl güncelleyebilirim?
              </h3>
              <p className="text-gray-600 dark:text-slate-100">
                Siparişler sayfasından ilgili siparişi seçerek durumunu
                güncelleyebilirsiniz. Sipariş detaylarını görüntüleyebilir ve
                işlem geçmişini takip edebilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Müşteri Yönetimi */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Müşteri Yönetimi</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700">
              <h3 className="font-medium mb-2 dark:text-slate-100">
                Müşteri bilgilerini nasıl görüntüleyebilirim?
              </h3>
              <p className="text-gray-600 dark:text-slate-100">
                Müşteriler sayfasından tüm müşteri listesine erişebilir, müşteri
                detaylarını görüntüleyebilir ve gerekli düzenlemeleri
                yapabilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Teknik Destek */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Teknik Destek</h2>
          <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-700">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1 dark:text-slate-100">
                  Sistem Desteği
                </h3>
                <p className="text-gray-600 dark:text-slate-100">
                  0507 940 09 15
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1 dark:text-slate-100">
                  Teknik E-posta
                </h3>
                <p className="text-gray-600 dark:text-slate-100">
                  aliogluuabdullah@gmail.com
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1 dark:text-slate-100">
                  Destek Saatleri
                </h3>
                <p className="text-gray-600 dark:text-slate-100">
                  7/24 Teknik Destek
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
