import { FiTool } from "react-icons/fi";

export default function UnderConstruction({
  title = "Geliştirme Aşamasında",
  message = " Çok yakında hizmetinizde olacaktır.",
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-yellow-50 p-8 rounded-lg shadow-md text-center max-w-md">
        <FiTool className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
