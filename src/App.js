import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import Intro from "./components/intro";
import Dashboard from "./pages/dashboard";
import Form from "./pages/newRideBooking";
import { EstimateProvider } from "./context/priceEstimateContext";
import ErrorDiv from "./components/errorDiv";

const libraries = ["places", "geometry"];

function App() {
  const [allRides, setAllRides] = useState(
    localStorage.getItem("rideDetails")
      ? [JSON.parse(localStorage.getItem("rideDetails"))]
      : []
  );

  const [showIntro, setShowIntro] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(allRides[0] ? allRides[0].pick : null);
  const [dropoffLocation, setDropoffLocation] = useState(allRides[0] ? allRides[0].dest : null);

  const [rideDate, setRideDate] = useState(allRides[0] ? allRides[0].date : "");
  const [rideTime, setRideTime] = useState(allRides[0] ? allRides[0].time : "");
  const [distance, setDistance] = useState(0);

  const [carType, setCarType] = useState(allRides[0] ? allRides[0].carType : "");
  const [totalPrice, setTotalPrice] = useState(allRides[0] ? allRides[0].price : 0);

  const [error, setError] = useState("none");

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
        <div className="App h-full overflow-x-hidden relative">
          <Intro isVisible={showIntro} />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    allRides={allRides}
                    setAllRides={setAllRides}
                    setDropoffLocation={setDropoffLocation}
                    setPickupLocation={setPickupLocation}
                    setRideDate={setRideDate}
                    setRideTime={setRideTime}
                    setDistance={setDistance}
                    setCarType={setCarType}
                    setTotalPrice={setTotalPrice}
                    setError={setError}
                  />
                }
              />
              <Route
                path="/booking form"
                element={
                  <Form
                    allRides={allRides}
                    setAllRides={setAllRides}
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
                    setError={setError}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
          <ErrorDiv error={error} />
        </div>
      </EstimateProvider>
    </LoadScript>
  );
}

export default App;
