import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import wavingIcon from "../assets/wavinghand.png";
import emptySvg from "../assets/undraw_file_searching_re_3evy.svg";
import { FaAngleDown, FaRegCalendarCheck } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";

export default function Dashboard({ allRides }) {
  const [showRideDetail, setShowRideDetail] = useState("none");

  return (
    <main className="h-full flex flex-col relative">
      <div className="bg-green-300 text-black py-5 px-3 flex flex-row items-center justify-center gap-2">
        <p className="md:text-2xl text-xl">Hello there</p>
        <img src={wavingIcon} alt="waving icon" className="w-4 w-4" />
      </div>

      <section
        className={`sm:p-5 p-2 grow flex flex-col items-center ${
          allRides.length === 0 ? "justify-center" : "justify-start pt-6"
        }`}
      >
        {allRides.length === 0 ? (
          <div>
            <img
              src={emptySvg}
              alt="no ride"
              className="sm:w-64 w-2/3 object-scale-down"
            />
            <h5 className="mt-8 font-bold md:text-2xl text-xl">
              No ride scheduled
            </h5>
            <p className="text-gray-600 md:text-xl text-lg">
              Start by booking a ride
            </p>
          </div>
        ) : (
          <ul className="xl:w-2/3 lg:w-3/4 w-full mx-auto bg-green-50 sm:p-5 p-2 rounded-md">
            {allRides &&
              allRides.map((ride, i) => (
                <li key={i} className="">
                  <div className="flex flex-row items-center gap-5 w-full md:text-lg text-base">
                    <FaRegCalendarCheck />
                    <p className="grow flex flex-row items-center justify-between">
                      <span className="flex flex-col">
                        <span>{ride.date}</span>
                        <span>{ride.time}</span>
                      </span>
                      <span className="flex flex-row items-center gap-3">
                        <span className="font-semibold">${ride.price}</span>
                        <FaAngleDown
                          className="cursor-pointer"
                          onClick={() =>
                            showRideDetail === i
                              ? setShowRideDetail("none")
                              : setShowRideDetail(i)
                          }
                        />
                      </span>
                    </p>
                  </div>

                  <AnimatePresence>
                    {showRideDetail === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="pt-3 h-0 opacity-0 overflow-hidden"
                      >
                        <div className="flex flex-row gap-2">
                          <div className="flex flex-row items-center justify-center sm:gap-4 gap-2 sm:p-2 p-0.5 rounded-md w-full">
                            <TbCurrentLocation className="sm:text-xl text-lg" />
                            <div className="md:text-base sm:text-sm text-xs basis-11/12">
                              <span className="text-black/50">Pick Up:</span>
                              <h4 className="text-slate-700 font-semibold">
                                {ride.pick.formatted_address}
                              </h4>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-center sm:gap-4 gap-2 sm:p-2 p-0.5 rounded-md w-full">
                            <GrMapLocation className="sm:text-xl text-lg" />
                            <div className="md:text-base sm:text-sm text-xs basis-11/12">
                              <span className="text-black/50">
                                Destination:
                              </span>
                              <h4 className="text-slate-700 font-semibold">
                                {ride.dest.formatted_address}
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="lg:mt-3 mt-4 w-fit flex flex-row gap-4">
                          <Link
                            to={'/booking form'}
                            className="bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 px-8 sm:text-xl text-lg font-semibold"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 px-8 sm:text-xl text-lg font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
          </ul>
        )}

        <div className="absolute bottom-20 right-4">
          <Link
            to={allRides.length === 0 ? "/booking form" : "/"}
            className="hover:bg-green-300 hover:shadow group transition-all duration-300 flex flex-row items-center gap-4 rounded-full cursor-pointer"
          >
            <p className="md:text-xl text-lg ps-4 invisible group-hover:visible">
              Book a ride
            </p>
            <motion.p
              whileHover={{ rotate: "45deg" }}
              transition={{ duration: 0.3 }}
              className="bg-green-300 p-4 rounded-full md:text-2xl text-xl shadow-lg"
            >
              <FiPlus />
            </motion.p>
          </Link>
        </div>
      </section>
    </main>
  );
}
//dark:bg-zinc-900 dark:text-white
//bg-white text-white
