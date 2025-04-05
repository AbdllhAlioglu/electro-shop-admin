"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAddCustomer } from "@/app/_hooks/useCustomers";
import AddCustomerModal from "./AddCustomerModal";

export default function AddCustomerButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
      >
        <FiPlus className="h-4 w-4" />
        Yeni Müşteri
      </button>

      {isModalOpen && (
        <AddCustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
