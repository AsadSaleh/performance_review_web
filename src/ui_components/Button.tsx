import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center px-8 py-2 border border-transparent rounded-md 
  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
}
