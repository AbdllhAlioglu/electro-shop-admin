import React from "react";
import { getOrders } from "@/services/apiOrders";
import OrdersClient from "./_components/OrdersClient";

export const metadata = {
  title: "Siparişler | Electro Shop Admin",
  description: "Siparişleri yönetin",
};

export const dynamic = "force-dynamic"; // Her sayfada güncel veri için

export default async function OrdersPage() {
  // Server-side veri çekme - başlangıç verileri
  const initialOrders = await getOrders();

  return <OrdersClient initialOrders={initialOrders} />;
}
