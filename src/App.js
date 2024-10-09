import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import Intro from "./components/intro";
import Dashboard from "./pages/dashboard";
import Form from "./pages/newRideBooking";
import { EstimateProvider } from "./context/priceEstimateContext";

const libraries = ["places", "geometry"];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [distance, setDistance] = useState(0);

  const [carType, setCarType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <EstimateProvider>
        <div className="App h-full">
          <Intro isVisible={showIntro} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/booking form"
                element={
                  <Form
                    setDropoffLocation={setDropoffLocation}
                    setPickupLocation={setPickupLocation}
                    pickupLocation={pickupLocation}
                    dropoffLocation={dropoffLocation}
                    setRideDate={setRideDate}
                    setRideTime={setRideTime}
                    setDistance={setDistance}
                    rideDate={rideDate}
                    rideTime={rideTime}
                    distance={distance}
                    setCarType={setCarType}
                    setTotalPrice={setTotalPrice}
                    carType={carType}
                    totalPrice={totalPrice}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </EstimateProvider>
    </LoadScript>
  );
}

export default App;
