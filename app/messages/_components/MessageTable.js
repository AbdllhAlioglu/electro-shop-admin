"use client";
import MessageTableRow from "./MessageTableRow";
import { useMessages } from "@/app/_hooks/useMessages";

export default function MessageTable({ initialMessages }) {
  const { data: messages = initialMessages, isLoading } = useMessages();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Gönderen
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Konu
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Tarih
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Durum
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-gray-200">
          {messages?.map((message) => (
            <MessageTableRow key={message.id} message={message} />
          ))}
          {!messages || messages.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                Henüz mesaj bulunmamaktadır.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
