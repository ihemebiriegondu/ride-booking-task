import React, { useEffect, useState } from "react";

export default function DateTimeInput({ id, type, text }) {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 10);
    console.log(date);
    setTodayDate(date);
  }, []);

  return (
    <div className="grow flex flex-col">
      <label
        htmlFor="dateInput"
        className="sm:text-lg text-base sm:mb-2 mb-1 text-slate-700"
      >
        {text}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        min={id === "dateInput" ? todayDate : ''}
        className="md:px-3 px-2 md:py-4 py-1 rounded-md outline-none bg-transparent border-2 border-gray-400 text-base"
      />
    </div>
  );
}
