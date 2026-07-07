import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  to, 
  variant = 'gold', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseStyle = "inline-block font-body font-semibold text-xs tracking-[1.5px] uppercase py-3.5 px-8 rounded-[4px] border text-center transition-all duration-300 select-none cursor-pointer";
  
  const variants = {
    gold: "bg-gold border-gold text-white hover:bg-gold-hover hover:border-gold-hover shadow-md hover:shadow-lg",
    'outline-gold': "bg-transparent border-gold text-gold hover:bg-gold hover:text-white hover:shadow-md",
    navy: "bg-navy border-navy text-white hover:bg-navy-dark hover:border-navy-dark shadow-md hover:shadow-lg",
    white: "bg-white border-white text-navy hover:bg-brandBgLight hover:shadow-md",
    'outline-white': "bg-transparent border-white/60 text-white hover:bg-white hover:text-navy hover:border-white"
  };

  const selectedClass = `${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const hoverAnimation = disabled ? {} : {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  if (to) {
    return (
      <motion.div whileHover={hoverAnimation} className="inline-block">
        <Link to={to} className={selectedClass} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={hoverAnimation}
      type={type}
      className={selectedClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

