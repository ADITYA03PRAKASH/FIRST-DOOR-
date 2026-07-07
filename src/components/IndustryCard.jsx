import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const IndustryCard = ({ industry, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.05 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-xl h-80 flex flex-col justify-end p-6 shadow-sm group cursor-pointer"
    >
      {/* Background Image with lazy loading via css/inline style */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${industry.image}')` }}
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent group-hover:from-navy/98 group-hover:via-navy/80 transition-all duration-300 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full transition-transform duration-300">
        <h4 className="font-headings font-extrabold text-white text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-300">
          {industry.title}
        </h4>
        
        {/* Accordion description disclosure */}
        <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <p className="text-gray-300 font-body text-xs leading-relaxed mb-4">
            {industry.description}
          </p>
          
          <Link 
            to={`/contact?sector=${industry.id}`}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold hover:text-white transition-colors duration-300"
          >
            Sector Inquiry 
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryCard;

