"use client";

export default function ProductModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-blue-100 dark:border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-slate-200">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700 dark:text-slate-200 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
