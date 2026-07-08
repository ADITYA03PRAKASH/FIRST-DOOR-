import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-navy-dark text-white">
      {/* Background Image with perspective zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />

      {/* Luxury Navy & Gold Radial Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/90 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(198,146,46,0.12)_0%,transparent_50%)] z-10" />

      {/* Decorative Gold Portal outline line in background */}
      <div className="absolute -top-12 -right-12 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none z-10 hidden lg:block" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-3 block"
          >
            Elite HR Consultancy & Recruiting
          </motion.span>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-white font-headings font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold-light">Future of Work</span>, One Talent at a Time
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-gray-300 font-body font-light text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            First Door HR Solutions is a modern HR consulting and talent solutions company dedicated to helping organizations build high-performing teams and efficient people practices.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button to="/contact" variant="gold">
              Book a Consultation
            </Button>
            <Button to="/services" variant="outline-white">
              Explore Services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

