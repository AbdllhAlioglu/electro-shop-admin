"use client";
import { useState, useEffect } from "react";
import { FiEye, FiTrash2, FiMail, FiCheckCircle } from "react-icons/fi";
import IconButton from "@/app/_components/IconButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MessageViewModal from "./MessageViewModal";
import {
  useDeleteMessage,
  useUpdateMessageReadStatus,
} from "@/app/_hooks/useMessages";

export default function MessageTableRow({ message }) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReadMessage, setIsReadMessage] = useState(message.isread);
  const router = useRouter();

  // Mesaj silme mutation'ı
  const { mutate: deleteMessage, isLoading: isDeleting } = useDeleteMessage();

  // Okundu olarak işaretleme mutation'ı
  const { mutate: updateReadStatus, isLoading: isUpdating } =
    useUpdateMessageReadStatus();

  const handleMarkAsRead = () => {
    updateReadStatus(
      {
        id: message.id,
        data: { isread: true },
      },
      {
        onSuccess: () => {
          setIsReadMessage(true);
        },
      }
    );
  };

  const handleDelete = () => {
    // Show confirmation toast
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>Bu mesajı silmek istediğinizden emin misiniz?</p>
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
              deleteMessage(message.id);
            }}
          >
            {isDeleting ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    ));
  };

  // Format date
  const formattedDate = new Date(message.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-600 dark:hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium dark:text-slate-100">
          {message.sender}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {message.subject}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {isReadMessage ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <FiCheckCircle className="mr-1 text-green-800 dark:text-green-200" />
              Okundu
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <FiMail className="mr-1 text-blue-800 dark:text-blue-200" />
              Okunmadı
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex gap-2">
            <IconButton
              icon={FiEye}
              variant="primary"
              onClick={() => setIsViewModalOpen(true)}
              className="!p-1 !bg-slate-500"
              title="Görüntüle"
            />
            {!isReadMessage && (
              <IconButton
                icon={FiCheckCircle}
                variant="success"
                onClick={handleMarkAsRead}
                className="!p-1 !bg-green-500"
                title="Okundu Olarak İşaretle"
                disabled={isReadMessage || isUpdating}
              />
            )}
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

      {isViewModalOpen && (
        <MessageViewModal
          message={{ ...message, isread: isReadMessage }}
          onClose={() => setIsViewModalOpen(false)}
          onMarkAsRead={handleMarkAsRead}
          isShowOkundu={isReadMessage}
        />
      )}
    </>
  );
}
