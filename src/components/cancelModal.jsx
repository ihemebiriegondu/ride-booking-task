import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function CancelModal(props) {
  return (
    <AnimatePresence>
      {props.showCancel && (
        <div className="fixed top-0 bottom-0 w-full bg-black/30 overflow-hidden">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className=" flex flex-col justify-center h-full"
          >
            <div className="bg-white mx-auto w-fit sm:py-10 sm:px-10 py-8 px-3 rounded-md">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to cancel this ride?
              </p>
              <div className="flex gap-10">
                <button
                  type="button"
                  className="bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 px-8 sm:text-xl text-lg font-semibold"
                  onClick={() => {
                    props.setAllRides([]);
                    props.setShowCancel(false);
                    props.setDropoffLocation(null);
                    props.setPickupLocation(null);
                    props.setRideDate("");
                    props.setRideTime("");
                    props.setDistance("");
                    props.setCarType("");
                    props.setTotalPrice("");
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="bg-green-400 text-white rounded-md basis-1/2 sm:py-2 py-1 px-8 sm:text-xl text-lg font-semibold"
                  onClick={() => props.setShowCancel(false)}
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
