"use client";
import React, { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function PasswordChangeCard() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Reset error
    setError("");

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Yeni şifreler eşleşmiyor");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    // TODO: Implement API call to change password
    // For now, just reset form and toggle state
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
  };

  return (
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
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mevcut Şifre
            </label>
            <div className="flex items-center">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="currentPassword"
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mevcut şifreniz"
                value={passwordData.currentPassword}
                onChange={handleChange}
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
                name="newPassword"
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Yeni şifreniz"
                value={passwordData.newPassword}
                onChange={handleChange}
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
                name="confirmPassword"
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Yeni şifrenizi tekrar girin"
                value={passwordData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
            >
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
  );
}
