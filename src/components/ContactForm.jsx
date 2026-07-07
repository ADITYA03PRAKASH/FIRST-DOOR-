import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Button from './Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    teamSize: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Auto-fill form details if URL parameter exists
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') || params.get('sector');
    if (service) {
      setFormData(prev => ({
        ...prev,
        message: `Interested in details regarding: ${service.toUpperCase().replace('-', ' ')}.\nPlease provide more information on how we can collaborate.`
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    setValidated(false);

    // Simulate Network Request
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        teamSize: '',
        message: ''
      });

      // Clear Toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} noValidate className={`space-y-6 ${validated ? 'was-validated' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Full Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Devendra Singh"
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Company Name</label>
            <input 
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="E.g., Veloce Tech Pvt Ltd"
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            />
          </div>

          {/* Business Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Business Email</label>
            <input 
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="devendra@velocetech.com"
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Phone Number</label>
            <input 
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            />
          </div>
        </div>

        {/* Headcount size */}
        <div>
          <label htmlFor="teamSize" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Workforce Size</label>
          <select 
            name="teamSize"
            id="teamSize"
            required
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
          >
            <option value="" disabled>Select headcount range</option>
            <option value="under-10">Under 10 Employees</option>
            <option value="10-50">10 to 50 Employees</option>
            <option value="50-200">50 to 200 Employees</option>
            <option value="over-200">More than 200 Employees</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Workforce Challenges or Mandate Details</label>
          <textarea 
            name="message"
            id="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your hiring volumes, required start dates, compliance bottlenecks, or training requirements."
            className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200 resize-y"
          />
        </div>

        {/* Submit */}
        <div>
          <Button 
            type="submit" 
            variant="gold" 
            className="w-full py-4 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Inquiry...
              </>
            ) : (
              "Book a Consultation"
            )}
          </Button>
        </div>
      </form>

      {/* Premium Toast notification popup */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-navy text-white px-6 py-4 rounded-lg shadow-xl border-l-[5px] border-gold flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0" />
            <div>
              <p className="font-body font-semibold text-xs md:text-sm">Inquiry Received</p>
              <p className="font-body text-[10px] md:text-xs text-gray-300">A senior advisor will contact you within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;

