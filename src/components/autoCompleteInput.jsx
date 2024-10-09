import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";

const AutocompleteInput = (props) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      props.setSelectedCar("");

      if (props.inputId === "pickupLocation") {
        props.setPickup(place);
      } else if (props.inputId === "dropOffLocation") {
        props.setDropoff(place);
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <div className="flex flex-col sm:mb-4 mb-2">
      <label
        htmlFor={props.inputId}
        className="sm:text-lg text-base sm:mb-2 mb-1 text-slate-700"
      >
        {props.label}
      </label>
      <div
        className={`flex flex-row gap-2 items-center border-2 ${
          props.error ? "border-red-400" : "border-gray-400"
        } md:px-3 px-2 md:py-4 py-2 rounded-md transition-all duration-200 ease-in`}
      >
        <MdLocationOn
          className={`sm:text-3xl text-xl ${
            props.error ? "text-red-400" : "text-slate-700"
          } transition-all duration-200 ease-in`}
        />
        <Autocomplete
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChanged}
          options={{
            componentRestrictions: { country: "NG" },
            fields: ["formatted_address", "geometry.location"],
          }}
          className="grow"
        >
          <input
            type="text"
            placeholder={props.placeholder}
            name={props.inputId}
            id={props.inputId}
            className="w-full bg-transparent outline-none border-none sm:text-base text-sm"
            onFocus={() => props.setError(false)}
          />
        </Autocomplete>
      </div>
    </div>
  );
};

export default AutocompleteInput;
