import React from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import wavingIcon from "../assets/wavinghand.png";
import emptySvg from "../assets/undraw_file_searching_re_3evy.svg";

export default function Dashboard() {
  return (
    <main className="h-full flex flex-col relative">
      <div className="bg-green-300 text-black py-5 px-3 flex flex-row items-center justify-center gap-2">
        <p className="md:text-2xl text-xl">Hello there</p>
        <img src={wavingIcon} alt="waving icon" className="w-4 w-4" />
      </div>

      <section className="p-5 grow flex flex-col justify-center items-center">
        <img src={emptySvg} alt="no ride" className="sm:w-64 w-2/3 object-scale-down" />
        <h5 className="mt-8 font-bold md:text-2xl text-xl">No ride scheduled</h5>
        <p className="text-gray-600 md:text-xl text-lg">Start by booking a ride</p>

        <div className="absolute bottom-20 right-4">
          <Link to={'/booking form'} className="hover:bg-green-300 hover:shadow group transition-all duration-300 flex flex-row items-center gap-4 rounded-full cursor-pointer">
            <p className="md:text-xl text-lg ps-4 invisible group-hover:visible">Book a ride</p>
            <motion.p whileHover={{rotate: '45deg'}} transition={{duration: 0.3}} className="bg-green-300 p-4 rounded-full md:text-2xl text-xl shadow-lg">
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
