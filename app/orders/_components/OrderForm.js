"use client";
import { useState } from "react";

export default function OrderForm({ onSubmit, isSubmitting, onCancel }) {
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    address: "",
    priority: false,
    discount_percentage: "0",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Müşteri adı zorunludur";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası zorunludur";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres zorunludur";
    }

    if (
      formData.discount_percentage === "" ||
      formData.discount_percentage === null
    ) {
      newErrors.discount_percentage = "İndirim yüzdesi zorunludur";
    } else if (
      isNaN(formData.discount_percentage) ||
      parseInt(formData.discount_percentage) < 0 ||
      parseInt(formData.discount_percentage) > 100
    ) {
      newErrors.discount_percentage =
        "İndirim yüzdesi 0-100 arasında olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

    // priority değerini boolean olarak dönüştür
    const formattedData = {
      ...formData,
      priority: formData.priority === true || formData.priority === "true",
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="customer"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Müşteri Adı*
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.customer ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {errors.customer && (
            <p className="text-red-500 text-xs mt-1">{errors.customer}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            } rounded-md`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            } rounded-md`}
            required
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="discount_percentage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            İndirim Yüzdesi (%)*
          </label>
          <input
            type="number"
            id="discount_percentage"
            name="discount_percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            min={0}
            max={100}
            className={`w-full p-2 border ${
              errors.discount_percentage ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {errors.discount_percentage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discount_percentage}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="priority"
            name="priority"
            checked={formData.priority}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="priority"
            className="ml-2 block text-sm text-gray-700"
          >
            Hızlı Teslimat
          </label>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Oluşturuluyor..." : "Oluştur"}
          </button>
        </div>
      </div>
    </form>
  );
}
