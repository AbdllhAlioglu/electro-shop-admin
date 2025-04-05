"use client";
import { useState } from "react";
import CustomerTableHeader from "./CustomerTableHeader";
import CustomerTableBody from "./CustomerTableBody";
import CustomerFilterBar from "./CustomerFilterBar";
import { useCustomers } from "@/app/_hooks/useCustomers";

export default function CustomerTableClient({ initialCustomers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Müşterileri React Query ile getir
  const { data: customers = initialCustomers, isLoading } = useCustomers();

  // Müşterileri filtrele ve sırala
  const filteredCustomers = Array.isArray(customers)
    ? customers
        .filter((customer) => {
          if (!searchTerm) return true;
          const searchLower = searchTerm.toLowerCase();

          return (
            customer.name?.toLowerCase().includes(searchLower) ||
            customer.email?.toLowerCase().includes(searchLower) ||
            customer.phone?.toLowerCase().includes(searchLower) ||
            customer.address?.toLowerCase().includes(searchLower)
          );
        })
        .sort((a, b) => {
          // Seçilen alana göre sırala
          if (sortBy === "created_at") {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
          }

          if (sortBy === "total_orders" && typeof a[sortBy] === "number") {
            return sortDirection === "asc"
              ? a[sortBy] - b[sortBy]
              : b[sortBy] - a[sortBy];
          }

          // Metin alanları için
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
      <CustomerFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
      />

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <CustomerTableHeader
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(field) => {
            if (sortBy === field) {
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            } else {
              setSortBy(field);
              setSortDirection("asc"); // Default to asc when changing sort field
            }
          }}
        />
        <CustomerTableBody customers={filteredCustomers} />
      </table>
    </>
  );
}
