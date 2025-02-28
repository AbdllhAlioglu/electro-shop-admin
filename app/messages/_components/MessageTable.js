import MessageTableRow from "./MessageTableRow";

export default function MessageTable({ messages }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Gönderen
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Konu
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Tarih
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              Durum
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {messages?.map((message) => (
            <MessageTableRow key={message.id} message={message} />
          ))}
          {!messages || messages.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                Henüz mesaj bulunmamaktadır.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
