"use client";
import { useState } from "react";
import { useAddCustomer } from "@/app/_hooks/useCustomers";
import CustomerForm from "./CustomerForm";

export default function AddCustomerModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addCustomer } = useAddCustomer();

  const handleSubmit = (formData) => {
    setIsSubmitting(true);

    addCustomer(formData, {
      onSuccess: () => {
        setIsSubmitting(false);
        onClose();
      },
      onError: (error) => {
        console.error("Ekleme hatası:", error);
        setIsSubmitting(false);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto dark:bg-gray-700 dark:text-slate-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Yeni Müşteri Ekle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <CustomerForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
