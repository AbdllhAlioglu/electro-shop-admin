"use client";
import { useState } from "react";
import OrderTableHeader from "./OrderTableHeader";
import OrderTableBody from "./OrderTableBody";
import OrderFilterBar from "./OrderFilterBar";
import { useOrders } from "@/app/_hooks/useOrders";

export default function OrderTableClient({ initialOrders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc"); // Newest first

  // Siparişleri React Query ile getir
  const { data: orders = initialOrders, isLoading } = useOrders();

  // Filter and sort orders
  const filteredOrders = Array.isArray(orders)
    ? orders
        .filter((order) => {
          if (!searchTerm) return true;
          const searchLower = searchTerm.toLowerCase();

          return (
            order.id.toLowerCase().includes(searchLower) ||
            order.customer.toLowerCase().includes(searchLower) ||
            order.phone.toLowerCase().includes(searchLower) ||
            order.address.toLowerCase().includes(searchLower)
          );
        })
        .sort((a, b) => {
          // Sort based on the selected field and direction
          if (sortBy === "created_at") {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
          }

          if (sortBy === "discounted_total") {
            const priceA = parseFloat(a.discounted_total);
            const priceB = parseFloat(b.discounted_total);
            return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
          }

          // For string types
          const valA = a[sortBy]?.toString().toLowerCase() || "";
          const valB = b[sortBy]?.toString().toLowerCase() || "";
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        })
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <OrderFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
      />

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <OrderTableHeader
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(field) => {
            if (sortBy === field) {
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            } else {
              setSortBy(field);
              setSortDirection("desc"); // Default to desc when changing sort field
            }
          }}
        />
        <OrderTableBody orders={filteredOrders} />
      </table>
    </>
  );
}
