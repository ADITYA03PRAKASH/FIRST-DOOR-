import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 max-w-4xl mx-auto shadow-sm relative overflow-hidden">
      {/* Decorative Large Quote Mark Icon */}
      <Quote className="absolute -top-6 -left-6 h-28 w-28 text-gold/5 pointer-events-none transform -rotate-12" />
      
      <div className="relative z-10">
        <p className="font-headings italic text-navy text-lg md:text-xl leading-relaxed mb-8">
          "{testimonial.quote}"
        </p>
        
        <div className="flex items-center gap-4">
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name}, ${testimonial.title}`} 
            className="w-12 h-12 rounded-full border-2 border-gold object-cover flex-shrink-0"
            loading="lazy"
          />
          <div>
            <h4 className="font-body font-bold text-navy text-sm md:text-base mb-0.5">
              {testimonial.name}
            </h4>
            <p className="font-body text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
              {testimonial.title}, <span className="text-gold font-semibold">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

