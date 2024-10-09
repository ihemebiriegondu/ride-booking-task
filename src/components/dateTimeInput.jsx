import React, { useEffect, useState } from "react";

export default function DateTimeInput({
  id,
  type,
  text,
  error,
  setError,
  setValue,
  dateCheck,
  defaultValue
}) {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 10);
    setTodayDate(date);
  }, []);

  const validateInput = (e) => {
    setError("none");
    let value = e.target.value;

    if (id === "dateInput") {
      const selectedDate = new Date(value);
      const todaysDate = new Date(todayDate);

      if (selectedDate >= todaysDate) {
        setValue(value);
      } else {
        setError("invalid");
      }
    }

    if (id === "timeInput") {
      //to check if the date selected is todays date, if yes? Time input must be more than the time now
      const timeNow = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      if (dateCheck === todayDate) {
        if (timeNow > value) {
          setError("invalid");
        } else {
          setValue(value);
        }
      } else {
        setValue(value);
      }
    }
  };

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
        defaultValue={defaultValue}
        min={id === "dateInput" ? todayDate : ""}
        className={`md:px-3 px-2 md:py-4 py-1 rounded-md outline-none bg-transparent border-2 text-base ${
          error === "none" ? "border-gray-400" : "border-red-400"
        }`}
        onChange={(e) => validateInput(e)}
      />
    </div>
  );
}
