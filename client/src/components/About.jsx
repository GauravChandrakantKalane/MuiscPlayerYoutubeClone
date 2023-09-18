import React from "react";
import { motion } from "framer-motion";
import { Siddhant, Akshay, Gaurav } from "../assets/img/index";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" bg-[#474e5d] p-3 text-slate-100">
        <button
          className="p-3 ml-4  rounded-xl bg-zinc-400 text-yellow-100"
          onClick={() => {
            navigate("/main");
          }}
        >
          {`<-- Main Page`}
        </button>
        <h1 className="font-bold font-sans pb-3 text-3xl text-center">
          About Us Page
        </h1>
        <p className="font-mono text-center">
          Some text about who we are and what we do.
        </p>
        <p className="font-mono text-center">
          Resize the browser window to see that this page is responsive by the
          way.
        </p>
      </div>
      <h2 className="text-center pt-8 text-zinc-200 text-2xl font-semibold">
        Our Team
      </h2>

      <div className="flex mt-6 row justify-center items-center gap-x-12 ">
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={Siddhant}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-4">
            Siddhant Buchade
          </p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={Gaurav}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-4">
            Gaurav Kalane
          </p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={Akshay}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-4">
            Akshay Damale
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default About;
