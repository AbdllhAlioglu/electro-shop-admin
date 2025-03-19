"use client";
import React from "react";
import MessageTable from "./MessageTable";
import { useMessages } from "@/app/_hooks/useMessages";

export default function MessagesClient({ initialMessages }) {
  // Hook ile mesajları client-side'da çek
  const { data: messages = initialMessages } = useMessages();

  // Okunmamış mesajları say
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
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  );
}
