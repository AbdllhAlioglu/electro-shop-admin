import React from "react";
import MessageTable from "./_components/MessageTable";
import { getMessages } from "../../services/apiMessages";

export const metadata = {
  title: "Mesajlar | Electro Shop Admin",
  description: "Müşteri mesajlarını görüntüleyin ve yönetin",
};

export default async function MessagesPage() {
  // Fetch messages from the API
  const messages = await getMessages();

  // Count unread messages
  const unreadCount = messages.filter((message) => !message.isread).length;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mesajlar</h1>
          <p className="text-gray-600 mt-1">
            Toplam {messages.length} mesaj, {unreadCount} okunmamış
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <MessageTable messages={messages} />
      </div>
    </div>
  );
}
