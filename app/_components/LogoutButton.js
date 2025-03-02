"use client";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut, FiX, FiCheck } from "react-icons/fi";

export default function LogoutButton() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleLogoutClick = () => {
    setIsClosing(false);
    setShowConfirmation(true);

    // Automatically hide the toast after 10 seconds if not acted upon
    timerRef.current = setTimeout(() => {
      handleCloseToast();
    }, 10000);
  };

  const handleConfirmLogout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    signOut({ callbackUrl: "/login" });
  };

  const handleCloseToast = () => {
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      setShowConfirmation(false);
      setIsClosing(false);
    }, 300); // Match this with the animation duration
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        className="ml-3 text-gray-700 hover:text-red-600 transition-colors flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm"
        title="Çıkış Yap"
      >
        <FiLogOut className="w-4 h-4 mr-1" />
        <span>Çıkış</span>
      </button>

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div
          className={`fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-4 max-w-md z-50 border-l-4 border-blue-500 ${
            isClosing ? "animate-fade-out" : "animate-slide-up"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">Çıkış Onayı</h3>
            <button
              onClick={handleCloseToast}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Oturumunuzu kapatmak istediğinizden emin misiniz?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCloseToast}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              İptal
            </button>
            <button
              onClick={handleConfirmLogout}
              className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex items-center"
            >
              <FiCheck className="w-4 h-4 mr-1" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </>
  );
}
