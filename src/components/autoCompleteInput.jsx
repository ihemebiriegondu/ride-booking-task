import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";

const AutocompleteInput = (props) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
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
      <label htmlFor={props.inputId} className="sm:text-lg text-base sm:mb-2 mb-1 text-slate-700">
        {props.label}
      </label>
      <div className="flex flex-row gap-2 items-center border-2 border-gray-400 md:px-3 px-2 md:py-4 py-2 rounded-md">
        <MdLocationOn className="sm:text-3xl text-xl text-slate-700" />
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
          />
        </Autocomplete>
      </div>
    </div>
  );
};

export default AutocompleteInput;
