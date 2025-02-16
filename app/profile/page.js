"use client";
import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Profil Bilgileri</h1>

        {/* Profil Bilgileri Kartı */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Maliki Alioğlu</h2>
              <p className="text-gray-600">Admin</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* İsim Alanı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <div className="flex items-center">
                <FiUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Abdullah Alioğlu"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Email Alanı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <div className="flex items-center">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="aliogluuabdullah@gmail.com"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
              >
                {isEditing ? "Kaydet" : "Düzenle"}
              </button>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  İptal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Şifre Değiştirme Kartı */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Şifre Değiştir</h2>

          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Şifremi değiştirmek istiyorum
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mevcut Şifre
                </label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mevcut şifreniz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre
                </label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Yeni şifreniz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre Tekrar
                </label>
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">
                  Şifreyi Güncelle
                </button>
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
