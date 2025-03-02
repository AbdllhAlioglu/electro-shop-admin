import React from "react";
import { auth } from "@/app/_lib/auth";
import { FiUser, FiCalendar } from "react-icons/fi";
import Image from "next/image";

export default async function WelcomeBanner() {
  const session = await auth();

  if (!session?.user) return null;

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
          {session.user.image ? (
            <div className="relative w-16 h-16 mr-5 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src={session.user.image}
                alt="Profil Resmi"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-5 border-2 border-white shadow-md">
              <FiUser className="text-blue-600 w-8 h-8" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Hoşgeldiniz, {session.user.name}!
            </h2>
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
