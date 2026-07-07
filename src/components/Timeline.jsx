import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "1",
    title: "Discovery",
    desc: "We analyze your business goals, org chart structure, and skill requirements."
  },
  {
    num: "2",
    title: "HR Assessment",
    desc: "Auditing current payroll, policies, and structures to identify weak points."
  },
  {
    num: "3",
    title: "Strategy",
    desc: "Drafting customized blueprints for sourcing, compliance, or engagement goals."
  },
  {
    num: "4",
    title: "Implementation",
    desc: "Deploying recruiters, introducing new compliance policies, and setting up tools."
  },
  {
    num: "5",
    title: "Continuous Support",
    desc: "Quarterly efficiency audits, feedback reviews, and ongoing workforce strategy planning."
  }
];

const Timeline = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative py-8">
      {/* Connector Line for Desktop */}
      <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4 relative z-10"
      >
        {steps.map((step, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center w-full lg:w-1/5 group"
          >
            {/* Number Node */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-[3px] border-gray-200 text-navy font-body font-extrabold text-lg md:text-xl flex items-center justify-center flex-shrink-0 mr-5 lg:mr-0 lg:mb-6 shadow-sm group-hover:border-gold group-hover:bg-navy group-hover:text-white transition-all duration-300"
            >
              {step.num}
            </motion.div>

            {/* Content block */}
            <div className="flex flex-col">
              <h4 className="text-navy font-body font-bold text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed lg:px-2">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;

