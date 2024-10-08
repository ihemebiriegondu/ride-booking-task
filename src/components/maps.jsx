import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 6.5244,
    lng: 3.3792,
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
      <Marker position={defaultCenter} />
    </GoogleMap>
  );
};

export default Map;
