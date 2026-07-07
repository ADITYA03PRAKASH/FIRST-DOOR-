import React from 'react';
import { motion } from 'framer-motion';
import LogoWhite from '../assets/logo/LogoWhite';

const Loader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
    >
      <div className="relative flex flex-col items-center justify-center p-8 max-w-sm">
        {/* Pulse Glow background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute w-44 h-44 rounded-full bg-gold/10 filter blur-2xl"
        />

        {/* Brand Icon SVG (Pulsing) */}
        <motion.div 
          animate={{ 
            scale: [0.97, 1.03, 0.97] 
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative z-10"
        >
          <LogoWhite className="h-32 md:h-36 w-auto" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
