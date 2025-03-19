import React from "react";
import { getMessages } from "../../services/apiMessages";
import MessagesClient from "./_components/MessagesClient";

export const metadata = {
  title: "Mesajlar | Electro Shop Admin",
  description: "Müşteri mesajlarını görüntüleyin ve yönetin",
};

export const dynamic = "force-dynamic"; // Her sayfada güncel veri için

export default async function MessagesPage() {
  // Fetch messages from the API
  const initialMessages = await getMessages();

  return <MessagesClient initialMessages={initialMessages} />;
}
