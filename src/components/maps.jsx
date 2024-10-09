import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const Map = ({ pickUpLocation, dropOffLocation, setDistance, setError }) => {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 6.5244,
    lng: 3.3792,
  });
  const [dropOffCenter, setDropoffCenter] = useState(null);
  const mapRef = useRef(null);

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const options = {
    mapTypeControl: false,
    fullscreenControl: false,
  };

  // Updating defaultCenter from user location
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
          setError(error.message);
          setTimeout(() => {
            setError("none");
          }, 2000);
          setDefaultCenter({ lat: 6.5244, lng: 3.3792 });
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setTimeout(() => {
        setError("none");
      }, 2000);
    }
  }, [setError]);

  // Update the defaultCenter when pickup location is added
  useEffect(() => {
    if (pickUpLocation) {
      setDefaultCenter({
        lat: pickUpLocation.geometry.location.lat(),
        lng: pickUpLocation.geometry.location.lng(),
      });
    }
  }, [pickUpLocation]);

  // Update the dropOffCenter when dropoff location is added
  useEffect(() => {
    if (dropOffLocation) {
      setDropoffCenter({
        lat: dropOffLocation.geometry.location.lat(),
        lng: dropOffLocation.geometry.location.lng(),
      });
    }
  }, [dropOffLocation]);

  // Fit map zooming to show both pickup and drop-off locations and get distance
  useEffect(() => {
    if (mapRef.current && pickUpLocation && dropOffLocation) {
      const bounds = new window.google.maps.LatLngBounds();

      // Get the lat and lng for pickup and drop-off locations
      const pickUpLatLng = new window.google.maps.LatLng(
        pickUpLocation.geometry.location.lat(),
        pickUpLocation.geometry.location.lng()
      );

      const dropOffLatLng = new window.google.maps.LatLng(
        dropOffLocation.geometry.location.lat(),
        dropOffLocation.geometry.location.lng()
      );

      // Extend bounds to include pickup and dropoff locations
      bounds.extend(pickUpLatLng);
      bounds.extend(dropOffLatLng);

      // Fit the map to the bounds
      mapRef.current.fitBounds(bounds);

      // Calculate the distance between pickup and drop-off locations (in meters)
      const distanceInMeters =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          pickUpLatLng,
          dropOffLatLng
        );
      setDistance(distanceInMeters);

      //show visible path between the two locations
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: mapRef.current, // Attach the map to the renderer
        //suppressMarkers: true, // Suppress default markers (optional)
      });

      // Request directions
      directionsService.route(
        {
          origin: pickUpLatLng,
          destination: dropOffLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING, // Set the travel mode (DRIVING, WALKING, etc.)
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            // Render the directions on the map
            directionsRenderer.setDirections(response);

            // Get distance from the response
            const distanceInMeters = response.routes[0].legs[0].distance.value; // Distance in meters
            setDistance(distanceInMeters); // Set distance state
          } else {
            setError("Directions request failed due to " + status);
            setTimeout(() => {
              setError("none");
            }, 2000);
          }
        }
      );
    }
  }, [pickUpLocation, dropOffLocation, setDistance, setError]);

  //console.log(pickUpLocation.geometry.location.lat())
  //console.log(dropOffLocation.geometry.location.lng())

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={16}
      center={defaultCenter}
      options={options}
      onLoad={(map) => (mapRef.current = map)}
    >
      <MarkerF position={defaultCenter} />

      {dropOffCenter && <MarkerF position={dropOffCenter} />}
    </GoogleMap>
  );
};

export default Map;
