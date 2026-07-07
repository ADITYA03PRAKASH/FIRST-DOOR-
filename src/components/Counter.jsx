import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion';

const Counter = ({ target, suffix = "", label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { 
        duration: 2.2, 
        ease: "easeOut" 
      });
      return controls.stop;
    }
  }, [isInView, target, count]);

  return (
    <div ref={ref} className="text-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-navy font-headings font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2 flex items-center justify-center"
      >
        <motion.span>{rounded}</motion.span>
        <span className="text-gold ml-1">{suffix}</span>
      </motion.div>
      <p className="text-navy font-body font-semibold text-xs tracking-[2px] uppercase opacity-85">
        {label}
      </p>
    </div>
  );
};

export default Counter;

