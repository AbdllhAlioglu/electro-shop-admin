"use client";
import { useState } from "react";

export default function CustomerForm({
  customer,
  onSubmit,
  isSubmitting,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    full_name: customer?.full_name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Müşteri adı zorunludur";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi zorunludur";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası zorunludur";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres zorunludur";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // İlgili hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-100"
          >
            Müşteri Adı*
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            } rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none `}
            required
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-100"
          >
            E-posta*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-100"
          >
            Telefon*
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-100"
          >
            Adres*
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full p-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600 focus:outline-none`}
            required
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-slate-100 dark:bg-gray-700 dark:border-gray-600"
            disabled={isSubmitting}
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:text-slate-100 dark:border-gray-600"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? customer
                ? "Kaydediliyor..."
                : "Oluşturuluyor..."
              : customer
              ? "Kaydet"
              : "Oluştur"}
          </button>
        </div>
      </div>
    </form>
  );
}
