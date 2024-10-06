import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import location from "../assets/locationlogo.png";
import cars from "../assets/cars.png";

export default function Intro({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.main
          initial={{ y: "-100%", opacity: 100 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 bottom-0 z-50 w-full bg-green-400 py-20 px-8 opacity-0"
        >
          <div className="h-full flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row justify-center">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ delay: 1.3 }}
                src={location}
                alt="location icon"
                className="w-8 h-8"
              />
            </div>
            <motion.div
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 1, type: "spring" }}
              className=""
            >
              <motion.img
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                transition={{ delay: 0.8 }}
                src={cars}
                alt="cars"
                className=""
              />
            </motion.div>
            <motion.h5
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ delay: 1.4, duration: 0.4, ease: "easeIn" }}
              className="text-4xl font-bold capitalize text-center"
            >
              Book rides easily.
            </motion.h5>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
