import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const CTA = () => {
  return (
    <section className="relative bg-navy overflow-hidden py-20 text-white text-center">
      {/* Subtle gold radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(198,146,46,0.1)_0%,transparent_50%)] pointer-events-none z-0" />
      <div className="absolute -bottom-16 -left-16 w-96 h-96 rounded-full border border-gold/5 pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-3 block">
            BUILD AN ELITE WORKFORCE
          </span>
          <h2 className="font-headings font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            Ready to Build a Better Workforce?
          </h2>
          <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Book your free HR infrastructure consultation today. Let our experts audit your payroll, compliance, and hiring workflows.
          </p>
          <Button to="/contact" variant="gold" className="py-4 px-10">
            Book Your Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

