export default function StockStatus({ stock }) {
  const getStockStatusClass = (stock) => {
    if (stock > 50) return "bg-green-100 text-green-800";
    if (stock > 20) return "bg-yellow-100 text-yellow-800";
    if (stock > 0) return "bg-red-100 text-red-800";
    return "bg-red-500 text-white";
  };

  return (
    <span
      className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(
        stock
      )}`}
    >
      {stock}
    </span>
  );
}
