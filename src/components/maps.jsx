import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const Map = () => {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 6.5244,
    lng: 3.3792,
  });

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const options = {
    mapTypeControl: false,
    fullscreenControl: false,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error.message);
          setDefaultCenter({ lat: 6.5244, lng: 3.3792 });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={18}
      center={defaultCenter}
      options={options}
    >
      <MarkerF position={defaultCenter} />
    </GoogleMap>
  );
};

export default Map;
