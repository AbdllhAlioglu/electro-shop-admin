"use client";
import React from "react";
import OrderTable from "./OrderTable";
import { useOrders } from "@/app/_hooks/useOrders";

export default function OrdersClient({ initialOrders }) {
  // Hook ile siparişleri client-side'da çek
  const { data: orders = initialOrders } = useOrders();

  return (
    <div className="container mx-auto p-4 animate-fade-in-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Siparişler</h1>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}
