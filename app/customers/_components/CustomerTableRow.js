"use client";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import IconButton from "@/app/_components/IconButton";
import { useDeleteCustomer } from "@/app/_hooks/useCustomers";
import CustomerModal from "./CustomerModal";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import toast from "react-hot-toast";

export default function CustomerTableRow({ customer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { mutate: deleteCustomer, isLoading: isDeleting } = useDeleteCustomer();

  // Format date if available
  const formattedDate = customer.created_at
    ? format(new Date(customer.created_at), "dd MMMM yyyy", { locale: tr })
    : "-";

  // Handle delete with toast confirmation
  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>
          &quot;{customer.name}&quot; adlı müşteriyi silmek istediğinizden emin
          misiniz?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            İptal
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            disabled={isDeleting}
            onClick={() => {
              toast.dismiss(t.id);
              deleteCustomer({
                id: customer.id,
                name: customer.name,
              });
            }}
          >
            {isDeleting ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200 border-b dark:bg-gray-700 dark:text-slate-100 dark:hover:bg-gray-600 dark:border-gray-600">
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium dark:text-slate-100">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            {customer.id.toString().substring(0, 8)}...
            {isDetailsOpen ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {customer.full_name}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {customer.email}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {customer.phone}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {formattedDate}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100  ">
          {customer.total_orders || 0}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm">
          <div className="flex gap-2">
            <IconButton
              icon={FiEdit2}
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="!p-1 !bg-slate-500"
              title="Düzenle"
            />
            <IconButton
              icon={FiTrash2}
              variant="danger"
              onClick={handleDelete}
              className="!p-1"
              title="Sil"
              disabled={isDeleting}
            />
          </div>
        </td>
      </tr>

      {/* Customer Details Row */}
      {isDetailsOpen && (
        <tr>
          <td colSpan={7} className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
            <div className="p-3 border rounded dark:bg-gray-700 dark:text-slate-100">
              <h3 className="font-semibold mb-2 dark:text-slate-100">
                Müşteri Detayları
              </h3>
              <p className="mb-1 text-sm dark:text-slate-100">
                <span className="font-medium">ID:</span> {customer.id}
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Müşteri Adı:</span>{" "}
                {customer.full_name}
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">E-posta:</span> {customer.email}
              </p>
              <p className="mb-1 text-sm dark:text-slate-100">
                <span className="font-medium">Telefon:</span> {customer.phone}
              </p>
              <p className="mb-1 text-sm dark:text-slate-100">
                <span className="font-medium">Adres:</span> {customer.address}
              </p>
              <p className="mb-1 text-sm dark:text-slate-100">
                <span className="font-medium">Kayıt Tarihi:</span>{" "}
                {formattedDate}
              </p>
              <p className="mb-1 text-sm dark:text-slate-100">
                <span className="font-medium">Toplam Sipariş:</span>{" "}
                {customer.total_orders || 0}
              </p>
            </div>
          </td>
        </tr>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <CustomerModal
          customer={customer}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
