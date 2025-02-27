import React from "react";

export default function IconButton({
  icon: Icon,
  children,
  variant = "primary",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
