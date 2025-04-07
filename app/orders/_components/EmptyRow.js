export default function EmptyRow({ colSpan, message }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-6 text-center text-gray-500 bg-gray-50 italic dark:text-slate-100 dark:bg-gray-700"
      >
        {message}
      </td>
    </tr>
  );
}
