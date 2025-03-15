import React from "react";
import { FiCalendar } from "react-icons/fi";

export default function WelcomeBanner() {
  // Get current date
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("tr-TR", options);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-8 border border-blue-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hoşgeldiniz!</h2>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <FiCalendar className="mr-2 text-blue-500" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
