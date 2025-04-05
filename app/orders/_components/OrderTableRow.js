"use client";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import IconButton from "@/app/_components/IconButton";
import { useDeleteOrder } from "@/app/_hooks/useOrders";
import { useOrderItems } from "@/app/_hooks/useOrders";
import OrderModal from "./OrderModal";
import { formatCurrency } from "@/app/_lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import toast from "react-hot-toast";

export default function OrderTableRow({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder();
  const { data: orderItems = [] } = useOrderItems(
    isDetailsOpen ? order.id : null
  );

  // Format date
  const formattedDate = format(
    new Date(order.created_at),
    "dd MMMM yyyy HH:mm",
    {
      locale: tr,
    }
  );

  // Handle delete with toast confirmation
  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>
          &quot;{order.customer}&quot; müşterisinin siparişini silmek
          istediğinizden emin misiniz?
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
              deleteOrder({
                id: order.id,
                customer: order.customer,
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
      <tr className="hover:bg-gray-50 transition-colors duration-200 border-b">
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            {order.id.substring(0, 8)}...
            {isDetailsOpen ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {order.customer}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {order.phone}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {formattedDate}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {formatCurrency(order.discounted_total)}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              order.priority === true || order.priority === "true"
                ? "bg-amber-100 text-amber-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.priority === true || order.priority === "true"
              ? "Hızlı Teslimat"
              : "Normal"}
          </span>
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

      {/* Order Details Row */}
      {isDetailsOpen && (
        <tr>
          <td colSpan={7} className="px-4 py-3 bg-gray-50">
            <div className="p-3 border rounded">
              <h3 className="font-semibold mb-2">Sipariş Detayları</h3>
              <p className="mb-1 text-sm">
                <span className="font-medium">Sipariş ID:</span> {order.id}
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Adres:</span> {order.address}
              </p>
              {order.discount_percentage && (
                <p className="mb-1 text-sm">
                  <span className="font-medium">İndirim:</span> %
                  {order.discount_percentage}
                </p>
              )}
              <p className="mb-1 text-sm">
                <span className="font-medium">Teslimat:</span>{" "}
                {order.priority === true || order.priority === "true"
                  ? "Hızlı Teslimat"
                  : "Normal"}
              </p>

              {/* Order Items */}
              {orderItems.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium mb-2 text-sm">Sipariş Öğeleri:</h4>
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-1 text-left">Ürün</th>
                        <th className="p-1 text-center">Adet</th>
                        <th className="p-1 text-right">Birim Fiyat</th>
                        <th className="p-1 text-right">Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-1">
                            <div className="flex items-center gap-2">
                              {item.product_image && (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-8 h-8 object-cover rounded"
                                />
                              )}
                              {item.product_name}
                            </div>
                          </td>
                          <td className="p-1 text-center">{item.quantity}</td>
                          <td className="p-1 text-right">
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td className="p-1 text-right">
                            {formatCurrency(item.total_price)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold">
                        <td colSpan={3} className="p-1 text-right">
                          Toplam:
                        </td>
                        <td className="p-1 text-right">
                          {formatCurrency(order.discounted_total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <OrderModal
          order={order}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
