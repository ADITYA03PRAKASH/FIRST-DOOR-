import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs as defaultFaqs } from '../data/faqs';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-[6px] mb-4 bg-white overflow-hidden shadow-sm">
      <button
        onClick={onClick}
        className="w-full text-left py-5 px-6 font-body font-semibold text-navy text-sm md:text-base flex items-center justify-between gap-4 focus:outline-none transition-colors duration-200 hover:bg-gold/5"
      >
        <span className={isOpen ? "text-gold" : "text-navy"}>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-navy/60"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-5 px-6 border-t border-gray-100 text-gray-500 font-body text-xs md:text-sm leading-relaxed bg-brandBgLight">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ items = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      {items.map((item, idx) => (
        <FAQItem
          key={item.id || idx}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onClick={() => toggleIndex(idx)}
        />
      ))}
    </div>
  );
};

export default FAQ;

