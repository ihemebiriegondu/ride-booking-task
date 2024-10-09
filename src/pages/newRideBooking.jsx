import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AutocompleteInput from "../components/autoCompleteInput";
import Maps from "../components/maps";
import DateTimeInput from "../components/dateTimeInput";
import CarInfo from "../components/carInfo";
import Summary from "../components/summary";
import { PriceEstimateContext } from "../context/priceEstimateContext";

export default function Form(props) {
  const { cars } = useContext(PriceEstimateContext);

  const [pickupError, setPickupError] = useState(false);
  const [destError, setDestError] = useState(false);
  const [dateError, setDateError] = useState("none");
  const [timeError, setTimeError] = useState("none");
  const [carError, setCarError] = useState(false);

  const [showSummary, setShowSummary] = useState(false);
  const [newRideDetails, setNewRideDetails] = useState({});

  const validateForm = () => {
    const pickUpValue = document.getElementById("pickupLocation").value;
    const dropOffValue = document.getElementById("dropOffLocation").value;

    let isValid = true;

    setPickupError(false);
    setDestError(false);
    setDateError("none");
    setTimeError("none");

    if (pickUpValue === "") {
      setPickupError(true);
      props.setCarType("");
      isValid = false;
    }

    if (dropOffValue === "") {
      setDestError(true);
      props.setCarType("");
      isValid = false;
    }

    if (props.rideDate === "") {
      setDateError("empty");
      isValid = false;
    }

    if (props.rideTime === "") {
      setTimeError("empty");
      isValid = false;
    }

    if (props.carType === "") {
      setCarError(true);
      isValid = false;
    }

    return isValid;
  };

  const basicInfoForm = (e) => {
    e.preventDefault();

    const bookingArray = {};
    bookingArray.dest = props.dropoffLocation;
    bookingArray.pick = props.pickupLocation;
    bookingArray.date = props.rideDate;
    bookingArray.time = props.rideTime;
    bookingArray.price = props.totalPrice;
    bookingArray.carType = cars.find(
      (car) => car["Car Model"] === props.carType
    );

    const isFormValid = validateForm();

    if (isFormValid) {
      setNewRideDetails(bookingArray);
      setShowSummary(true);
    }
  };

  return (
    <main className="h-full relative overflow-y-auto">
      <div className="absolute z-10 top-0 bottom-0 w-full">
        <Maps
          dropOffLocation={props.dropoffLocation}
          pickUpLocation={props.pickupLocation}
          setDistance={props.setDistance}
          setError={props.setError}
        />
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
                <span
                  className={`sm:w-3.5 w-2 sm:h-3.5 h-2 rounded-full border-2 border-green-400 transition-all duration-200 ease-in ${
                    document.getElementById("pickupLocation") &&
                    document.getElementById("pickupLocation").value
                      ? "bg-green-400"
                      : ""
                  }`}
                ></span>
                <div className="sm:w-1 w-0.5 sm:h-24 h-16">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height:
                        document.getElementById("pickupLocation") &&
                        document.getElementById("pickupLocation").value
                          ? "100%"
                          : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full bg-green-400"
                  ></motion.div>
                </div>
                <span
                  className={`sm:w-3.5 w-2 sm:h-3.5 h-2 rounded-full border-2 border-green-400 transition-all duration-200 ease-in delay-500 ${
                    document.getElementById("pickupLocation") &&
                    document.getElementById("pickupLocation").value
                      ? "bg-green-400"
                      : ""
                  }`}
                ></span>
              </div>
              <div className="grow">
                <div className="flex flex-col mb-1">
                  <AutocompleteInput
                    placeholder="Select Pickup location"
                    inputId="pickupLocation"
                    pickUp={props.pickupLocation}
                    setPickup={props.setPickupLocation}
                    label="Pickup Address:"
                    error={pickupError}
                    setError={setPickupError}
                    setSelectedCar={props.setCarType}
                    setGenError={props.setError}
                  />
                </div>

                <div className="flex flex-col mb-1">
                  <AutocompleteInput
                    placeholder="Select Dropoff location"
                    inputId="dropOffLocation"
                    dropOff={props.dropoffLocation}
                    setDropoff={props.setDropoffLocation}
                    label="Dropoff Address:"
                    error={destError}
                    setError={setDestError}
                    setSelectedCar={props.setCarType}
                    setGenError={props.setError}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between sm:gap-4 gap-2">
              <DateTimeInput
                text={"Date:"}
                type={"date"}
                defaultValue={props.rideDate}
                id={"dateInput"}
                setValue={props.setRideDate}
                setError={setDateError}
                error={dateError}
              />
              <DateTimeInput
                text={"Time:"}
                type={"time"}
                defaultValue={props.rideTime}
                id={"timeInput"}
                setValue={props.setRideTime}
                setError={setTimeError}
                error={timeError}
                dateCheck={props.rideDate}
              />
            </div>
            <span
              className={`text-sm text-red-400 px-2 transition-all duration-200 ease-in w-full inline-block ${
                dateError === "invalid" && timeError === "invalid"
                  ? "visible text-start"
                  : dateError === "invalid" && timeError !== "invalid"
                  ? "visible text-start"
                  : dateError !== "invalid" && timeError === "invalid"
                  ? "visible text-end"
                  : "invisible"
              }`}
            >
              Invalid date value
            </span>
          </div>

          <AnimatePresence>
            {((document.getElementById("pickupLocation") &&
              document.getElementById("pickupLocation").value !== "" &&
              document.getElementById("dropOffLocation") &&
              document.getElementById("dropOffLocation").value !== "") ||
              props.carType !== "") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <CarInfo
                  selectedCar={props.carType}
                  setSelectedCar={props.setCarType}
                  distance={props.distance}
                  setTotalPrice={props.setTotalPrice}
                  carError={carError}
                  setCarError={setCarError}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="bg-green-400 text-white rounded-md w-full sm:py-4 py-2 sm:text-xl text-lg font-semibold mt-5"
          >
            Continue
          </button>
        </form>

        <AnimatePresence>
          {showSummary && (
            <Summary
              rideDetails={newRideDetails}
              setShowSummary={setShowSummary}
              setDate={props.setRideDate}
              setTime={props.setRideTime}
              setAllRides={props.setAllRides}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
