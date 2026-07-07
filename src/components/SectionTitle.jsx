import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ tagline, title, center = false, className = "" }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {tagline && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block"
        >
          {tagline}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-navy font-headings font-extrabold text-3xl md:text-4xl leading-tight relative"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`w-16 h-[3px] bg-gold mt-4 ${center ? 'mx-auto' : 'mr-auto'} origin-left`}
      />
    </div>
  );
};

export default SectionTitle;

