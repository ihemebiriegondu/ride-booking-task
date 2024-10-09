import React from "react";
import { motion } from "framer-motion";
import { TbCurrentLocation } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";
import { IoCarSportOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Summary({ rideDetails, setShowSummary, setDate, setTime }) {
  console.log(rideDetails);

  return (
    <div className="absolute sm:top-5 top-3 sm:left-5 left-3 sm:right-5 right-3 sm:bottom-4 bottom-2 bg-white">
      <h1 className="capitalize font-semibold sm:text-xl text-lg mb-3">
        Ride Summary:
      </h1>

      <div className="flex flex-col gap-2 bg-green-50 sm:text-lg text-base p-3 rounded-md">
        <div className="basis-1/4 flex flex-row items-center gap-4">
          <span className="font-semibold text-slate-700">Date:</span>
          <span className="">{rideDetails.date}</span>
        </div>
        <div className="basis-1/4 flex flex-row items-center gap-4">
          <span className="font-semibold text-slate-700">Time:</span>
          <span className="">{rideDetails.time}</span>
        </div>
        <div className="basis-1/4 flex flex-row items-center gap-4">
          <span className="font-semibold text-slate-700">Price:</span>
          <span className="">${rideDetails.price}</span>
        </div>
      </div>

      <div className="grow flex flex-col gap-3">
        <div className="flex flex-row items-center gap-4 p-2 rounded-md w-full">
          <TbCurrentLocation className="sm:text-xl text-lg" />
          <div className="sm:text-base text-sm">
            <span className="text-black/50">Pick Up:</span>
            <h4 className="text-slate-700 font-semibold">
              {rideDetails.pick.formatted_address}
            </h4>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 p-2 rounded-md w-full">
          <GrMapLocation className="sm:text-xl text-lg" />
          <div className="sm:text-base text-sm">
            <span className="text-black/50">Destination:</span>
            <h4 className="text-slate-700 font-semibold">
              {rideDetails.dest.formatted_address}
            </h4>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 p-2 rounded-md w-full">
          <IoCarSportOutline className="sm:text-xl text-lg" />
          <div className="sm:text-base text-sm">
            <span className="text-black/50">Car Type:</span>
            <h4 className="text-slate-700 font-semibold">
              {rideDetails.carType["Car Model"]}
            </h4>
          </div>
        </div>

        <div className="mt-5 flex flex-row gap-4">
          <button
            type="button"
            className="bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 sm:text-xl text-lg font-semibold"
            onClick={() => setShowSummary(false)}
          >
            Change
          </button>
          <Link
            to={"/"}
            className="inline-block text-center bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 sm:text-xl text-lg font-semibold"
            onClick={() => {
              setDate("");
              setTime("");
            }}
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
