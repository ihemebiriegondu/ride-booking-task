import React from "react";

export default function DateTimeInput({ id, type, text }) {
  return (
    <div className="grow flex flex-col">
      <label htmlFor="dateInput" className="sm:text-lg text-base sm:mb-2 mb-1 text-slate-700">
        {text}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="md:px-3 px-2 md:py-4 py-1 rounded-md outline-none bg-transparent border-2 border-gray-400 text-base"
      />
    </div>
  );
}
