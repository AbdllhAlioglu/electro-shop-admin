import React from "react";
import CustomerTableRow from "./CustomerTableRow";
import EmptyRow from "./EmptyRow";

export default function CustomerTableBody({ customers }) {
  if (!customers || customers.length === 0) {
    return (
      <tbody>
        <EmptyRow colSpan={7} message="Henüz müşteri kaydı bulunmamaktadır." />
      </tbody>
    );
  }

  return (
    <tbody className="divide-y   dark:divide-gray-700">
      {customers.map((customer) => (
        <CustomerTableRow key={customer.id} customer={customer} />
      ))}
    </tbody>
  );
}
