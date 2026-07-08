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
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-fill form details if URL parameter exists
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service') || params.get('sector');
    if (serviceParam) {
      // Map URL param to one of the selectable services if possible
      const serviceMap = {
        'executive-search': 'Executive Hiring',
        'permanent-hiring': 'Talent Acquisition',
        'contract-staffing': 'Talent Acquisition',
        'rpo': 'Talent Acquisition',
        'specialized-onboarding': 'Talent Acquisition',
        'fractional-hr': 'HR Consulting',
        'policy-development': 'HR Consulting',
        'complete-hr-outsourcing': 'HR Consulting',
        'payroll': 'Payroll Management',
        'compliance': 'Statutory Compliance',
        'performance-management': 'Performance Management',
        'employee-engagement': 'Employee Engagement',
        'hr-operations': 'Workforce Planning'
      };
      
      const mappedService = serviceMap[serviceParam] || '';
      
      setFormData(prev => ({
        ...prev,
        service: mappedService,
        message: `Interested in details regarding: ${serviceParam.toUpperCase().replace(/-/g, ' ')}.`
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrorMessage('');
    setSuccessMessage('');

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    setValidated(false);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation booking.');
      }

      setIsLoading(false);
      setSuccessMessage('Booking Request Submitted Successfully!');
      setShowToast(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });

      // Clear Toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

    } catch (err) {
      console.error('Error submitting booking:', err);
      setErrorMessage(err.message || 'SMTP transmission error or server is offline. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} noValidate className={`space-y-6 ${validated ? 'was-validated' : ''}`}>
        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="bg-red-50 text-red-700 p-4 rounded-[4px] text-xs font-semibold border-l-4 border-red-500">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 text-green-700 p-4 rounded-[4px] text-xs font-semibold border-l-4 border-green-500">
            {successMessage}
          </div>
        )}

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
            <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Company Name (Optional)</label>
            <input 
              type="text"
              name="company"
              id="company"
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

          {/* Service Selected */}
          <div className="md:col-span-2">
            <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Service Needed</label>
            <select 
              name="service"
              id="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            >
              <option value="" disabled>Select the HR Service</option>
              <option value="Talent Acquisition">Talent Acquisition</option>
              <option value="Executive Hiring">Executive Hiring</option>
              <option value="Payroll Management">Payroll Management</option>
              <option value="Statutory Compliance">Statutory Compliance</option>
              <option value="HR Consulting">HR Consulting</option>
              <option value="Performance Management">Performance Management</option>
              <option value="Employee Engagement">Employee Engagement</option>
              <option value="Workforce Planning">Workforce Planning</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Preferred Date</label>
            <input 
              type="date"
              name="date"
              id="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="time" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Preferred Time Slot</label>
            <select 
              name="time"
              id="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-brandBgLight border border-gray-200 rounded-[4px] py-3.5 px-4 font-body text-sm text-navy focus:outline-none focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 transition-all duration-200"
            >
              <option value="" disabled>Select a preferred slot</option>
              <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
              <option value="Midday (12:00 PM - 3:00 PM)">Midday (12:00 PM - 3:00 PM)</option>
              <option value="Afternoon (3:00 PM - 6:00 PM)">Afternoon (3:00 PM - 6:00 PM)</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">Workforce Challenges or Requirements (Optional)</label>
          <textarea 
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your hiring volumes, start dates, compliance bottlenecks, or general requirements."
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

