import React from "react";

export default function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
        className ?? "bg-green-100 text-green-800"
      }`}
    >
      {children}
    </span>
  );
}
