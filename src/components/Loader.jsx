import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
    >
      <div className="relative flex flex-col items-center justify-center p-8">
        {/* Pulse Glow background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute w-36 h-36 rounded-full bg-gold/15 filter blur-xl"
        />

        {/* Brand Icon SVG (Pulsing) */}
        <motion.svg 
          animate={{ 
            scale: [0.95, 1.05, 0.95] 
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100" 
          className="h-20 w-20 relative z-10 mb-6"
        >
          <defs>
            <linearGradient id="loadGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="50%" stopColor="#C6922E" />
              <stop offset="100%" stopColor="#F2C14E" />
            </linearGradient>
            <linearGradient id="loadWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <path d="M 15 85 A 35 35 0 0 1 85 85" fill="none" stroke="url(#loadGoldGrad)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 15 85 L 15 40 A 35 35 0 0 1 85 40 L 85 85" fill="none" stroke="url(#loadGoldGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 36 85 L 36 48 A 14 14 0 0 1 64 48 L 64 85" fill="none" stroke="url(#loadWhiteGrad)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 50 10 L 56 19 L 50 28 L 44 19 Z" fill="url(#loadGoldGrad)" />
          <line x1="28" y1="85" x2="72" y2="85" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        </motion.svg>

        {/* Brand Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center relative z-10"
        >
          <h2 
            className="text-white text-lg tracking-[6px] font-extrabold uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            First Door
          </h2>
          <span 
            className="text-gold text-[10px] tracking-[4px] font-semibold uppercase mt-1 block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            HR Solutions
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;

