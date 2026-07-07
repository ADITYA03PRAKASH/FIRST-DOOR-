import React, { useState } from 'react';
import { Send, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset back to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative mt-4 flex">
        <input 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Business Email Address"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-white/5 border border-white/10 rounded-[4px] py-3.5 px-4 pr-14 font-body text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:bg-white/8 transition-all duration-200 disabled:opacity-50"
          aria-label="Corporate Newsletter Email"
        />
        
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="absolute right-1 top-1 bottom-1 bg-gold hover:bg-gold-hover text-white rounded-[3px] px-4 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-gold"
          aria-label="Subscribe"
        >
          {status === 'loading' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : status === 'success' ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </button>
      </form>

      {/* Success indicator toast inside footer */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-gold font-body font-semibold mt-2 absolute left-0"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Newsletter;

