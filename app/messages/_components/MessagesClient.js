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
    <div className="container mx-auto p-6 animate-fade-in-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-slate-100">
            Mesajlar
          </h1>
          <p className="text-gray-600 mt-1 dark:text-slate-100">
            Toplam {messages.length} mesaj, {unreadCount} okunmamış
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  );
}
