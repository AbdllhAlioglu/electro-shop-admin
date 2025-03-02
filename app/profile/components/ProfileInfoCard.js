"use client";
import React, { useState } from "react";
import { FiUser, FiMail } from "react-icons/fi";

export default function ProfileInfoCard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // TODO: Implement API call to save profile changes
    // For now, just toggle editing state
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p>Kullanıcı bilgileri yüklenemedi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <FiUser className="w-8 h-8 text-gray-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {user.name || "İsimsiz Kullanıcı"}
          </h2>
          <p className="text-gray-600">{user.email || "E-posta yok"}</p>
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
              name="name"
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E-posta adresiniz"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
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
  );
}
