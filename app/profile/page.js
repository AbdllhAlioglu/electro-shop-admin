"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setFormData((prev) => ({
            ...prev,
            email: user.email,
            fullName: user.user_metadata?.full_name || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Kullanıcı bilgileri alınamadı");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    try {
      setLoading(true);

      // Update profile data
      const { error: updateError } = await supabase.auth.updateUser({
        email: formData.email,
        password: formData.newPassword || undefined,
        data: { full_name: formData.fullName },
      });

      if (updateError) throw updateError;

      toast.success("Profil başarıyla güncellendi!");

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Profil güncellenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-8 dark:bg-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700">
            <FiUser className="w-8 h-8 text-blue-600 dark:text-slate-100 " />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">
              Profil Ayarları
            </h1>
            <p className="text-gray-500 dark:text-slate-100">
              Kişisel bilgilerinizi güncelleyin
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2 dark:text-slate-100">
                  <FiUser className="w-4 h-4 mr-2 dark:text-slate-100" />
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-slate-100 dark:focus:border-gray-700 dark:border-none"
                  placeholder="Ad Soyad"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2 dark:text-slate-100  ">
                  <FiMail className="w-4 h-4 mr-2" />
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-slate-100 dark:focus:border-gray-700 dark:border-none"
                  placeholder="E-posta"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2 dark:text-slate-100">
                  <FiLock className="w-4 h-4 mr-2 dark:text-slate-100" />
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-slate-100 dark:focus:border-gray-700 dark:border-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2 dark:text-slate-100">
                  <FiLock className="w-4 h-4 mr-2 dark:text-slate-100" />
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-slate-100 dark:focus:border-gray-700 dark:border-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2 dark:text-slate-100">
                  <FiLock className="w-4 h-4 mr-2 dark:text-slate-100" />
                  Yeni Şifre Tekrar
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-slate-100 dark:focus:border-gray-700 dark:border-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-blue-500"
            >
              <FiSave className="w-4 h-4" />
              {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
