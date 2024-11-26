import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image"
import logo from "/public/pdsViajesLogo.png"
const SplashScreen = ({onAnimationComplete   }:{onAnimationComplete:()=>void}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 ,type: "fadeIn"}}
      onAnimationComplete={onAnimationComplete}
    >
      <Image src={logo} alt="a" height={250} width={250}/>
    </motion.div>
  );
};

export default SplashScreen;
