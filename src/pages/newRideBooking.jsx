import React from "react";
import AutocompleteInput from "../components/autoCompleteInput";

import Maps from "../components/maps";
import DateTimeInput from "../components/dateTimeInput";

export default function Form(props) {
  const basicInfoForm = (e) => {
    e.preventDefault();
    console.log(props.pickupLocation);
  };

  return (
    <main className="h-full relative">
      <div className="absolute z-10 top-0 bottom-0 w-full">
        <Maps />
      </div>
      <div className="absolute z-20 lg:bottom-1/2 bottom-0 lg:translate-y-1/2 lg:left-6 overflow-y-auto 2xl:w-2/5 xl:w-5/12 lg:w-1/2 w-full bg-white lg:rounded-b-xl sm:rounded-t-xl rounded-t-lg shadow-xl sm:p-5 p-3">
        <form onSubmit={(e) => basicInfoForm(e)} className="">
          <div className="flex flex-row justify-between sm:mb-3 mb-1">
            <h4 className="capitalize font-semibold sm:text-lg text-base">
              Select Locations
            </h4>
          </div>

          <div className="bg-green-50 rounded-lg sm:py-4 py-3 sm:px-3 px-2">
            <div className="flex flex-row items-center sm:gap-3 gap-1.5">
              <div className="flex flex-col items-center pt-2">
                <span className="sm:w-4 w-2.5 sm:h-4 h-2.5 rounded-full bg-green-400"></span>
                <div className="sm:w-1 w-0.5 sm:h-24 h-16 bg-green-400"></div>
                <span className="sm:w-4 w-2.5 sm:h-4 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <div className="grow">
                <div className="flex flex-col mb-1">
                  <AutocompleteInput
                    placeholder="Select Pickup location"
                    inputId="pickupLocation"
                    setPickup={props.setPickupLocation}
                    label="Pickup Address:"
                  />
                </div>

                <div className="flex flex-col mb-1">
                  <AutocompleteInput
                    placeholder="Select Dropoff location"
                    inputId="dropOffLocation"
                    setDropoff={props.setPickupLocation}
                    label="Dropoff Address:"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-4">
              <DateTimeInput text={"Date:"} type={"date"} id={"dateInput"} />
              <DateTimeInput text={"Time:"} type={"time"} id={"timeInput"} />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-400 text-white rounded-md w-full sm:py-4 py-2 sm:text-xl text-lg font-semibold mt-5"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
