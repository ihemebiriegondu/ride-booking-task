import React, { createContext, useState, useEffect } from "react";

export const PriceEstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  // Fetch vehicle types
  const fetchCarData = async () => {
    try {
      const response = await fetch("./cars.json");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <PriceEstimateContext.Provider
      value={{
        cars,
      }}
    >
      {children}
    </PriceEstimateContext.Provider>
  );
};
