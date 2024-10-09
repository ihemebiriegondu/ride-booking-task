import React, { useContext } from "react";
import { PriceEstimateContext } from "../context/priceEstimateContext";

export default function CarInfo({
  selectedCar,
  setSelectedCar,
  distance,
  setTotalPrice,
  carError,
  setCarError,
}) {
  const { cars } = useContext(PriceEstimateContext);

  return (
    <div className="w-full">
      <h4 className="capitalize font-semibold sm:text-lg text-base my-2">
        Select car type:
      </h4>
      <ul className="flex flex-row overflow-x-auto gap-2">
        {cars.map((car, i) => (
          <li
            key={i}
            className={`flex flex-col bg-green-50 border-2 rounded-md items-center transition-all duration-200 ease-in w-24 min-w-24 ${
              carError
                ? "border-red-400"
                : car["Car Model"] === selectedCar
                ? "border-green-400"
                : "border-green-50"
            }`}
            onClick={() => {
              setSelectedCar(car["Car Model"]);
              setTotalPrice(
                Math.round((distance / 1000) * car["Price per km"])
              );
              setCarError(false);
            }}
          >
            <img
              src={car["Image URL"]}
              alt={car["Car Model"]}
              className="w-12 h-12 object-scale-down -mt-1"
            />
            <p className="text-sm text-slate-600 -mt-2">{car["Car Model"]}</p>
            <h2 className="text-base font-semibold">
              ${Math.round((distance / 1000) * car["Price per km"])}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
