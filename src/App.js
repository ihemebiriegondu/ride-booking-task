import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UberProvider } from "./context/uberContext";
import { LoadScript } from "@react-google-maps/api";

import Intro from "./components/intro";
import Dashboard from "./pages/dashboard";
import Form from "./pages/newRideBooking";

const libraries = ["places"];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

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
      <UberProvider>
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
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </UberProvider>
    </LoadScript>
  );
}

export default App;
