import { FiInfo } from "react-icons/fi";

export default function EmptyNotifications() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4 text-center dark:text-slate-100">
      <div className="bg-gray-100 rounded-full p-4 mb-4 dark:bg-gray-700">
        <FiInfo className="w-8 h-8 text-gray-500 dark:text-slate-100" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-slate-100">
        Henüz Bildirim Yok
      </h3>
      <p className="text-gray-500 max-w-sm dark:text-slate-100">
        Sistem üzerinde yapılan işlemler burada listelenecektir.
      </p>
    </div>
  );
}
