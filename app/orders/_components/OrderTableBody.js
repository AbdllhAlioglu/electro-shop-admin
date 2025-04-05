import OrderTableRow from "./OrderTableRow";
import EmptyRow from "./EmptyRow";

export default function OrderTableBody({ orders }) {
  // If there are no orders, display an empty row message
  if (!orders || orders.length === 0) {
    return (
      <tbody>
        <EmptyRow colSpan={7} message="Henüz sipariş bulunmuyor" />
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-gray-200">
      {orders.map((order) => (
        <OrderTableRow key={order.id} order={order} />
      ))}
    </tbody>
  );
}
