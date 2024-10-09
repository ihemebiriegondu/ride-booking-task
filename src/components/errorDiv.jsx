import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { TiWarning } from "react-icons/ti";

export default function ErrorDiv({ error }) {
  return (
    <AnimatePresence>
      {error !== "none" && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-hidden absolute top-28 right-4 z-30 bg-red-100 flex flex-row gap-3 items-center p-5 rounded-md border-2 border-red-400 text-lg"
        >
          <span className="text-red-700 text-xl">
            <TiWarning />
          </span>
          <p>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
