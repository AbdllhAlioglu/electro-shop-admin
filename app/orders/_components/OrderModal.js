"use client";
import { useState } from "react";
import { useUpdateOrder } from "@/app/_hooks/useOrders";
import EditOrderForm from "./EditOrderForm";

export default function OrderModal({ order, isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: updateOrder } = useUpdateOrder();

  const handleSubmit = (formData) => {
    setIsSubmitting(true);

    updateOrder(
      {
        id: order.id,
        data: formData,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          onClose();
        },
        onError: (error) => {
          console.error("Güncelleme hatası:", error);
          setIsSubmitting(false);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Sipariş Düzenle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <EditOrderForm
            order={order}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
