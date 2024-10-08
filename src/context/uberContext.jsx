import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UberContext = createContext();

export const UberProvider = ({ children }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [priceEstimates, setPriceEstimates] = useState([]);
  const [timeEstimates, setTimeEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const UBER_SERVER_TOKEN = "YOUR_UBER_SERVER_TOKEN"; // Get from Uber Developer Dashboard

  const startLatitude = 37.7752315; // Example latitude for origin
  const startLongitude = -122.418075; // Example longitude for origin
  const endLatitude = 37.7899886; // Example latitude for destination
  const endLongitude = -122.4021253; // Example longitude for destination

  // Fetch vehicle types
  const fetchVehicleTypes = async () => {
    const raw = "";

    const requestOptions = {
      method: "GET",
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "httpsapi.uber.com/v1/products?latitude=37.7752315&longitude=-122.418075",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch price estimates

  // Fetch time estimates

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchVehicleTypes();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <UberContext.Provider
      value={{
        vehicleTypes,
        priceEstimates,
        timeEstimates,
        loading,
      }}
    >
      {children}
    </UberContext.Provider>
  );
};
