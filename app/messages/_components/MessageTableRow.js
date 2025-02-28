"use client";
import { useState, useEffect } from "react";
import { FiEye, FiTrash2, FiMail, FiCheckCircle } from "react-icons/fi";
import IconButton from "@/app/_components/IconButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MessageViewModal from "./MessageViewModal";
import {
  updateMessageIsRead,
  deleteMessage,
} from "../../../services/apiMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MessageTableRow({ message }) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReadMessage, setIsReadMessage] = useState(message.isread);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateReadMutation } = useMutation({
    mutationFn: ({ id, data }) => updateMessageIsRead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      router.refresh();
      toast.success("Mesaj okundu olarak işaretlendi");
    },
    onError: (error) => {
      toast.error("Mesaj durumu güncellenirken bir hata oluştu");
      console.error("Mesaj durumu güncellenirken hata:", error);
    },
  });

  const handleMarkAsRead = async () => {
    updateReadMutation({
      id: message.id,
      data: { isread: true },
    });
    setIsReadMessage(true);
  };

  const handleDelete = async () => {
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
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteMessage(message.id);
                toast.success("Mesaj başarıyla silindi");
                queryClient.invalidateQueries(["messages"]);
                router.refresh();
              } catch (error) {
                toast.error("Mesaj silinirken bir hata oluştu");
                console.error("Mesaj silinirken hata:", error);
              }
            }}
          >
            Sil
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
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
          {message.sender}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {message.subject}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {isReadMessage ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <FiCheckCircle className="mr-1" />
              Okundu
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <FiMail className="mr-1" />
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
                disabled={isReadMessage}
              />
            )}
            <IconButton
              icon={FiTrash2}
              variant="danger"
              onClick={handleDelete}
              className="!p-1"
              title="Sil"
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
