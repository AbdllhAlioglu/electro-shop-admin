export default function EmptyRow({ colSpan, message }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-8 text-center text-gray-500 border-b"
      >
        {message || "Kayıt bulunamadı."}
      </td>
    </tr>
  );
}
